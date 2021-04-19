import { defineComponent, reactive } from "vue";
import { auth, resetPassword } from "@/service";
import { result } from "@/helpers/utils";
import { getCharacterInfoById } from "@/helpers/character";
import { message, Modal, Input } from "ant-design-vue";
import store from "@/store";
import { useRouter } from "vue-router";
import { setToken } from "@/helpers/token";

export default defineComponent({
  setup() {
    const router = useRouter();

    // 注册用到的表单数据
    const regForm = reactive({
      account: "",
      password: "",
      inviteCode: ""
    });

    const forgetPassword = () => {
      Modal.confirm({
        title: `请输入忘记密码的账号`,
        content: (
          <div>
            <Input class="__forget_password_account" />
          </div>
        ),
        onOk: async () => {
          const el = document.querySelector(".__forget_password_account");
          let account = el.value;

          const res = await resetPassword.add(account);
          console.log(res);
          result(res).success(({ msg }) => {
            message.success(msg);
          });
        }
      });
    };

    // 注册逻辑
    const register = async () => {
      if (regForm.account === "") {
        message.info("账号不能为空");
        return;
      }

      if (regForm.password === "") {
        message.info("密码不能为空");
        return;
      }

      if (regForm.inviteCode === "") {
        message.info("请输入邀请码");
        return;
      }

      const res = await auth.register(regForm.account, regForm.password, regForm.inviteCode);

      result(res).success(data => {
        message.success(data.msg);
      });
    };

    // 登录用到的表单数据
    // 通过reactive包裹之后才能够进行双向绑定（响应式数据）
    const loginForm = reactive({
      account: "",
      password: ""
    });

    // 登录逻辑
    const login = async () => {
      if (loginForm.account === "") {
        message.info("账号不能为空");
        return;
      }

      if (loginForm.password === "") {
        message.info("密码不能为空");
        return;
      }

      const res = await auth.login(loginForm.account, loginForm.password);

      result(res).success(({ msg, data: { user, token } }) => {
        message.success(msg);

        store.commit("setUserInfo", user);
        store.commit("setUserCharacter", getCharacterInfoById(user.character));

        setToken(token);

        router.replace("/books");

      });
    };

    return {
      // 注册相关的数据
      regForm,
      register,

      // 登录相关的数据
      login,
      loginForm,

      forgetPassword
    };
  }
});
