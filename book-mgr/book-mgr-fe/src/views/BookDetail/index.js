import { defineComponent, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { result, formatTimestamp } from "@/helpers/utils";
import { book, inventoryLog } from "@/service";
import { message } from "ant-design-vue";
import Update from "@/views/Books/Update/index.vue";

const columns = [
  {
    title: "数量",
    dataIndex: "num"
  },
  {
    title: "操作时间",
    slots: {
      customRender: "createdAt"
    }
  }
];

export default defineComponent({
  components: {
    Update
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const { id } = route.params;
    const detailInfo = ref({});
    const log = ref([]);
    const showUpdateModal = ref(false);
    const curLogType = ref("IN_COUNT");

    // 获取书籍详细信息
    const getDetail = async () => {
      const res = await book.detail(id);
      result(res).success(({ data }) => {
        detailInfo.value = data;
      });
    };

    // 获取出入库日志
    const getInventoryLog = async () => {
      const res = await inventoryLog.list(curLogType.value,id);
      // console.log(res);
      result(res).success(({ data }) => {
        log.value = data;
      });
    };

    onMounted(() => {
      getDetail();
      getInventoryLog();
    });

    // 删除操作
    const remove = async () => {
      const res = await book.remove(id);

      result(res).success(({ msg }) => {
        message.success(msg);

        router.replace("/books");
      });
    };

    // 更新操作
    const update = book => {
      Object.assign(detailInfo.value, book);
    };

    // 筛选日志
    const logFilter = type => {
      curLogType.value = type;

      getInventoryLog();
    };

    return {
      d: detailInfo,
      formatTimestamp,
      remove,
      showUpdateModal,
      update,
      log,
      columns,
      logFilter
    };
  }
});
