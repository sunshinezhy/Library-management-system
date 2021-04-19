import { defineComponent, reactive } from "vue";
import { user } from "@/service";
import { message } from "ant-design-vue";
import { result, clone } from "@/helpers/utils";
import store from "@/store";

const defaultFormData = {
  account: "",
  password: "",
  character: ""
};

export default defineComponent({
  props: {
    show: Boolean
  },

  setup(props, context) {
    const { characterInfo } = store.state;

    const addForm = reactive(clone(defaultFormData));

    addForm.character = characterInfo[1]._id;

    const close = () => {
      context.emit("update:show", false);
    };

    // 按钮被触发的时候
    const submit = async () => {
      const form = clone(addForm);
      const res = await user.add(form.account, form.password, form.character);

      result(res).success((d, { data }) => {
        Object.assign(addForm, defaultFormData);
        message.success(data.msg);
        close();

        context.emit("getList");
      });
    };

    return {
      addForm,
      submit,
      props,
      close,
      characterInfo
    };
  }
});
