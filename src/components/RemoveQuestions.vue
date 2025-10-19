<script setup lang="ts">
import { ref } from "vue";
import type { Question } from "../App.vue";

const emit = defineEmits(["exitPopup", "removeQuestion"]);
const props = defineProps(["questionsArr", "isOpen"]);

let questionsArr = ref<Question[]>(props.questionsArr);

function deleteQuestion(remEl: Question) {
    emit("removeQuestion", remEl);

    questionsArr.value = questionsArr.value.filter((el: Question) => {
        return !(el.question == remEl.question && el.answer == remEl.answer);
    });
}
</script>

<template>
    <div id="container" class="bg-bg">
        <div id="content">
            <v-btn @click="emit('exitPopup')">exit</v-btn>
            <div id="list">
                <div v-for="question in questionsArr" id="listElement">
                    <div>{{ question.question }} - {{ question.answer }}</div>
                    <v-btn @click="deleteQuestion(question)">X</v-btn>
                </div>
            </div>
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
    height: 100%;
}

#list {
    margin-top: 10%;
    width: 100%;
    max-height: 80%;
    text-align: center;
    overflow-y: scroll;
}

#listElement {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
}
</style>
