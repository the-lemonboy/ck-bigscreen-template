<template>
  <div
    ref="leFrameBox"
    class="relative h-full w-full"
    :style="`box-shadow: inset 0 0 10px ${borderColor}; border: 1px solid ${borderColor[0]}; background-color:${backgroundColor}; width:${getWidth}px; height:${getHeight}px`"
  >
    <svg class="absolute left-0 top-0 h-full w-full" :width="getWidth" :height="getHeight">
      <!-- 外角 -->
      <polyline class="stroke-2" :stroke="cornerColor[1]" :points="`0, 25 0, 0 25, 0`" />
      <polyline
        class="stroke-2"
        :stroke="cornerColor[1]"
        :points="`${getWidth - 25}, 0 ${getWidth}, 0 ${getWidth}, 25`"
      />
      <polyline
        class="stroke-2"
        :stroke="cornerColor[1]"
        :points="`${getWidth - 25}, ${getHeight} ${getWidth}, ${getHeight} ${getWidth}, ${getHeight - 25}`"
      />
      <polyline
        class="stroke-2"
        :stroke="cornerColor[1]"
        :points="`0, ${getHeight - 25} 0, ${getHeight} 25, ${getHeight}`"
      />

      <polyline class="stroke-5" :stroke="cornerColor[0]" :points="`0, 10 0, 0 10, 0`" />
      <polyline
        class="stroke-5"
        :stroke="cornerColor[0]"
        :points="`${getWidth - 10}, 0 ${getWidth}, 0 ${getWidth}, 10`"
      />
      <polyline
        class="stroke-5"
        :stroke="cornerColor[0]"
        :points="`${getWidth - 10}, ${getHeight} ${getWidth}, ${getHeight} ${getWidth}, ${getHeight - 10}`"
      />
      <polyline
        class="stroke-5"
        :stroke="cornerColor[0]"
        :points="`0, ${getHeight - 10} 0, ${getHeight} 10, ${getHeight}`"
      />
    </svg>

    <div class="relative h-full w-full">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';

import { converse } from '@/utils/conversion';

// 定义 props
const props = defineProps({
  width: {
    type: String,
    default: '400px',
  },
  height: {
    type: String,
    default: '300px',
  },
  borderColor: {
    type: String,
    default: '#BCD4F5',
  },
  cornerColor: {
    type: Array,
    default: () => ['#BCD4F5', '#78BCFA'],
  },
  backgroundColor: {
    type: String,
    default: 'transparent',
  },
});

// 定义 ref 和变量
const leFrameBox = ref(null);
const getWidth = computed(() => {
  return converse(props.width, leFrameBox.value, 'width');
});
const getHeight = computed(() => {
  return converse(props.height, leFrameBox.value, 'height');
});
</script>
<style scoped>
polyline {
  fill: none;
  stroke-linecap: round;
}
</style>
