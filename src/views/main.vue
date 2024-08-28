<template>
  <!-- <screenAdaptive :width="2560" :height="1080"> -->
  <div class="bg-first-bg relative h-screen w-screen">
    <headerZone></headerZone>
    <div class="absolute left-10 top-28">
      <centerContent></centerContent>
    </div>
    <div class="absolute right-4 top-28">
      <sideRightFirst :width="'400px'"></sideRightFirst>
    </div>
    <div class="absolute bottom-10 right-4">
      <sideRightSecond :width="'400px'"></sideRightSecond>
    </div>
    <div style="position: absolute; top: 500px; left: -520px">
      <decorateLineLeft
        :background-color="'rgba(90,137,193,1)'"
        :width="'90vh'"
        :rotate="'true'"
      ></decorateLineLeft>
    </div>
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
      <decorateLineFooter
        :background-color="'rgba(90,137,193,1)'"
        :width="'98vw'"
      ></decorateLineFooter>
    </div>
  </div>
  <!-- </screenAdaptive> -->
</template>
<script setup>
import { defineAsyncComponent } from 'vue';

import centerContent from './centerContent/index.vue';
import headerZone from './header/index.vue';
import sideRightFirst from './sideRightFirst/index.vue';
import sideRightSecond from './sideRightSecond/index.vue';

const decorateLineFooter = defineAsyncComponent(
  () => import('@/components/decorateLine/index.vue'),
);
const decorateLineLeft = defineAsyncComponent(() => import('@/components/decorateLine/index.vue'));
</script>
