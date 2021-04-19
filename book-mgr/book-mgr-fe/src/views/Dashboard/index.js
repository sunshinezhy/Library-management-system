import { defineComponent, onMounted, ref } from "vue";
import { result } from "@/helpers/utils";
import Book from "@/views/Books/index.vue";
import Log from "@/views/Log/index.vue";
import { dashboard } from "@/service";

export default defineComponent({
  components: {
    Book,
    Log
  },
  setup() {
    const baseInfo = ref({
      total: {
        book: 0,
        user: 0,
        log: 0
      }
    });

    const getBaseInfo = async () => {
      const res = await dashboard.baseInfo();

      result(res).success(({ data }) => {
        baseInfo.value = data;
      });
    };

    onMounted(() => {
      getBaseInfo();
    });

    return {
      baseInfo
    };
  }
});
