// 时间过滤器
const SecondToDate = function (value) {
  var time = value;
  if (null != time && "" != time) {
    if (time > 60 * 1000 && time < 60 * 60 * 1000) {
      time = parseInt(time / 1000 / 60.0) + "分钟" + parseInt((parseFloat(time / 1000 / 60.0) -
      parseInt(time / 1000 / 60.0)) * 60) + "秒";
    } else if (time >= 60 * 60 * 1000 && time < 60 * 60 * 24 * 1000) {
      time = parseInt(time / 1000 / 3600.0) + "小时" + parseInt((parseFloat(time / 1000 / 3600.0) -
      parseInt(time / 1000 / 3600.0)) * 60) + "分钟" +
      parseInt((parseFloat((parseFloat(time / 1000 / 3600.0) - parseInt(time / 1000 / 3600.0)) * 60) -
      parseInt((parseFloat(time / 1000 / 3600.0) - parseInt(time / 1000 / 3600.0)) * 60)) * 60) + "秒";
    } else if (time >= 60 * 60 * 24 * 1000) {
    time = parseInt(time / 1000 / 3600.0/24) + "天" +parseInt((parseFloat(time / 1000 / 3600.0/24)-
      parseInt(time / 1000 / 3600.0/24))*24) + "小时" + parseInt((parseFloat(time / 1000 / 3600.0) -
      parseInt(time / 1000 / 3600.0)) * 60) + "分钟" +
      parseInt((parseFloat((parseFloat(time / 1000 / 3600.0) - parseInt(time / 1000/ 3600.0)) * 60) -
      parseInt((parseFloat(time / 1000 / 3600.0) - parseInt(time / 1000 / 3600.0)) * 60)) * 60) + "秒";
    } else {
      time = Math.round((time % (1000 * 60)) / 1000) + "秒";
    }
  }
  return time;
}
export default {
    SecondToDate
}