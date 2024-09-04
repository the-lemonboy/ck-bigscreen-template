<template>
  <div class="relative h-full w-full bg-[url('../assets/bg/bg3.svg')]">
    <headerZone class="w-full"></headerZone>
    <div class="absolute left-10 top-28">
      <centerContent></centerContent>
    </div>
    <div class="absolute right-10 top-28">
      <sideRightFirst :width="'400px'"></sideRightFirst>
    </div>
    <div class="absolute bottom-10 right-10">
      <sideRightSecond :width="'400px'"></sideRightSecond>
    </div>
    <div style="position: absolute; top: 500px; left: -520px">
      <decorateLineLeft
        :background-color="'#A5CEF5'"
        :width="'90vh'"
        :rotate="true"
      ></decorateLineLeft>
    </div>
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
      <decorateLineFooter :background-color="'#A5CEF5'" :width="'98vw'"></decorateLineFooter>
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
