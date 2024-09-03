<template>
  <screenAdaptive :width="1920" :height="960" :full-screen="true">
    <div id="main-box">
      <mainPage></mainPage>
    </div>
  </screenAdaptive>

  <!-- <textline></textline> -->
  <!-- <text></text> -->
  <!-- <test></test> -->
  <!-- <borderText></borderText> -->
</template>
<script setup>
// import texts from '@/components/headerBorder/index.vue'
import screenAdaptive from '@/components/screenAdaptive/index.vue';
import mainPage from '@/views/main.vue';
// import borderText from '@/components/borderBox/index.vue';
// import test from '@/components/titleBorderSecond/index.vue';
</script>
<style>
#main-box {
  width: 100%;
  height: 100%;
  position: fixed;

  background-attachment: fixed;
}
</style>
