// 书籍页面相关逻辑

import { defineComponent, ref, onMounted } from "vue";
import { book } from "@/service";
import { useRouter } from "vue-router";
import { message, Modal, Input } from "ant-design-vue";
import { result, formatTimestamp } from "@/helpers/utils";
import AddOne from "./AddOne/index.vue";
import Update from "./Update/index.vue";

export default defineComponent({
  components: {
    AddOne,
    Update
  },
  props: {
    simple: Boolean
  },
  setup(props) {
    const router = useRouter();

    const columns = [
      {
        title: "书名",
        dataIndex: "name"
      },
      {
        title: "作者",
        dataIndex: "author"
      },
      {
        title: "价格",
        dataIndex: "price"
      },
      {
        title: "库存",
        slots: {
          customRender: "count"
        }
      },
      {
        title: "出版日期",
        dataIndex: "publishDate",
        slots: {
          customRender: "publishDate"
        }
      },
      {
        title: "分类",
        dataIndex: "classify"
      },
      {
        title: "操作",
        slots: {
          customRender: "actions"
        }
      }
    ];

    const list = ref([]);
    const show = ref(false);
    const showUpdateModal = ref(false);
    const keyword = ref("");
    const isSearch = ref(false);
    const curEditBook = ref({});


    // 获取书籍列表
    const getList = async () => {
      const res = await book.list({
        keyword: keyword.value
      });

      result(res).success(({ data }) => {
        list.value = data;
      });


    };


    // 当组件被挂载时会做什么事情
    onMounted(async () => {
      getList();
    });

    // 触发搜索
    const onSearch = () => {
      getList();

      // 字符串非空的时候 -> true
      // 字符串为空的时候 -> false
      isSearch.value = Boolean(keyword.value);
    };

    // 回到全部列表
    const backAll = () => {
      keyword.value = "";
      isSearch.value = false;

      getList();
    };

    // 删除一本书籍
    const remove = async ({ record }) => {
      const { _id } = record;
      console.log(record);
      const res = await book.remove(_id);

      result(res).success(({ msg }) => {
        message.success(msg);

        getList();
      });
    };

    const updateCount = async (type, record) => {
      // console.log(record);
      let word = "增加";

      if (type === "OUT_COUNT") {
        word = "减少";
      }

      Modal.confirm({
        title: `要${word}多少库存`,
        content: (
          <div>
            <Input class="__book_input_count" />
          </div>
        ),
        onOk: async () => {
          const el = document.querySelector(".__book_input_count");
          let num = el.value;

          const res = await book.updateCount({
            id: record._id,
            num,
            type
          });

          result(res).success(data => {
            if (type === type) {
              // 入库操作
              num = Math.abs(num);
            } else {
              // 出库操作
              num = -Math.abs(num);
            }

            const one = list.value.find(item => {
              return item._id === record._id;
            });

            if (one) {
              one.count = one.count + num;

              message.success(`成功${word}${Math.abs(num)}本书`);
            }
            getList();
          });
        }
      });
    };

    // 显示更新弹框
    const update = ({ record }) => {
      showUpdateModal.value = true;
      curEditBook.value = record;
    };

    // 更新列表的某一行书籍
    const updateCurBook = newData => {
      Object.assign(curEditBook.value, newData);
    };

    // 进入书籍详情页
    const toDetail = ({ record }) => {
      router.push(`/books/${record._id}`);
    };

    return {
      columns,
      show,
      list,
      formatTimestamp,
      keyword,
      onSearch,
      backAll,
      isSearch,
      remove,
      updateCount,
      showUpdateModal,
      update,
      curEditBook,
      updateCurBook,
      toDetail,
      simple: props.simple
    };
  }
});
