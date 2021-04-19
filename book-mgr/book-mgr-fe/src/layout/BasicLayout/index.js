import { defineComponent } from 'vue';
import { setToken } from '@/helpers/token';
import Nav from './Nav/index.vue';
import store from '@/store';

export default defineComponent({
  components: {
    AppNav: Nav,
  },
  setup() {
    const logout = () => {
      setToken('');
      window.location.href = 'http://localhost:8080/#/auth';
    };

    return {
      logout,
      store: store.state,
    };
  },
});
