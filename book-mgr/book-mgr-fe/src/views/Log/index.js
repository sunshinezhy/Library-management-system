import { defineComponent, onMounted, ref } from "vue";
import { log } from "@/service";
import { result, formatTimestamp } from "@/helpers/utils";
import { getLogInfoByPath } from "@/helpers/log";
import { message } from "ant-design-vue";

const columns = [
  {
    title: "用户名",
    dataIndex: "user.account"
  },
  {
    title: "动作",
    dataIndex: "action"
  },
  {
    title: "记录时间",
    slots: {
      customRender: "createdAt"
    }
  },
  {
    title: "操作",
    slots: {
      customRender: "action"
    }
  }
];

export default defineComponent({
  props: {
    simple: Boolean
  },

  setup(props) {
    const list = ref([]);

    const getList = async () => {
      const res = await log.list();

      result(res).success(({ data: { list: l } }) => {
        l.forEach(item => {
          item.action = getLogInfoByPath(item.request.url);
        });

        list.value = l;
      });
    };

    onMounted(() => {
      getList();
    });

    const remove = async ({ _id }) => {
      const res = await log.remove(_id);

      result(res).success(({ msg }) => {
        message.success(msg);
        getList();
      });
    };

    return {
      list,
      columns,
      formatTimestamp,
      remove,
      simple: props.simple
    };
  }
});
