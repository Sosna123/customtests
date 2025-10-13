<script setup lang="ts">
import { ref } from "vue";
import AddQuestions from "./components/AddQuestions.vue";

const questionsArr = ref<string[][]>([]);

function addQuestion(question: string[]) {
    questionsArr.value.push(question);
}
</script>

<template>
    <AddQuestions @addQuestion="(e: string[]) => addQuestion(e)" />
    <p>{{ questionsArr }}</p>
</template>

<style scoped></style>
