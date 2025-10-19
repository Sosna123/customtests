import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import colors from "vuetify/util/colors";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: "dark",
        themes: {
            light: {
                colors: {
                    primary: colors.grey.lighten2,
                    secondary: colors.grey.lighten3,
                    bg: colors.grey.lighten5,
                },
            },
            dark: {
                colors: {
                    primary: colors.grey.darken3,
                    secondary: colors.grey.darken2,
                    bg: colors.grey.darken3,
                },
            },
        },
    },
});

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

createApp(App).use(vuetify).mount("#app");
