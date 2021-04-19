import { defineComponent, ref, onMounted } from "vue";
import { inviteCode } from "@/service";
import { result } from "@/helpers/utils";
import { message } from "ant-design-vue";

const columns = [
  {
    title: "邀请码",
    dataIndex: "code"
  },
  {
    title: "状态",
    slots: {
      customRender: "status"
    }
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
    const count = ref(1);
    const list = ref([]);

    const getList = async () => {
      const res = await inviteCode.list();

      result(res).success(({ data: { list: l } }) => {
        list.value = l;
      });
    };

    onMounted(() => {
      getList();
    });

    const add = async () => {
      const res = await inviteCode.add(count.value);

      result(res).success(() => {
        message.success(`成功添加 ${count.value} 条邀请码`);
        getList();
      });
    };

    const remove = async ({ _id }) => {
      const res = await inviteCode.remove(_id);

      result(res).success(({ msg }) => {
        message.success(msg);

        getList();
      });
    };

    return {
      count,
      list,
      columns,
      add,
      remove
    };
  }
});
