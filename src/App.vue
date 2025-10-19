<script setup lang="ts">
import { ref } from "vue";
import { mdiThemeLightDark } from "@mdi/js";
import { useTheme } from "vuetify";

import AddQuestions from "./components/AddQuestions.vue";
import Questions from "./components/Questions.vue";
import PopupBg from "./components/PopupBg.vue";
import RemoveQuestions from "./components/RemoveQuestions.vue";

export type Question = {
    question: string;
    answer: string;
};

let showAddQuestions = ref<boolean>(false);
let showRemoveQuestions = ref<boolean>(false);

let reshuffleTrigg = ref<number>(0);

let theme = useTheme();
let currTheme: boolean = true;
// true => dark
// false => light

const questionsArr = ref<Question[]>([
    { question: "a", answer: "a" },
    { question: "b", answer: "b" },
    { question: "c", answer: "c" },
    { question: "d", answer: "d" },
    { question: "e", answer: "e" },
    { question: "f", answer: "f" },
    { question: "g", answer: "g" },
    { question: "h", answer: "h" },
]);

function addQuestion(question: Question) {
    let doesExist: boolean = false;
    questionsArr.value.forEach((e) => {
        if (e.question == question.question && e.answer == question.answer) {
            doesExist = true;
        }
    });

    if (doesExist) {
        return;
    }

    questionsArr.value.push(question);
    reshuffleTrigg.value++;
}

function removeQuestionFromArr(remEl: Question) {
    questionsArr.value = questionsArr.value.filter((el: Question) => {
        return !(el.question == remEl.question && el.answer == remEl.answer);
    });
}

function changeTheme() {
    currTheme = !currTheme;

    if (currTheme) {
        theme.global.name.value = "dark";
    } else {
        theme.global.name.value = "light";
    }
}
</script>

<template>
    <v-btn @click="changeTheme()" id="themeChanger">
        <v-icon :icon="mdiThemeLightDark"></v-icon>
    </v-btn>

    <div v-show="showAddQuestions">
        <AddQuestions
            @addQuestion="(e: Question) => addQuestion(e)"
            @exitPopup="showAddQuestions = false" />
        <PopupBg />
    </div>

    <div v-if="showRemoveQuestions">
        <RemoveQuestions
            :questionsArr="questionsArr"
            :isOpen="showRemoveQuestions"
            @exitPopup="showRemoveQuestions = false"
            @removeQuestion="(e: Question) => removeQuestionFromArr(e)" />
        <PopupBg />
    </div>

    <Questions :questionsArr="questionsArr" :reshuffleTrigg="reshuffleTrigg" />

    <div id="popupBtnsContainer">
        <div id="popupBtns">
            <v-btn @click="showAddQuestions = true">Add a question</v-btn>
            <v-btn @click="showRemoveQuestions = true">Remove a question</v-btn>
        </div>
    </div>
    <!-- <p>{{ questionsArr }}</p> -->
</template>

<style scoped>
/* z indexes: */
/* website - 0? (default) */
/* popup bg - 1 */
/* popup content - 2 */

#popupBtnsContainer {
    padding: 50px;
    width: 100%;
    text-align: center;
}

#popupBtns {
    width: 40%;
    margin: auto;
    display: flex;
    justify-content: space-evenly;
}

#themeChanger {
    position: absolute;
}
</style>
