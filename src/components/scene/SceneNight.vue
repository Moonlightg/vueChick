<template>
  <div class="bg-content-night">
    <canvas id="myCanvas"></canvas>
    <!-- 山峰 -->
    <!-- <Cpeak></Cpeak> -->
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
// import Cpeak from './bg/Cpeak.vue'         // 山峰
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
    // Cpeak,
    Cgrass,
    Chouse,
    Cfence,
    Cleaf,
    Ctrough
  },
  mounted(){
    //绘制canvas图像
    this.getCanvas();
  },
  methods: {
    getCanvas(){
      var canvas = document.getElementById("myCanvas");
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight/2;
      var ctx = canvas.getContext("2d");

      ctx.beginPath(); // 一个图形开始
      ctx.fillStyle="#FF0000";
      ctx.fillRect(0,0,150,75);
      ctx.closePath(); // 一个图形结束

      ctx.beginPath()
      ctx.rect(0, canvas.height-175, 150, 75);
      ctx.strokeStyle = '#2DE0A5';
      ctx.stroke(); // 描边
      ctx.fillStyle = 'rgba(45, 224, 165, 0.3)';
      ctx.fill();
      ctx.closePath();

      this.canvasMonth(ctx,0,canvas.height,100,canvas.height,"#836da1","#836da1");
      this.canvasArc(ctx,25,canvas.height-100,25,0,Math.PI,true,"#836da1","#836da1");
    },
    /**
     * canvas状态绘制机制  多边形  矩形
     * beginPath  表示从这里开始绘制
     * closePath  封闭多边形绘制结束方法
     * fill       封闭多边形填充开始方法
     * @param context  属于谁
     * @param moveToX  线条起点 X坐标 类型number
     * @param moveToY  线条起点  Y坐标 类型number
     * @param lineToX 线条终点 X坐标 类型number
     * @param lineToY 线条终点 Y坐标 类型number
     * @param lineWidth  线条宽度  类型number
     * @param strokeStyle  线条颜色  类型String
     * @param fillStyle 封闭图形颜色  类型String
     */
    canvasMonth(context,moveToX,moveToY,lineToX,lineToY,strokeStyle,fillStyle){
      context.beginPath(); //清除上一次的绘制参数 开始绘制
      context.moveTo(moveToX,moveToY); //线条起点moveToX,moveToY
      context.lineTo(moveToX+lineToX*2,moveToY);
      context.lineTo(moveToX+lineToX,moveToY-lineToX);
      context.lineTo(moveToX,moveToY-lineToX);
      // context.lineTo(moveToX,moveToY+lineToY);
      context.closePath();//封闭多边形结束方法
      // context.lineWidth=lineWidth; //线条宽度
      context.fillStyle=fillStyle; //多边形填充颜色
      context.strokeStyle=strokeStyle;//线条颜色
      context.fill(); //多边形填充
      context.stroke(); //结束绘制
      context.closePath();
    },
    /**
     * 绘制半圆
     * canvas状态绘制机制
     * context.arc(x,y,r,start,end,counterclockwise)
     * (x,y) 弧形的圆心
     * r 弧形半径
     * start，end 弧形起止点
     * counterclockwise 是否逆时针，true是逆时针
     * @param strokeStyle  线条颜色  类型String
     * @param fillStyle    图形填充颜色  类型String
    */
    canvasArc(context,x,y,r,start,end,counterclockwise,strokeStyle,fillStyle){
      context.beginPath();//开始绘制
      context.strokeStyle=strokeStyle;
      context.arc(x,y,r,start,end,counterclockwise);    
      context.closePath();
      context.fillStyle=fillStyle;
      context.fill();
      context.stroke();
      context.closePath();
    }
  }
}

</script>
