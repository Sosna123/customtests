<script setup lang="ts">
import { ref } from "vue";
import type { Question } from "../App.vue";

let questionVal = ref<string>("");
let answerVal = ref<string>("");

const emit = defineEmits(["addQuestion", "exitPopup"]);

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
    <div id="container" class="bg-bg">
        <div id="content">
            <v-text-field label="question" v-model="questionVal"></v-text-field>
            <v-text-field label="answer" v-model="answerVal"></v-text-field>
            <v-btn @click="emitQuestion()">addQuestion</v-btn>
            <v-btn @click="emit('exitPopup')">exit</v-btn>
        </div>
    </div>
</template>

<style scoped>
#container {
    position: absolute;
    z-index: 2;
    height: 40vh;
    width: 40%;
    border-radius: 25px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    justify-content: center;
    display: flex;
    padding: 50px;
}

#content {
    width: 80%;
    height: 80%;
    text-align: center;
}
</style>
