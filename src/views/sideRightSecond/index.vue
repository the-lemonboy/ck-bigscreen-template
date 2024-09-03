<template>
  <div class="relative">
    <titleBorder
      :border-color="['rgba(90,137,193,1)', 'rgba(90,137,193,0.3)']"
      class="text-xl font-bold text-white"
      >饼图Demo</titleBorder
    >
    <div class="my-4 flex w-full justify-center bg-regal-blue">
      <div id="Fan-Chart_container"></div>
    </div>
  </div>
</template>
<script setup>
import { Chart } from '@antv/g2';
import { onMounted } from 'vue';

import titleBorder from '@/components/titleBorder/index.vue';

onMounted(() => {
  const chart = new Chart({
    container: 'Fan-Chart_container',
    width: 380,
    height: 320,
    theme: 'classicDark',
  });

  chart.coordinate({ type: 'polar', outerRadius: 0.85 });

  chart
    .interval()
    .transform({ type: 'groupX', y: 'sum' })
    .data({
      type: 'fetch',
      value: 'https://gw.alipayobjects.com/os/bmw-prod/87b2ff47-2a33-4509-869c-dae4cdd81163.csv',
    })
    .encode('x', 'year')
    .encode('color', 'year')
    .encode('y', 'people')
    .scale('y', { type: 'sqrt' })
    .scale('x', { padding: 0 })
    .axis(false)
    .label({
      text: 'people',
      position: 'outside',
      formatter: '~s',
      transform: [{ type: 'overlapDodgeY' }],
    })
    .legend({ color: { length: 400, layout: { justifyContent: 'center' } } })
    .animate('enter', { type: 'waveIn' })
    .tooltip({ channel: 'y', valueFormatter: '~s' });

  chart.render();
});
</script>
