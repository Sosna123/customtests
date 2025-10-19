<script setup lang="ts">
import { ref, watch } from "vue";
import type { Question } from "../App.vue";

const props = defineProps(["questionsArr", "reshuffleTrigg"]);
let questionsBag: Question[] = [...props.questionsArr];

let currentQuestion = ref<string>("");
let currentAnswer = ref<string>("");

let inputedAnswer = ref<string>("");
let scoreBag = ref<number>(0);
let scoreBagAll = ref<number>(0);
let scoreSess = ref<number>(0);
let scoreSessAll = ref<number>(0);

// rerandomize questions if all are "used up" (and reset scores)
function shuffleBag() {
    console.log("shuffle");
    if (props.questionsArr.length == 0) {
        return false;
    }

    questionsBag = [...props.questionsArr];
    scoreBag.value = 0;
    scoreBagAll.value = 0;

    for (let i = 0; i < questionsBag.length; i++) {
        let randomIndex = Math.round(Math.random() * (questionsBag.length - 1));

        let temp: Question = questionsBag[randomIndex]!;
        questionsBag[randomIndex] = questionsBag[i]!;
        questionsBag[i] = temp;
    }

    return true;
}

function getQuestion() {
    if (questionsBag.length == 0) {
        let success: boolean = shuffleBag();

        if (!success) {
            return;
        }
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
    if (currentAnswer.value.trim().length == 0) {
        return;
    }

    if (
        currentAnswer.value.toLowerCase() == inputedAnswer.value.toLowerCase()
    ) {
        scoreBag.value++;
        scoreSess.value++;
    }

    scoreBagAll.value++;
    scoreSessAll.value++;

    inputedAnswer.value = "";
    getQuestion();
}

// TODO if a question is added to questionarr then shuffle and getQuestion
if (questionsBag.length > 0) {
    getQuestion();
}

watch(
    () => props.reshuffleTrigg,
    () => {
        shuffleBag();
        getQuestion();
    }
);
</script>

<template>
    <div id="content">
        <!-- <v-btn @click="getQuestion()">getquestion</v-btn>
        <v-btn @click="checkAnswer()">submit</v-btn> -->
        <div id="questionParag">{{ currentQuestion.toUpperCase() }}</div>
        <v-text-field
            @keyup="(e: any) => { if(e.code === 'Enter') checkAnswer() }"
            v-model="inputedAnswer"
            placeholder="your answer"></v-text-field>
        <div id="scoreDiv">
            <!-- in precentages the cancelling out * 10 / 10 is for having xx.xx% -->
            <p>
                This question set : {{ scoreBag }}/{{ scoreBagAll }} ({{
                    isNaN(Math.round((scoreBag / scoreBagAll) * 100))
                        ? 0
                        : Math.round((scoreBag / scoreBagAll) * 100 * 10) / 10
                }}%)
            </p>
            <p>
                All questions: {{ scoreSess }}/{{ scoreSessAll }} ({{
                    isNaN(Math.round((scoreSess / scoreSessAll) * 100))
                        ? 0
                        : Math.round((scoreSess / scoreSessAll) * 100 * 10) /
                          10
                }}%)
            </p>
        </div>
    </div>
</template>

<style scoped>
#content {
    padding-top: 50px;
    margin: auto;
    width: 50%;
    text-align: center;
}

#scoreDiv {
    font-style: italic;
}

#questionParag {
    padding: 20px;
    font-weight: normal;
    font-size: 300%;
    text-align: center;
}
</style>
