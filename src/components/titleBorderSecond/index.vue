<template>
  <div ref="leTitleBox" class="relative" :style="` width:${getWidth}px; height:${getHeight}px;`">
    <svg class="absolute left-0 top-0" :width="getWidth" :height="getHeight">
        
    </svg>
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
