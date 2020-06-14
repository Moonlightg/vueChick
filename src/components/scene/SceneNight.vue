<template>
  <div class="bg-content-night">
    <!-- 太阳光 -->
    <Csunlight></Csunlight>
    <!-- 山峰 -->
    <Cpeak></Cpeak>
    <!-- 白云 -->
    <Cclouds></Cclouds>
    <div class="land-wrap">
      <!-- 草地 -->
      <Cgrass></Cgrass>
      <!-- 房子 -->
      <Chouse></Chouse>
      <!-- 护栏 -->
      <Cfence></Cfence>
    </div>
    <!-- 叶子 -->
    <Cleaf></Cleaf>
    <!-- 鸡饭碗 -->
    <Ctrough></Ctrough>
  </div>
</template>
<script>
import Cpeak from './bg/Cpeak.vue'         // 山峰
import Cgrass from './bg/Cgrass.vue'       // 草地
import Chouse from './bg/Chouse.vue'       // 房子
import Cfence from './bg/Cfence.vue'       // 护栏
import Cleaf from './bg/Cleaf.vue'         // 叶子
import Ctrough from './bg/Ctrough.vue'     // 鸡饭碗
export default {
  name: 'SceneDay',
  data() {
    return {
    }
  },
  components: {
    Cpeak,
    Cgrass,
    Chouse,
    Cfence,
    Cleaf,
    Ctrough
  },
  methods: {
  }
}

</script>
