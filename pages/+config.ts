import type { Config } from "vike/types";
import vikeVue from "vike-vue/config";

// Problem line
import Layout from "~/layouts/LayoutDefault.vue";

export default {
  Layout,

  title: "Scarlet",
  extends: vikeVue as typeof vikeVue
} satisfies Config;
