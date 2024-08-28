<template>
  <div class="relative">
    <titleBorder
      class="text-xl font-bold text-white"
      :border-color="['rgba(90,137,193,1)', 'rgba(90,137,193,0.3)']"
      >水平条形图Demo</titleBorder
    >
    <div class="my-4 flex w-full justify-start bg-regal-blue">
      <div id="Bar-Chart_container"></div>
    </div>
  </div>
</template>
<script setup>
import { Chart } from '@antv/g2';
import { onMounted } from 'vue';

import titleBorder from '@/components/titleBorder/index.vue';

onMounted(() => {
  const data = [
    { name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
    { name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
    { name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
    { name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
    { name: 'London', 月份: 'May', 月均降雨量: 47 },
    { name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
    { name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
    { name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
    { name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
    { name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
    { name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
    { name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
    { name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
    { name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
    { name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
    { name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
  ];

  const chart = new Chart({
    container: 'Bar-Chart_container',
    autoFit: true,
    width: 380,
    height: 300,
    theme: 'classicDark',
  });

  chart
    .interval()
    .data(data)
    .encode('x', '月份')
    .encode('y', '月均降雨量')
    .encode('color', 'name')
    .transform({ type: 'dodgeX' })
    .interaction('elementHighlight', { background: true });

  chart.render();
});
</script>
