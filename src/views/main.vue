<template>
  <!-- <screenAdaptive :width="2560" :height="1080"> -->
  <div class="relative h-screen w-screen">
    <headerZone></headerZone>
    <!-- <div class="absolute left-4 top-40">
      <sideLeftFirst :width="'200px'"></sideLeftFirst>
    </div>
    <div class="absolute left-4 top-1/2">
      <sideLeftSecond :width="'200px'"></sideLeftSecond>
    </div> -->
    <!-- <div class="absolute left-10 top-28">
      <centerContent></centerContent>
    </div> -->
    <div class="absolute right-4 top-32">
      <sideRightFirst :width="'400px'"></sideRightFirst>
    </div>
    <div class="absolute bottom-10 right-4">
      <sideRightSecond :width="'400px'"></sideRightSecond>
    </div>
  </div>
  <!-- </screenAdaptive> -->
</template>
<script setup>
import centerContent from './centerContent/index.vue';
import headerZone from './header/index.vue';
import sideRightFirst from './sideRightFirst/index.vue';
import sideRightSecond from './sideRightSecond/index.vue';
</script>
