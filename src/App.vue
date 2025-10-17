<script setup lang="ts">
import { ref } from "vue";
import AddQuestions from "./components/AddQuestions.vue";
import Questions from "./components/Questions.vue";
import PopupBg from "./components/PopupBg.vue";

export type Question = {
    question: string;
    answer: string;
};

let showAddQuestions = ref<boolean>(false);

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
    // TODO loop over array to check if question already exists
    // TODO or find a better solution
    questionsArr.value.push(question);
}
</script>

<template>
    <div v-show="showAddQuestions">
        <AddQuestions
            @addQuestion="(e: Question) => addQuestion(e)"
            @exitPopup="showAddQuestions = false" />
        <PopupBg />
    </div>
    <Questions :questionsArr="questionsArr" />
    <v-btn @click="showAddQuestions = true">Add a question</v-btn>
    <!-- <p>{{ questionsArr }}</p> -->
</template>

<style scoped>
/* z indexes: */
/* website - 0? (default) */
/* popup bg - 1 */
/* popup content - 2 */
</style>
