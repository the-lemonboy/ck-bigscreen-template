<template>
  <div class="relative">
    <titleBorder
      class="text-xl font-bold text-white"
      :border-color="['rgba(90,137,193,1)', 'rgba(90,137,193,0.3)']"
      >水平条形图Demo</titleBorder
    >
    <div class="bg-regal-blue my-4 flex w-full justify-start">
      <div id="Bar-Chart_container"></div>
    </div>
  </div>
</template>
<script setup>
import { Chart } from '@antv/g2';
import { onMounted } from 'vue';

import titleBorder from '@/components/titleBorder/index.vue';

onMounted(() => {
  const chart = new Chart({
    container: 'Bar-Chart_container',
    width: 300,
    height: 300,
    autoFit: true,
  });

  chart.coordinate({ transform: [{ type: 'transpose' }] });

  chart
    .interval()
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
      format: 'csv',
    })
    .transform({ type: 'sortX', reverse: true })
    .encode('x', 'letter')
    .encode('y', 'frequency')
    .axis('y', { labelFormatter: '.0%' })
    .label({
      text: 'frequency',
      formatter: '.1%',
      textAlign: (d) => (+d.frequency > 0.008 ? 'right' : 'start'),
      fill: (d) => (+d.frequency > 0.008 ? '#fff' : '#000'),
      dx: (d) => (+d.frequency > 0.008 ? -5 : 5),
    });

  chart.render();
});
</script>
