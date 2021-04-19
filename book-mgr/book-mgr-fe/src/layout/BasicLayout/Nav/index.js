import { defineComponent, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import menu from "@/config/menu";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();
    const openKeys = ref([]);
    const selectedKeys = ref([]);

    onMounted(() => {
      selectedKeys.value = [route.path];
    });

    const to = url => {
      router.push(url);
    };

    return {
      openKeys,
      selectedKeys,
      menu,
      to
    };
  }
});
