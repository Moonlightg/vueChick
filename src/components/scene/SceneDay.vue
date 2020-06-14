<template>
  <div class="bg-content">
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
      <!-- 蜜蜂鲜花 -->
      <Cbee></Cbee>
      
    </div>
    <!-- 叶子 -->
    <Cleaf></Cleaf>
    <!-- 鸡饭碗 -->
    <Ctrough></Ctrough>
  </div>
</template>
<script>
import Csunlight from './bg/Csunlight.vue' // 太阳光
import Cpeak from './bg/Cpeak.vue'         // 山峰
import Cclouds from './bg/Cclouds.vue'     // 白云
import Cgrass from './bg/Cgrass.vue'       // 草地
import Chouse from './bg/Chouse.vue'       // 房子
import Cfence from './bg/Cfence.vue'       // 护栏
import Cbee from './bg/Cbee.vue'           // 蜜蜂鲜花
import Cleaf from './bg/Cleaf.vue'         // 叶子
import Ctrough from './bg/Ctrough.vue'     // 鸡饭碗
export default {
  name: 'SceneDay',
  data() {
    return {
    }
  },
  components: {
    Csunlight,
    Cpeak,
    Cclouds,
    Cgrass,
    Chouse,
    Cfence,
    Cbee,
    Cleaf,
    Ctrough
  },
  methods: {
  }
}

</script>
