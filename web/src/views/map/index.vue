<template>
  <div class="map-box">
    <div id="allmap"></div>
  </div>
</template>

<script>
  // 参考api文档 http://lbsyun.baidu.com/jsdemo.htm#i6_1


  export default {
    mounted() {
      var map = new BMap.Map("allmap");
      map.centerAndZoom(new BMap.Point(120.137294,30.279159), 19);  // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    },
  }
</script>

<style lang="scss" scoped>

.map-box{
  height: calc(100vh - 120px);
  #allmap{
    width: 100%;
    height: 100%;
  }
}

</style>