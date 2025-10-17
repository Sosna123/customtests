<script setup lang="ts">
import { ref, defineProps } from "vue";
import type { Question } from "../App.vue";

const props = defineProps(["questionsArr"]);
let questionsBag: Question[] = [...props.questionsArr];

let currentQuestion = ref<string>("");
let currentAnswer = ref<string>("");

let inputedAnswer = ref<string>("");
let wasLastCorrect = ref<boolean>(false);
let scoreBag = ref<number>(0);
let scoreBagAll = ref<number>(0);
let scoreSess = ref<number>(0);
let scoreSessAll = ref<number>(0);

// rerandomize questions if all are "used up" (reset scores)
function shuffleBag() {
    scoreBag.value = 0;
    scoreBagAll.value = 0;

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

function checkAnswer() {
    if (currentAnswer.value == " " || currentAnswer.value == "") {
        return;
    }

    if (
        currentAnswer.value.toLowerCase() == inputedAnswer.value.toLowerCase()
    ) {
        wasLastCorrect.value = true;
        scoreBag.value++;
        scoreSess.value++;
    } else {
        wasLastCorrect.value = false;
    }

    scoreBagAll.value++;
    scoreSessAll.value++;

    inputedAnswer.value = "";
    getQuestion();
}
</script>

<template>
    <v-btn @click="getQuestion()">getquestion</v-btn>
    <h2>{{ currentQuestion }}</h2>
    <v-text-field
        v-model="inputedAnswer"
        placeholder="your answer"></v-text-field>
    <v-btn @click="checkAnswer()">submit</v-btn>
    <p>{{ wasLastCorrect }}</p>
    <p>
        This question set : {{ scoreBag }}/{{ scoreBagAll }} (~{{
            Math.round((scoreBag / scoreBagAll) * 100)
        }}%)
    </p>
    <p>
        All questions: {{ scoreSess }}/{{ scoreSessAll }} (~{{
            Math.round((scoreSess / scoreSessAll) * 100)
        }}%)
    </p>
</template>

<style scoped></style>
