<template>
  <div class="bg-content-night">
    <canvas id="myCanvas"></canvas>
    <!-- 山峰 -->
    <!-- <Cpeak></Cpeak> -->
    <div class="land-wrap" style="opacity: 1">
      <!-- 草地 -->
      <Cgrass></Cgrass>
      <!-- 房子 -->
      <Chouse></Chouse>
      <!-- 护栏 -->
      <Cfence></Cfence>
    </div>
    <div style="opacity: 1">
    <!-- 叶子 -->
    <Cleaf></Cleaf>
    <!-- 鸡饭碗 -->
    <Ctrough></Ctrough>
    </div>
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
      canvas.height = document.documentElement.clientHeight*0.6;
      var ctx = canvas.getContext("2d");

      // ctx.beginPath(); // 一个图形开始
      // ctx.fillStyle="#FF0000";
      // ctx.fillRect(0,0,150,75);
      // ctx.closePath(); // 一个图形结束

      // ctx.beginPath()
      // ctx.rect(0, canvas.height-175, 150, 75);
      // ctx.strokeStyle = '#2DE0A5';
      // ctx.stroke(); // 描边
      // ctx.fillStyle = 'rgba(45, 224, 165, 0.3)';
      // ctx.fill();
      // ctx.closePath();

      this.drawCloud(ctx,canvas.width,canvas.height,"#60527d");                         // 函数绘制连续山峰
      // this.canvasArc(ctx,25,canvas.height-200,25,0,Math.PI,true,"#816891","#816891");   // 半圆
      this.roundRect(ctx, 0, canvas.height-130, 50, 150, 40,2,"#816791","#816791");     // 圆角矩形
      this.roundRect(ctx, 40, canvas.height-100, 40, 120, 40,2,"#816791","#816791");    // 圆角矩形
      this.roundRect(ctx, -15, canvas.height-100, 30, 120, 40,2,"#776090","#776090");   // 圆角矩形
      this.roundRect(ctx, 0, canvas.height-40, 30, 60, 40,2,"#60527d","#60527d");       // 圆角矩形
      this.roundRect(ctx, 25, canvas.height-50, 30, 70, 40,2,"#60527d","#60527d");      // 圆角矩形
      this.peakA(ctx,canvas.height,canvas.width,2,"#856fa3","#856fa3",false); // 小山
      this.peakB(ctx,canvas.height,canvas.width,2,"#272a57","#272a57",false); // 小山2
      this.peakC(ctx,canvas.height,canvas.width,2,"#433e75","#433e75",false); // 小山3
      this.roundRect(ctx, 200, canvas.height-100, 40, 70, 40,2,"#383b6a","#383b6a");    // 圆角矩形
      this.roundRect(ctx, 175, canvas.height-90, 40, 70, 40,2,"#383b6a","#383b6a");     // 圆角矩形
      this.roundRect(ctx, canvas.width-20, canvas.height-120, 40, 70, 40,2,"#383b6a","#383b6a");     // 圆角矩形
      this.canvasMonth(ctx,50,canvas.height,canvas.width,canvas.height,2,"#a17ba9","#2d2664",true); // 梯形
      
      //this.drawLine(ctx,150,canvas.height-70,190,canvas.height-150,240,canvas.height-200); // 绘制贝塞尔曲线
      //this.roundRect(ctx, 100, canvas.height-50, 40, 50, 40,"#836da1","#836da1");
      
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
     * @param isCreate 是否渐填充
     */
    canvasMonth(context,moveToX,moveToY,lineToX,lineToY,lineWidth,strokeStyle,fillStyle,isCreate){
      context.beginPath(); //清除上一次的绘制参数 开始绘制
      context.moveTo(moveToX,moveToY); //线条起点moveToX,moveToY
      context.lineTo(moveToX+60,moveToY-70);
      context.lineTo(lineToX,moveToY-70);
      context.lineTo(lineToX,moveToY);
      // context.lineTo(moveToX+lineToX*2,moveToY-100);
      // context.lineTo(moveToX+lineToX,moveToY-lineToX);
      // context.lineTo(moveToX,moveToY-lineToX);
      // context.lineTo(moveToX,moveToY+lineToY);
      
      context.lineWidth=lineWidth; //线条宽度
      // context.fillStyle=fillStyle; //多边形填充颜色
      context.strokeStyle=strokeStyle;//线条颜色
      context.shadowColor = strokeStyle; // 设置或返回用于阴影的颜色
      context.shadowBlur = 4;            // 设置或返回用于阴影的模糊级别
      context.shadowOffsetX = 0;         // 设置或返回阴影距形状的水平距离
      context.shadowOffsetY = 0          // 设置或返回阴影距形状的垂直距离 
      context.closePath();//封闭多边形结束方法

      if (isCreate) {
        var gradient = context.createLinearGradient((lineWidth-moveToX)/2.5, lineToX-70, (lineWidth-moveToX)/2, lineToX);
        //添加多种颜色
        gradient.addColorStop(1, "#725d8f");
        gradient.addColorStop(0, fillStyle);
        //填充渐变色
        context.fillStyle = gradient;
      } else {
        context.fillStyle = fillStyle;
      }
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
    },

    //绘制圆角矩形
    roundRect(ctx, x, y, w, h, r,lineWidth,strokeStyle,fillStyle) {
        if (w < 2 * r) {r = w / 2;}
        if (h < 2 * r){ r = h / 2;}
        ctx.beginPath();
        ctx.strokeStyle=strokeStyle;
        ctx.moveTo(x+r, y);
        ctx.arcTo(x+w, y, x+w, y+h, r);
        ctx.arcTo(x+w, y+h, x, y+h, r);
        ctx.arcTo(x, y+h, x, y, r);
        ctx.arcTo(x, y, x+w, y, r);
        ctx.closePath();
        ctx.lineWidth=lineWidth; //线条宽度
        ctx.fillStyle=fillStyle;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    },
    getRandom(seek) {
      return parseInt(Math.random() * seek + 1);
    },
    getTranslateX(r, radious){
      return parseInt(Math.abs(2 * r * Math.sin(100 * radious / 180)));
    },
    // 函数画山峰背景
    drawCloud(ctx,w,h,fillStyle) {
      let _this = this;
      console.log(h);
      ctx.moveTo(0, 80);
      //let i = 0;
      let maxWidth = w;
      let x = 0, y = h-100;
      //一弧度=180/pi
      ctx.beginPath();
      while (x <= maxWidth) {
        let r = _this.getRandom(35);
        let radious = _this.getRandom(360) / Math.PI;
        let nextX = _this.getTranslateX(r, radious);
        ctx.arc(x + r, y, r, 0, radious, false);
        x += nextX;
      }
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fillRect(0, h-100, maxWidth, 100);
      ctx.fill();
    },
    // 画贝塞尔曲线
    drawLine(ctx,x,y, controlX, controlY, endX, endY) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      ctx.fillStyle = "#red";
      ctx.fill();
      ctx.stroke();
      ctx.closePath();
    },
    // 小山 - 自定义路径
    peakA(context,h,w,lineWidth,strokeStyle,fillStyle,isCreate) {
      context.beginPath(); //清除上一次的绘制参数 开始绘制
      context.moveTo(w-180,h-70); //线条起点moveToX,moveToY
      context.lineTo(w-180,h-100);
      context.lineTo(w-160,h-100);
      context.lineTo(w-120,h-140);
      context.lineTo(w-60,h-140);
      context.lineTo(w-20,h-110);
      context.lineTo(w,h-110);
      context.lineTo(w,h-70);
      context.closePath();//封闭多边形结束方法
      context.lineWidth=lineWidth; //线条宽度
      context.strokeStyle=strokeStyle;//线条颜色
      if (isCreate) {
        var gradient = context.createLinearGradient((lineWidth-10)/2.5, 10, (lineWidth-10)/2, 10);
        //添加多种颜色
        gradient.addColorStop(1, "#725d8f");
        gradient.addColorStop(0, fillStyle);
        //填充渐变色
        context.fillStyle = gradient;
      } else {
        context.fillStyle = fillStyle;
      }
      context.fill(); //多边形填充
      context.stroke(); //结束绘制
      context.closePath();
    },
    // 小山 - 自定义路径
    peakB(context,h,w,lineWidth,strokeStyle,fillStyle,isCreate) {
      context.beginPath(); //清除上一次的绘制参数 开始绘制
      context.moveTo(w-180,h-50); //线条起点moveToX,moveToY
      context.lineTo(w-180,h-90);
      context.lineTo(w-155,h-90);
      context.lineTo(w-115,h-130);
      context.lineTo(w-65,h-130);
      context.lineTo(w-25,h-100);
      context.lineTo(w,h-100);
      context.lineTo(w,h-50);
      context.closePath();//封闭多边形结束方法
      context.lineWidth=lineWidth; //线条宽度
      context.strokeStyle=strokeStyle;//线条颜色
      if (isCreate) {
        var gradient = context.createLinearGradient((lineWidth-10)/2.5, 10, (lineWidth-10)/2, 10);
        //添加多种颜色
        gradient.addColorStop(1, "#725d8f");
        gradient.addColorStop(0, fillStyle);
        //填充渐变色
        context.fillStyle = gradient;
      } else {
        context.fillStyle = fillStyle;
      }
      context.fill(); //多边形填充
      context.stroke(); //结束绘制
      context.closePath();
    },
    // 小山 - 自定义路径
    peakC(context,h,w,lineWidth,strokeStyle,fillStyle,isCreate) {
      context.beginPath(); //清除上一次的绘制参数 开始绘制
      context.moveTo(w-180,h-45); //线条起点moveToX,moveToY
      context.lineTo(w-180,h-85);
      context.lineTo(w-155,h-85);
      context.lineTo(w-115,h-125);
      context.lineTo(w-65,h-125);
      context.lineTo(w-25,h-95);
      context.lineTo(w,h-95);
      context.lineTo(w,h-45);
      context.closePath();//封闭多边形结束方法
      context.lineWidth=lineWidth; //线条宽度
      context.strokeStyle=strokeStyle;//线条颜色
      if (isCreate) {
        var gradient = context.createLinearGradient((lineWidth-10)/2.5, 10, (lineWidth-10)/2, 10);
        //添加多种颜色
        gradient.addColorStop(1, "#725d8f");
        gradient.addColorStop(0, fillStyle);
        //填充渐变色
        context.fillStyle = gradient;
      } else {
        context.fillStyle = fillStyle;
      }
      context.fill(); //多边形填充
      context.stroke(); //结束绘制
      context.closePath();
    }
  }
}

</script>
<style type="text/css">
  .bg-night .grass-1 {
    background-color: #bb90b7;
  }
  .bg-night .grass-1>span:nth-child(1), 
  .bg-night .grass-1>span:nth-child(2) {
    background-image: linear-gradient(225deg, rgba(192, 148, 183, 0.8), #c093b8);
  }
  .bg-night .grass-1>span:nth-child(3) {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#816da7), to(#9a77aa));
    background-image: linear-gradient(180deg, #816da7, #9a77aa);
  }
  .bg-night .grass-1>span:nth-child(4) {
    background-image: -webkit-gradient(linear, left top, left bottom, from(#9675aa), to(#836ea8));
    background-image: linear-gradient(180deg, #9675aa, #836ea8);
  }
  .bg-night .grass-1>span:nth-child(5) {
    background-image: linear-gradient(225deg, #c4a3c1, #b79cbe);
  }
  .bg-night .grass-1>span:nth-child(5):before {
    background-image: linear-gradient(225deg, #b58dbb, #bfa1c0);
  }
  .bg-night .grass-1>span:nth-child(6) {
    background-image: linear-gradient(225deg, #c0a1c0, #be93b7);
  }
  .bg-night .grass-1>span:nth-child(6):before {
    background-image: linear-gradient(225deg, #b792bc, #c2a2c1);
  }
  .bg-night .grass-1>span:nth-child(6):after {
    background-image: linear-gradient(225deg, #be93b7, #bf9ebe);
  }
  .bg-night .trough:before,
  .bg-night .foot:before { background-color: #8670a7;}
  .bg-night .egg-wrapper span:nth-child(1), 
  .bg-night .egg-wrapper span:nth-child(1):before { background-color: #cba6c2;}
  .bg-night .triangle-box { display: none; }
  .bg-night .egg-wrapper span:nth-child(2), 
  .bg-night .egg-wrapper span:nth-child(2):before { background-color: #9d7aaa;}
  .bg-night .egg-wrapper span:nth-child(3), 
  .bg-night .egg-wrapper span:nth-child(3):before { background-color: #c29dbd;}
  .bg-night .egg-wrapper span:nth-child(4), 
  .bg-night .egg-wrapper span:nth-child(4):before { background-color: #9d79aa;}
  .bg-night .leaf-box .leaf-1,
  .bg-night .leaf-box .leaf-3 { background: #503775;}
  .bg-night .leaf-box .leaf-2,
  .bg-night .leaf-box .leaf-4 { background: #2c1a4a;}
  .bg-night .house-1 { background-color: #5266aa;}
  .bg-night .house-2 { border-bottom: 2rem solid #5266aa;}
  .bg-night .house-2-2 { border-bottom: 2rem solid #1f306c;}
  .bg-night .house-3-2 { border-bottom: 1.9rem solid #1f306c;}
  .bg-night .house-2-1 { border-bottom: 2rem solid #f8ddc4;}
  .bg-night .house-3 { border-bottom: 1.5rem solid #5266aa;}
  .bg-night .house-3-1 { border-bottom: 2.2rem solid #f8ddc4;}
  .bg-night .house-4,
  .bg-night .house-5 { background-color: #0f1e4e;}
  .bg-night .house-6 { background-color: #f8ddc4;}
  .bg-night .house-6:before {background-color: #2a458c;}
  .bg-night .house-7 { background: #1e2e6e;}
  .bg-night .house-7:before, 
  .bg-night .house-7:after {
    background-color: #f9ddc4;
    border: .15rem solid #5266aa;
  }
  .bg-night .house-8 { background: #1e2f6d;}
  .bg-night .house-8:before { background-color: #899dde;}
  .bg-night .house-8:after { background-color: #0e1c4e;}
  .bg-night .house-9 { background-color: #363a72;}
</style>
