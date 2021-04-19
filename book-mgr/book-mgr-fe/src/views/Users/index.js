import { defineComponent, ref, onMounted } from "vue";
import { user } from "@/service";
import { message } from "ant-design-vue";
import { result, formatTimestamp } from "@/helpers/utils";
import AddOne from "./AddOne/index.vue";
import { getCharacterInfoById } from "@//helpers/character";

const columns = [
  {
    title: "账户",
    dataIndex: "account"
  },
  {
    title: "创建日期",
    slots: {
      customRender: "createdAt"
    }
  },
  {
    title: "角色",
    slots: {
      customRender: "character"
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
  components: {
    AddOne
  },
  setup() {
    const list = ref([]);
    const showAddModal = ref(false);
    const keyword = ref("");
    const isSearch = ref(false);

    const getUser = async () => {
      const res = await user.list(keyword.value);

      result(res).success(({ data }) => {
        list.value = data;
      });
    };

    onMounted(() => {
      getUser();
    });

    // 删除一个用户
    const remove = async ({ _id }) => {
      const res = await user.remove(_id);

      result(res).success(({ msg }) => {
        message.success(msg);
        getUser();
      });
    };
    // 重置密码
    const resetPassword = async ({ _id }) => {
      const res = await user.resetPassword(_id);

      result(res).success(({ msg }) => {
        message.success(msg);
      });
    };

    const onSearch = () => {
      getUser();
      isSearch.value = !!keyword.value;
    };

    const backAll = () => {
      isSearch.value = false;
      keyword.value = "";
      getUser();
    };

    return {
      list,
      getUser,
      columns,
      formatTimestamp,
      remove,
      showAddModal,
      resetPassword,
      isSearch,
      keyword,
      onSearch,
      backAll,
      getCharacterInfoById
    };
  }
});
