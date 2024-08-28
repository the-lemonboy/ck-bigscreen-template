<template>
  <div
    ref="leDecorateLine"
    class="relative h-full w-full"
    :style="`width:${getWidth}px; height:${getHeight}px;`"
    ><svg
      :transform="rotate ? 'rotate(90 50 50)' : ''"
      class="absolute left-0 top-0"
      :width="getWidth"
      :height="getHeight"
    >
      <defs>
        <filter id="filterId1" height="200%" width="200%" x="-20%" y="-20%">
          <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
          <feFlood :flood-color="borderColor[0]" result="glowColor" />
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="filterId2" height="150%" width="150%" x="-20%" y="-20%">
          <feMorphology operator="dilate" radius="2" in="SourceAlpha" result="thicken" />
          <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
          <feFlood :flood-color="borderColor[1]" result="glowColor" />
          <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
          <feMerge>
            <feMergeNode in="softGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <path
          id="pathD"
          :d="`M 82,${getHeight / 2} L ${getWidth / 2 - 30},${getHeight / 2}`"
          fill="transparent"
        />

        <radialGradient id="gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" :stop-color="borderColor[0]" stop-opacity="1" />
          <stop offset="100%" :stop-color="borderColor[0]" stop-opacity="0" />
        </radialGradient>

        <mask id="mask">
          <circle cx="0" cy="0" r="150" fill="url(#gradient)">
            <animateMotion
              :dur="`${dur}s`"
              :d="`M 82,${getHeight / 2} L ${getWidth / 2 - 30},${getHeight / 2}`"
              rotate="auto"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>
      <!-- 左边图形 -->
      <g>
        <polygon
          :fill="backgroundColor"
          :points="`2,2 30,2 25,${getHeight - 2} 2,${getHeight - 2}`"
        ></polygon>
        <polygon
          :fill="backgroundColor"
          :points="`40,2 50,2 45,${getHeight - 2} 35,${getHeight - 2}`"
        ></polygon>
        <polygon
          :fill="backgroundColor"
          :points="`55,2 65,2 60,${getHeight - 2} 50,${getHeight - 2}`"
        ></polygon>
        <polygon
          :fill="backgroundColor"
          :points="`70,2 80,2 75,${getHeight - 2} 65,${getHeight - 2}`"
        ></polygon>
      </g>
      <!-- 左边线段 -->
      <path
        stroke-width="0.4"
        :stroke="borderColor[0]"
        :d="`M 82,${getHeight / 2} L ${getWidth / 2 - 30},${getHeight / 2}`"
      />
      <!-- <path
        filter="url(#filterId2)"
        fill="none"
        :stroke="borderColor[0]"
        :d="`M 82,${getHeight / 2} L ${getWidth / 2 - 30},${getHeight / 2}`"
      ></path> -->
      <!-- <path
        xlink-href="#pathD"
        mask="url(#mask)"
        filter="url(#filterId1)"
        fill="none"
        stroke="#02D6B3"
        :d="`M 82,${getHeight / 2} L ${getWidth / 2 - 30},${getHeight / 2}`"
      ></path> -->
      <!-- 中间图形 -->
      <g>
        <rect
          :fill="backgroundColor"
          :x="`${getWidth / 2 - 30}`"
          y="2"
          width="15"
          :height="`${getHeight - 4}`"
        ></rect>
        <rect
          :fill="backgroundColor"
          :x="`${getWidth / 2 - 10}`"
          y="2"
          width="15"
          :height="`${getHeight - 4}`"
        ></rect>
        <rect
          :fill="backgroundColor"
          :x="`${getWidth / 2 + 10}`"
          y="2"
          width="15"
          :height="`${getHeight - 4}`"
        ></rect>
      </g>
      <!-- 右边线段 -->
      <line
        :stroke="borderColor[0]"
        stroke-width="0.4"
        :x1="`${getWidth / 2 + 25}`"
        :y1="`${getHeight / 2}`"
        :x2="`${getWidth - 82}`"
        :y2="`${getHeight / 2}`"
      ></line>
      <!-- 右边图形 -->
      <g>
        <polygon
          :fill="backgroundColor"
          :points="`${getWidth - 2},2 ${getWidth - 30},2 ${getWidth - 25},${getHeight - 2} ${getWidth - 2},${getHeight - 2}`"
        ></polygon>
        <polygon
          :fill="backgroundColor"
          :points="`${getWidth - 40},2 ${getWidth - 50},2 ${getWidth - 45},${getHeight - 2} ${getWidth - 35},${getHeight - 2}`"
        ></polygon>
        <polygon
          :fill="backgroundColor"
          :points="`${getWidth - 55},2 ${getWidth - 65},2 ${getWidth - 60},${getHeight - 2} ${getWidth - 50},${getHeight - 2}`"
        ></polygon>
        <polygon
          :fill="backgroundColor"
          :points="`${getWidth - 70},2 ${getWidth - 80},2 ${getWidth - 75},${getHeight - 2} ${getWidth - 65},${getHeight - 2}`"
        ></polygon>
      </g>
    </svg>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';

import { converse } from '@/utils/conversion';
import { throttle } from '@/utils/throttle-debounce';

// Props
const props = defineProps({
  width: {
    type: String,
    default: '1800px',
  },
  height: {
    type: String,
    default: '10px',
  },
  titleHeight: {
    type: String,
    default: '30px',
  },
  borderColor: {
    type: Array,
    default: () => ['yellow', 'blue'],
  },
  cornerColor: {
    type: Array,
    default: () => ['#76CFF4', '#76CFF4', '#76CFF4'],
  },
  backgroundColor: {
    type: String,
    default: 'blue',
  },
  rotate: {
    type: Boolean,
    default: false,
  },
  dur: {
    type: Number,
    default: 3,
  },
});
// Refs
const leTitleBox = ref(null);
const getWidth = ref(0);
const getHeight = ref(0);

// Functions
const updateDimensions = () => {
  getWidth.value = converse(props.width, leTitleBox.value, 'width', 300);
  getHeight.value = converse(props.height, leTitleBox.value, 'height', 5);
};

// Lifecycle hooks
onMounted(() => {
  updateDimensions();
  window.addEventListener('resize', throttle(updateDimensions, 1000));
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', throttle(updateDimensions, 1000));
});

watch([() => props.width, () => props.height, () => props.titleWidth], updateDimensions);
</script>
<style scoped></style>
