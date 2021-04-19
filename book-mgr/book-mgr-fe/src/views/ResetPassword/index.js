import { defineComponent, ref, onMounted } from "vue";
import { resetPassword } from "@/service";
import { result } from "@/helpers/utils";
import { message } from "ant-design-vue";

const columns = [
  {
    title: "账户",
    dataIndex: "account"
  },
  {
    title: "操作",
    slots: {
      customRender: "actions"
    }
  }
];

export default defineComponent({
  setup() {
    const list = ref([]);

    // 调用获取数据的接口
    const getList = async () => {
      const res = await resetPassword.list();

      result(res).success(({ data: { list: l } }) => {
        list.value = l;
      });
    };

    onMounted(() => {
      getList();
    });

    const changeStatus = async ({ _id }, status) => {
      const res = await resetPassword.updateStatus(_id, status);

      result(res).success(({ msg }) => {
        message.success(msg);

        getList();
      });
    };

    return {
      list,
      columns,

      changeStatus
    };
  }
});
