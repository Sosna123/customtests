<script setup lang="ts">
import { ref, defineEmits } from "vue";
let questionVal = ref<string>("123");
let answerVal = ref<string>("456");

const emit = defineEmits(["addQuestion"]);

function emitQuestion() {
    let value: string[] = [questionVal.value, answerVal.value];
    emit("addQuestion", value);

    questionVal.value = answerVal.value = "";
}
</script>

<template>
    <v-text-field label="question" v-model="questionVal"></v-text-field>
    <v-text-field label="answer" v-model="answerVal"></v-text-field>
    <p>{{ questionVal }} - {{ answerVal }}</p>
    <v-btn @click="emitQuestion()">addQuestion</v-btn>
</template>

<style scoped></style>
