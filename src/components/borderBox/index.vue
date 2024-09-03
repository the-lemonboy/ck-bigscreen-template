<template>
  <div
    ref="leFrameBox"
    class="relative h-full w-full"
    :style="`width:${getWidth}px; height:${getHeight}px;`"
  >
    <svg class="absolute left-0 top-0" :width="getWidth" :height="getHeight">
      <defs>
        <circle id="theCircle" :fill="borderColor[0]" r="4"></circle>
      </defs>
      <polygon
        :stroke="borderColor"
        :fill="backgroundColor"
        :points="`${getTitleHeight},0 ${getWidth - 80},1 ${getWidth - 70},10 ${getWidth - 20},10 ${getWidth - 10},1 ${getWidth},1 ${getWidth},${getHeight - getTitleHeight} ${getWidth - getTitleHeight},${getHeight} 0,${getHeight}  0,${getTitleHeight}`"
        stroke-width="1"
      ></polygon>
      <polygon
        :fill="cornerColor[0]"
        :points="`0,0 ${getTitleHeight - 8},0 0,${getTitleHeight - 8}`"
      ></polygon>
      <polygon
        :fill="cornerColor[1]"
        :points="`${getWidth},${getHeight} ${getWidth - getTitleHeight + 8},${getHeight} ${getWidth},${getHeight - getTitleHeight + 8}`"
      ></polygon>
      <!-- 右上角的四边形 -->
      <g>
        <polygon
          :fill="cornerColor[2]"
          :points="`${getWidth - 75},0 ${getWidth - 67} 0 ${getWidth - 59},7 ${getWidth - 67},7`"
        >
          <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
          />
        </polygon>
        <polygon
          :fill="cornerColor[2]"
          :points="`${getWidth - 62},0 ${getWidth - 54} 0 ${getWidth - 46},7 ${getWidth - 54},7`"
        >
          <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
          />
        </polygon>
        <polygon
          :fill="cornerColor[2]"
          :points="`${getWidth - 49},0 ${getWidth - 41} 0 ${getWidth - 33},7 ${getWidth - 41},7`"
        >
          <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
          />
        </polygon>
        <polygon
          :fill="cornerColor[2]"
          :points="`${getWidth - 36},0 ${getWidth - 28} 0 ${getWidth - 20},7 ${getWidth - 28},7`"
        >
          <animate
            attributeName="opacity"
            values="1;0.7;1"
            dur="2s"
            begin="0s"
            repeatCount="indefinite"
          />
        </polygon>
      </g>
    </svg>
    <svg
      class="absolute"
      style="right: -10px; top: -22px"
      width="20"
      height="20"
      @click="handleClose"
    >
      <circle cx="10" cy="10" r="9" :stroke="closeColor" stroke-width="1" fill="none"></circle>
      <line x1="6" y1="6" x2="14" y2="14" :stroke="closeColor" stroke-width="1.5" />
      <line x1="6" y1="14" x2="14" y2="6" :stroke="closeColor" stroke-width="1.5" />
    </svg>
    <div class="absolute left-0 top-0 h-full w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watchEffect } from 'vue';

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
    default: '300px',
  },
  titleHeight: {
    type: String,
    default: '30px',
  },
  borderColor: {
    type: String,
    default: '#00B9FF',
  },
  closeColor: {
    type: String,
    default: '#ffffff',
  },
  cornerColor: {
    type: Array,
    default: () => ['#76CFF4', '#76CFF4', '#76CFF4'],
  },
  backgroundColor: {
    type: String,
    default: 'transparent',
  },
});
const showPopupFlag = defineModel({
  type: Boolean,
  default: false,
});
function handleClose() {
  showPopupFlag.value = false;
  console.log('showPopupFlag', showPopupFlag.value);
}
// Refs for computed values
const leFrameBox = ref(null);
const getWidth = ref(converse(props.width, leFrameBox.value, 'width'));
const getHeight = ref(converse(props.height, leFrameBox.value, 'height'));
const getTitleHeight = ref(converse(props.titleHeight, leFrameBox.value, 'height'));
watchEffect(() => {
  getWidth.value = converse(props.width, leFrameBox.value, 'width');
  getHeight.value = converse(props.height, leFrameBox.value, 'height');
  getTitleHeight.value = converse(props.titleHeight, leFrameBox.value, 'height');
});

// Handle window resize
const onResize = throttle(() => {
  getWidth.value = converse(props.width, leFrameBox.value, 'width');
  getHeight.value = converse(props.height, leFrameBox.value, 'height');
  getTitleHeight.value = converse(props.titleHeight, leFrameBox.value, 'height');
}, 1000);

onMounted(() => {
  window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});
</script>
