<template>
  <div ref="leTitleBox" class="relative" :style="` width:${getWidth}px; height:${getHeight}px;`">
    <svg class="absolute left-0 top-0" :width="getWidth" :height="getHeight">
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
        <defs>
          <filter id="filterId" height="150%" width="150%" x="-20%" y="-20%">
            <feMorphology operator="dilate" radius="0.1" in="SourceAlpha" result="thicken" />
            <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
            <feFlood :flood-color="borderColor[0]" result="glowColor" />
            <feComposite in="glowColor" in2="blurred" operator="in" result="softGlowColored" />
            <feMerge>
              <feMergeNode in="softGlowColored" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <path
          id="pathD"
          filter="url(#filterId)"
          :d="`M 0,0 L 15,${getHeight / 4} Q 30,${getHeight - 4} 70,${getHeight - 4} L ${getTitleWidth},${getHeight - 4}
      Q ${getTitleWidth + 35},${getHeight - 4} ${getTitleWidth + 45},${(getHeight * 5) / 6} 
      Q ${getTitleWidth + 60},${(getHeight * 2) / 3} ${getTitleWidth + 90},${(getHeight * 2) / 3} L ${(getWidth * 5) / 6},${(getHeight * 2) / 3}
      Q ${(getWidth * 5) / 6 + 35},${(getHeight * 2) / 3} ${(getWidth * 5) / 6 + 45},${(getHeight * 5) / 6}
      Q ${(getWidth * 5) / 6 + 55},${getHeight - 4} ${(getWidth * 5) / 6 + 90},${getHeight - 4} L ${getWidth - 70},${getHeight - 4}
      Q ${getWidth - 30},${getHeight - 4} ${getWidth - 15},${getHeight / 4} L ${getWidth},0`"
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
              :d="`M 0,0 L 15,${getHeight / 4} Q 30,${getHeight - 4} 70,${getHeight - 4} L ${getTitleWidth},${getHeight - 4}
      Q ${getTitleWidth + 35},${getHeight - 4} ${getTitleWidth + 45},${(getHeight * 5) / 6} 
      Q ${getTitleWidth + 60},${(getHeight * 2) / 3} ${getTitleWidth + 90},${(getHeight * 2) / 3} L ${(getWidth * 5) / 6},${(getHeight * 2) / 3}
      Q ${(getWidth * 5) / 6 + 35},${(getHeight * 2) / 3} ${(getWidth * 5) / 6 + 45},${(getHeight * 5) / 6}
      Q ${(getWidth * 5) / 6 + 55},${getHeight - 4} ${(getWidth * 5) / 6 + 90},${getHeight - 4} L ${getWidth - 70},${getHeight - 4}
      Q ${getWidth - 30},${getHeight - 4} ${getWidth - 15},${getHeight / 4} L ${getWidth},0`"
              rotate="auto"
              repeatCount="indefinite"
            />
          </circle>
        </mask>
      </defs>
      <!-- <path
        filter="url(#filterId2)"
        :d="`M 0,0 L 15,${getHeight / 4} Q 30,${getHeight - 4} 70,${getHeight - 4} L ${getTitleWidth},${getHeight - 4}
      Q ${getTitleWidth + 35},${getHeight - 4} ${getTitleWidth + 45},${(getHeight * 5) / 6} 
      Q ${getTitleWidth + 60},${(getHeight * 2) / 3} ${getTitleWidth + 90},${(getHeight * 2) / 3} L ${(getWidth * 5) / 6},${(getHeight * 2) / 3}
      Q ${(getWidth * 5) / 6 + 35},${(getHeight * 2) / 3} ${(getWidth * 5) / 6 + 45},${(getHeight * 5) / 6}
      Q ${(getWidth * 5) / 6 + 55},${getHeight - 4} ${(getWidth * 5) / 6 + 90},${getHeight - 4} L ${getWidth - 70},${getHeight - 4}
      Q ${getWidth - 30},${getHeight - 4} ${getWidth - 15},${getHeight / 4} L ${getWidth},0`"
      ></path> -->
      <path
        :stroke="borderColor[0]"
        :stroke-width="2"
        :d="`M 0,0 L 5,${getHeight / 4} Q 20,${getHeight - 4} 70,${getHeight - 4} L ${getTitleWidth},${getHeight - 4}
      Q ${getTitleWidth + 35},${getHeight - 4} ${getTitleWidth + 45},${(getHeight * 5) / 6} 
      Q ${getTitleWidth + 60},${(getHeight * 2) / 3} ${getTitleWidth + 90},${(getHeight * 2) / 3} L ${(getWidth * 5) / 6},${(getHeight * 2) / 3}
      Q ${(getWidth * 5) / 6 + 35},${(getHeight * 2) / 3} ${(getWidth * 5) / 6 + 45},${(getHeight * 5) / 6}
      Q ${(getWidth * 5) / 6 + 55},${getHeight - 4} ${(getWidth * 5) / 6 + 90},${getHeight - 4} L ${getWidth - 70},${getHeight - 4}
      Q ${getWidth - 30},${getHeight - 4} ${getWidth - 5},${getHeight / 4} L ${getWidth},0`"
      ></path>
      <path
        :fill="backgroundColor"
        :d="`M 0,2 L 5,${getHeight / 4} Q 27,${getHeight - 6} 72,${getHeight - 6} L ${getTitleWidth + 2},${getHeight - 6}
      Q ${getTitleWidth + 33},${getHeight - 6} ${getTitleWidth + 43},${(getHeight * 5) / 6 - 2} 
      Q ${getTitleWidth + 60},${(getHeight * 2) / 3} ${getTitleWidth + 90},${(getHeight * 2) / 3 - 2} L ${(getWidth * 5) / 6 - 2},${(getHeight * 2) / 3 - 2}
      Q ${(getWidth * 5) / 6 + 35},${(getHeight * 2) / 3 - 2} ${(getWidth * 5) / 6 + 43},${(getHeight * 5) / 6 - 2}
      Q ${(getWidth * 5) / 6 + 53},${getHeight - 6} ${(getWidth * 5) / 6 + 88},${getHeight - 6} L ${getWidth - 72},${getHeight - 6}
      Q ${getWidth - 30},${getHeight - 6} ${getWidth - 7},${getHeight / 4 - 2} L ${getWidth - 2},2`"
      ></path>
      <!-- <path
        xlink-href="#pathD"
        mask="url(#mask)"
        filter="url(#filterId1)"
        fill="none"
        stroke="#02D6B3"
        :d="`M 0,0 L 15,${getHeight / 4} Q 30,${getHeight - 4} 70,${getHeight - 4} L ${getTitleWidth},${getHeight - 4}
      Q ${getTitleWidth + 35},${getHeight - 4} ${getTitleWidth + 45},${(getHeight * 5) / 6} 
      Q ${getTitleWidth + 60},${(getHeight * 2) / 3} ${getTitleWidth + 90},${(getHeight * 2) / 3} L ${(getWidth * 5) / 6},${(getHeight * 2) / 3}
      Q ${(getWidth * 5) / 6 + 35},${(getHeight * 2) / 3} ${(getWidth * 5) / 6 + 45},${(getHeight * 5) / 6}
      Q ${(getWidth * 5) / 6 + 55},${getHeight - 4} ${(getWidth * 5) / 6 + 90},${getHeight - 4} L ${getWidth - 70},${getHeight - 4}
      Q ${getWidth - 30},${getHeight - 4} ${getWidth - 15},${getHeight / 4} L ${getWidth},0`"
      ></path> -->
    </svg>
    <div class="absolute left-16 top-1/2 inline-block -translate-y-1/2">
      <slot name="title"></slot>
    </div>
    <div class="absolute right-28 top-1/2 inline-block -translate-y-1/2">
      <slot name="timer"></slot>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

import { converse } from '@/utils/conversion';
import { throttle } from '@/utils/throttle-debounce';

// Props
const props = defineProps({
  width: {
    type: String,
    default: '1920px',
  },
  titleWidth: {
    type: String,
    default: '400px',
  },
  height: {
    type: String,
    default: '80px',
  },
  backgroundColor: {
    type: String,
    default: 'transparent',
  },
  borderColor: {
    type: Array,
    default: () => ['#5B14DC'],
  },
  dur: {
    type: Number,
    default: 2,
  },
});

// Refs for calculated dimensions
const getWidth = ref();
const getHeight = ref();
const getTitleWidth = ref();

// Function to update dimensions
const updateDimensions = () => {
  getWidth.value = converse(props.width, leTitleBox.value, 'width', 100);
  getHeight.value = converse(props.height, leTitleBox.value, 'height', 20);
  getTitleWidth.value = converse(props.titleWidth, leTitleBox.value, 'width', 50);
};

// Refs for the component
const leTitleBox = ref(null);

onMounted(() => {
  updateDimensions();
  window.addEventListener('resize', throttle(updateDimensions, 1000));
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', throttle(updateDimensions, 1000));
});
</script>
