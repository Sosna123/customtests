<script setup lang="ts">
import { ref, defineEmits } from "vue";
import type { Question } from "../App.vue";

let questionVal = ref<string>("");
let answerVal = ref<string>("");

const emit = defineEmits(["addQuestion"]);

function emitQuestion() {
    if (questionVal.value.length == 0 || answerVal.value.length == 0) {
        return;
    }

    let value: Question = {
        question: questionVal.value,
        answer: answerVal.value,
    };
    emit("addQuestion", value);

    questionVal.value = answerVal.value = "";
}
</script>

<template>
    <v-text-field label="question" v-model="questionVal"></v-text-field>
    <v-text-field label="answer" v-model="answerVal"></v-text-field>
    <v-btn @click="emitQuestion()">addQuestion</v-btn>
</template>

<style scoped></style>
