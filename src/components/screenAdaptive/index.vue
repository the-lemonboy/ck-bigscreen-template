<template>
  <div id="screen-adaptive">
    <div ref="screenAdapteRef" class="le-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: 1920,
  },
  height: {
    type: Number,
    default: 1080,
  },
  bodyOverflowHidden: {
    type: Boolean,
    default: true,
  },
  fullScreen: {
    type: Boolean,
    default: false,
  },
});

const screenAdapteRef = ref(null);
const domWidth = ref(0);
const domHeight = ref(0);
let observer = null;
let bodyOverflow = '';

function debounce(fn, delay) {
  let timer;
  return function debouncedFunction(...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(
      () => {
        if (typeof fn === 'function') {
          fn(...args);
        }
      },
      delay > 0 ? delay : 100,
    );
  };
}
async function initSize() {
  await nextTick();
  const dom = screenAdapteRef.value;
  if (dom) {
    domWidth.value = dom.clientWidth;
    domHeight.value = dom.clientHeight;
  }
}

function initBodyStyle() {
  if (props.bodyOverflowHidden) {
    bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
}

function updateSize() {
  nextTick(() => {
    const dom = screenAdapteRef.value;
    if (dom && props.width && props.height) {
      dom.style.width = `${props.width}px`;
      dom.style.height = `${props.height}px`;
    }
  });
}

function autoScale(scale) {
  nextTick(() => {
    const dom = screenAdapteRef.value;
    if (dom) {
      dom.style.transform = `scale(${scale}, ${scale})`;
    }
  });
}

function updateScale() {
  const currentWidth = document.body.clientWidth;
  const currentHeight = document.body.clientHeight;
  const realWidth = props.width || 1920;
  const realHeight = props.height || 1080;
  const widthScale = currentWidth / realWidth;
  const heightScale = currentHeight / realHeight;

  if (props.fullScreen) {
    autoScale(widthScale);
  } else {
    const scale = Math.min(widthScale, heightScale);
    autoScale(scale);
  }
}

function onResize() {
  initSize();
  updateSize();
  updateScale();
}

function initMutationObserver() {
  const dom = screenAdapteRef.value;
  observer = new MutationObserver(() => {
    debounce(onResize(), 1000);
  });
  observer.observe(dom, {
    attributes: true,
    attributeFilter: ['style'],
    attributeOldValue: true,
  });
}

onMounted(() => {
  initBodyStyle();
  window.addEventListener('resize', debounce(onResize, 1000));

  nextTick(async () => {
    await initSize();
    updateSize();
    updateScale();
    initMutationObserver();
  });
});

onBeforeUnmount(() => {
  if (props.bodyOverflowHidden) {
    document.body.style.overflow = bodyOverflow;
  }
  window.removeEventListener('resize', debounce(onResize, 1000));
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style lang="scss">
#screen-adaptive {
  overflow: hidden;
  background-size: 100% 100%;
  background-color: #000;
  width: 100vw;
  height: 100vh;
}

.le-wrapper {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 500ms;
  position: relative;
  overflow: hidden;
  z-index: 100;
  transform-origin: top left;
}
</style>
