<script setup lang="ts">
import { ref, defineProps } from "vue";
import type { Question } from "../App.vue";

const props = defineProps(["questionsArr"]);
let questionsBag: Question[] = [...props.questionsArr];

let currentQuestion = ref<string>("");
let currentAnswer = ref<string>("");

// rerandomize questions if all are "used up"
function shuffleBag() {
    for (let i = 0; i < questionsBag.length; i++) {
        let randomIndex = Math.round(Math.random() * (questionsBag.length - 1));

        let temp: Question = questionsBag[randomIndex]!;
        questionsBag[randomIndex] = questionsBag[i]!;
        questionsBag[i] = temp;
    }
}

function getQuestion() {
    if (questionsBag.length == 0) {
        questionsBag = [...props.questionsArr];
        shuffleBag();
    }

    let randIndex: number = Math.round(
        Math.random() * (questionsBag.length - 1)
    );

    // exclamations because ts keeps yelling that questionsBag[randIndex] can be undefined
    // (even though it cant)
    currentQuestion.value = questionsBag[randIndex]!.question;
    currentAnswer.value = questionsBag[randIndex]!.answer;

    questionsBag = questionsBag.filter((_e, index) => index != randIndex);
}
</script>

<template>
    <v-btn @click="getQuestion()">getquestion</v-btn>
    <p>{{ currentQuestion }}</p>
    <p>{{ currentAnswer }}</p>
</template>

<style scoped></style>
