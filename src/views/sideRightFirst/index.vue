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
    { year: '1951 年', sales: 38 },
    { year: '1952 年', sales: 52 },
    { year: '1956 年', sales: 61 },
    { year: '1957 年', sales: 145 },
    { year: '1958 年', sales: 48 },
    { year: '1959 年', sales: 38 },
    { year: '1960 年', sales: 38 },
    { year: '1962 年', sales: 38 },
  ];

  const chart = new Chart({
    container: 'Bar-Chart_container',
    autoFit: true,
    height: 300,
    width: 400,
  });

  chart
    .interval()
    .coordinate({ transform: [{ type: 'transpose' }] })
    .data(data)
    .encode('x', 'year')
    .encode('y', 'sales');

  chart.render();
});
</script>
