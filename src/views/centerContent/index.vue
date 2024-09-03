<template>
  <borderBox class="p-2" :width="'1400px'" :height="'790px'">
    <div id="map" style="height: 740px; width: 900px"></div>
    <popupBox
      v-show="showPopupFlag"
      id="custom"
      v-model="showPopupFlag"
      class="mb-5"
      :height="'200px'"
      :width="'300px'"
      :corner-color="['rgba(90,137,193,1)', 'rgba(90,137,193,1)', 'rgba(90,137,193,1)']"
      :background-color="'rgba(0,0,0,0.4)'"
      :border-color="'rgba(90,137,193,1)'"
    >
      <div class="flex h-full w-full items-center justify-between">
        <div class="ml-5 flex h-3/4 flex-col justify-evenly text-base text-white">
          <span>属性一: 测试1</span>
          <span>属性二: 测试2</span>
          <span>属性三: 测试3</span>
          <span>属性四: 测试4</span>
        </div>
        <div class="h-15 border-1 mr-5 h-20 border-solid border-blue-200">
          <img
            class="h-full w-full"
            src="https://images.unsplash.com/photo-1486607303850-bc051a4ffad4?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="image"
          />
        </div>
      </div>
    </popupBox>
  </borderBox>
</template>
<script setup>
import { Scene, Popup, RasterLayer, PointLayer } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import { onMounted, reactive, ref, watch } from 'vue';

import popupBox from '@/components/borderBox/index.vue';
import borderBox from '@/components/borderSecond/index.vue';

const nodesList = reactive([
  {
    id: 1,
    lat: 31.228585,
    lng: 121.458415,
  },
]);
const showPopupFlag = ref(false);
watch(showPopupFlag, (val) => {
  if (!val) {
    popup.hide();
  }
});
// 地图全局变量
let scene = null;
const nodesLayer = ref(null);
let popup = null;
function initMap() {
  return new Promise((resolve) => {
    scene = new Scene({
      id: 'map',
      map: new Map({
        center: [121.458415, 31.228585],
        zoom: 15,
      }),
    });
    scene.on('loaded', () => {
      // 影像底图服务
      const baseLayer = new RasterLayer({
        zIndex: 1,
      });
      baseLayer.source('https://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}', {
        parser: {
          type: 'rasterTile',
          tileSize: 256,
          // minZoom: 6,
          // maxZoom: 15,
          zoomOffset: 0,
          // extent: [-180, -85.051129, 179, 85.051129],
        },
      });

      // 影像注记服务
      const annotionLayer = new RasterLayer({
        zIndex: 2,
      });
      annotionLayer.source(
        'https://webst0{1-3}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}',
        {
          parser: {
            type: 'rasterTile',
            tileSize: 256,
            // minZoom: 6,
            // maxZoom: 15,
            zoomOffset: 0,
            // extent: [-180, -85.051129, 179, 85.051129],
          },
        },
      );
      // 添加点位图层
      nodesLayer.value = new PointLayer()
        .source(nodesList, {
          parser: {
            type: 'json',
            x: 'lng',
            y: 'lat',
          },
        })
        .shape('cylinder')
        .size(16)
        .color('red');
      scene.addLayer(baseLayer);
      scene.addLayer(annotionLayer);
      scene.addLayer(nodesLayer.value);
      resolve();
    });
  });
}
function addPopup() {
  // 添加popup
  nodesLayer.value.on('click', (val) => {
    const customBox = document.getElementById('custom'); // 获取自定义的dom元素
    const { lat, lng } = val.feature; // 获取经纬度
    popup = new Popup({
      // 初始锚点经纬度
      lngLat: {
        lat,
        lng,
      },
      maxWidth: 300,
      closeButton: false,
    });
    popup.setHTML(customBox);
    scene.addPopup(popup);
    showPopupFlag.value = true;
    console.log('click');
  });
}
onMounted(async () => {
  await initMap();
  addPopup();
});
</script>
<style scoped>
:deep(.l7-popup .l7-popup-content) {
  background: rgba(0, 0, 0, 0);
  padding: 0;
}
</style>
