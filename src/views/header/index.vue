<template>
  <headerBorder
    :width="'100vw'"
    :height="'80px'"
    :border-color="['rgba(90,137,193,0.8)']"
    :background-color="'rgba(90,137,193,0.4)'"
  >
    <template #title>
      <div class="font-titleFont text-5xl tracking-widest text-white">城勘大屏模版</div>
    </template>
    <template #timer>
      <div class="flex h-full flex-col items-center justify-center">
        <div class="text-l font-numberFont tracking-widest text-blue-200">{{ currentDate }}</div>
        <div class="font-numberFont text-xl tracking-widest text-white">{{ currentTime }}</div>
      </div>
    </template>
  </headerBorder>
</template>
<script setup>
import { ref } from 'vue';

import headerBorder from '@/components/titleBorderSecond/index.vue';
import { getCurrentFormattedTime } from '@/utils/index';

const currentDate = ref(getCurrentFormattedTime().split(' ')[0]);
const currentTime = ref(getCurrentFormattedTime().split(' ')[1]);
</script>
<style scoped></style>
