<template>
  <div class="relative h-screen w-screen">
    <headerZone></headerZone>
    <div class="absolute left-4 top-40">
      <sideLeftFirst :width="'200px'"></sideLeftFirst>
    </div>
    <div class="absolute left-4 top-1/2">
      <sideLeftSecond :width="'20vw'"></sideLeftSecond>
    </div>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <centerContent></centerContent>
    </div>
    <div class="absolute right-4 top-40">
      <sideRightFirst :width="'20vw'"></sideRightFirst>
    </div>
    <div class="absolute right-4 top-1/2">
      <sideRightSecond :width="'20vw'"></sideRightSecond>
    </div>
  </div>
</template>
<script setup>
import centerContent from './centerContent/index.vue';
import headerZone from './header/index.vue';
import sideLeftFirst from './sideLeftFirst/index.vue';
import sideLeftSecond from './sideLeftSecond/index.vue';
import sideRightFirst from './sideRightFirst/index.vue';
import sideRightSecond from './sideRightSecond/index.vue';
</script>
