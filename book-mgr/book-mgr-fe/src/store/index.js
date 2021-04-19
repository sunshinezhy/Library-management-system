import { createStore, Store } from "vuex";
import { character, user } from "@/service";
import { getCharacterInfoById } from "@/helpers/character";
import { result } from "@/helpers/utils";

export default createStore({
  state: {
    characterInfo: [],
    userInfo: {},
    userCharacter: {}
  },
  mutations: {
    setCharacterInfo(state, characterInfo) {
      state.characterInfo = characterInfo;
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    setUserCharacter(state, userCharacter) {
      state.userCharacter = userCharacter;
    }
  },
  actions: {
    // 把角色列表拿下来放到state中
    async getCharacterInfo(store) {
      const res = await character.list();

      result(res).success(({ data }) => {
        store.commit("setCharacterInfo", data);
      });
    },

    // 拿到用户信息，并设置用户信息，还会把对应的角色信息取到放进去
    async getUserInfo(store) {
      const res = await user.info();

      result(res).success(({ data }) => {
        store.commit("setUserInfo", data);

        store.commit("setUserCharacter", getCharacterInfoById(data.character));

        // console.log(store.state);
      });
    }
  }
});
