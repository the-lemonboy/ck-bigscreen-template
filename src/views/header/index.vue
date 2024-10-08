<template>
  <div>
    <headerBorder
      :width="'100%'"
      :height="'80px'"
      :border-color="['rgba(90,137,193,0.8)', 'rgba(90,137,255,1)']"
      :background-color="'rgba(90,137,193,0.4)'"
    >
      <template #title>
        <div class="font-titleFont text-5xl tracking-widest text-white">城勘大屏模版</div>
      </template>
      <template #timer>
        <div class="relative">
          <div class="flex h-full flex-col items-center justify-center">
            <div class="text-l font-numberFont tracking-widest text-blue-200">{{
              currentDate
            }}</div>
            <div class="font-numberFont text-xl tracking-widest text-white">{{ currentTime }}</div>
          </div>
          <svg
            style="position: absolute; left: 118px; top: -25px"
            width="100"
            height="100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="myLineGradient" gradientTransform="rotate(90)">
                <stop offset="5%" stop-color="#A5CEF5" stop-opacity="0.1" />
                <stop offset="50%" stop-color="#A5CEF5" stop-opacity="0.5" />
                <stop offset="95%" stop-color="#A5CEF5" stop-opacity="0.9" />
              </linearGradient>
              <radialGradient id="myGradient">
                <stop offset="5%" stop-color="#A5CEF5" stop-opacity="1" />
                <stop offset="50%" stop-color="#A5CEF5" stop-opacity="0.5" />
                <stop offset="95%" stop-color="#A5CEF5" stop-opacity="0.1" />
              </radialGradient>
            </defs>
            <ellipse fill="url(#myLineGradient)" cx="50" cy="50" rx="30" ry="25" />
            <ellipse fill="url(#myGradient)" cx="50" cy="65" rx="25" ry="10" stroke-width="2" />
          </svg>
          <div class="absolute -right-10 top-0 h-12">
            <svg
              t="1725347057037"
              class="icon z-11 absolute h-10 w-10 decoration-white"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="5436"
              width="200"
              height="200"
            >
              <path
                d="M753.9 629.5c-33.3-33.3-73.4-59.6-118.1-76.9 63.7-40.4 106-111.6 106-192.6 0-125.9-102.1-228-228-228s-228 102.1-228 228c0 81 42.3 152.2 106 192.6-44.7 17.2-84.8 43.6-118.1 76.9-61.5 61.5-99.5 146.4-99.5 240.2 0 18.7 15.2 33.8 33.8 33.8 18.7 0 33.8-15.2 33.8-33.8 0-72.6 28.3-140.9 79.6-192.3 51.4-51.4 119.6-79.6 192.3-79.6 72.6 0 140.9 28.3 192.3 79.6 51.4 51.4 79.6 119.7 79.6 192.3 0 18.7 15.2 33.8 33.8 33.8 18.7 0 33.8-15.2 33.8-33.8C853.4 775.9 815.4 690.9 753.9 629.5zM345.8 360c0-92.6 75.4-168 168-168s168 75.4 168 168c0 92.6-75.4 168-168 168S345.8 452.6 345.8 360z"
                fill="#fff"
                p-id="5437"
                data-spm-anchor-id="a313x.search_index.0.i0.67b83a81VOc160"
                class="selected"
              ></path>
            </svg>
          </div>
        </div>
      </template>
    </headerBorder>
    <canvas
      ref="el"
      width="1920"
      height="1080"
      style="transform: scale(0.5); transform-origin: top left; left: 0; top: 0; position: absolute"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

import headerBorder from '@/components/titleBorderSecond/index.vue';
import { useCanvasBranch } from '@/hooks/useCanvasBranch';
import { getCurrentFormattedTime } from '@/utils/index';

const currentDate = ref(getCurrentFormattedTime().split(' ')[0]);
const currentTime = ref(getCurrentFormattedTime().split(' ')[1]);
const { el } = useCanvasBranch();
</script>
