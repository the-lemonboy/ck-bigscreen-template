<template>
  <div ref="leTitleBox" class="relative" :style="` width:${getWidth}px; height:${getHeight}px;`">
    <svg class="absolute left-0 top-0" :width="getWidth" :height="getHeight">
      <defs>
        <linearGradient id="gradient1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" :stop-color="borderColor[0]" />
          <stop offset="100%" :stop-color="borderColor[1]" />
        </linearGradient>
        <linearGradient id="gradient2">
          <stop offset="0%" :stop-color="borderColor[1]" stop-opacity="0.8" />
          <stop offset="100%" :stop-color="borderColor[0]" stop-opacity="0.5" />
        </linearGradient>

        <animate
          id="opacityId"
          attributeName="fill-opacity"
          values="0;1;0"
          dur="5s"
          repeatCount="indefinite"
        />
      </defs>
      <g>
        <polygon
          :fill="`url(#gradient1)`"
          :points="`0,0 10,0 20,${getHeight} 10,${getHeight}`"
        ></polygon>
        <!-- 右边框 -->
        <path
          :fill="`url(#gradient2)`"
          :d="`M 20,0 Q 26,${getHeight + 2}  60,${getHeight}  L ${getWidth},${getHeight} ${getWidth},0 `"
        ></path>
      </g>
      <g>
        <polygon
          fill="#6EE2F4"
          :points="`${getWidth - 15},${getHeight / 2} ${getWidth - 25},${getHeight / 2 + 10} ${getWidth - 25},${getHeight / 2 + 5} ${getWidth - 20},${getHeight / 2} ${getWidth - 25},${getHeight / 2 - 5} ${getWidth - 25},${getHeight / 2 - 10}`"
        >
          <animate
            attributeName="fill-opacity"
            values="1;0.2;1"
            :dur="`${dur}s`"
            repeatCount="indefinite"
          />
        </polygon>
        <polygon
          fill="#ACF5F1"
          :points="`${getWidth - 25},${getHeight / 2} ${getWidth - 35},${getHeight / 2 + 10} ${getWidth - 35},${getHeight / 2 + 5} ${getWidth - 30},${getHeight / 2} ${getWidth - 35},${getHeight / 2 - 5} ${getWidth - 35},${getHeight / 2 - 10}`"
        >
          <animate
            attributeName="fill-opacity"
            values="0.2;1;0.2"
            :dur="`${dur}s`"
            repeatCount="indefinite"
          />
        </polygon>
      </g>
    </svg>
    <div class="absolute left-10 top-1/2 inline-block -translate-y-1/2">
      <slot></slot>
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
    default: '400px',
  },
  height: {
    type: String,
    default: '40px',
  },
  backgroundColor: {
    type: String,
    default: 'transparent',
  },
  borderColor: {
    type: Array,
    default: () => ['#5B14DC', '#D6C3F7'],
  },
  dur: {
    type: Number,
    default: 2,
  },
});

// Refs for calculated dimensions
const getWidth = ref('');
const getHeight = ref('');

// Function to update dimensions
const updateDimensions = () => {
  getWidth.value = converse(props.width, leTitleBox.value, 'width', 100);
  getHeight.value = converse(props.height, leTitleBox.value, 'height', 20);
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
