<script setup lang="ts">
import { ref } from "vue";
import AddQuestions from "./components/AddQuestions.vue";
import Questions from "./components/Questions.vue";

export type Question = {
    question: string;
    answer: string;
};

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
    questionsArr.value.push(question);
}
</script>

<template>
    <AddQuestions @addQuestion="(e: Question) => addQuestion(e)" />
    <hr />
    <p>{{ questionsArr }}</p>
    <hr />
    <Questions :questionsArr="questionsArr" />
</template>

<style scoped></style>
