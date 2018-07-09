<template>
  <div class="wow-box">
    <div class="list">
      <div>
        <div class="wow fadeInDown circular bg-blue" data-wow-delay="0.3s"></div>
        <div class="wow fadeInDown circular bg-green" data-wow-delay="0.6s"></div>
        <div class="wow fadeInDown circular bg-purple" data-wow-delay="0.9s"></div>
        <div class="wow fadeInDown circular bg-red" data-wow-delay="1.2s"></div>
      </div>

      <div class="of-hide">
        <div class="wow bounceInLeft left-box bg-yellow mr-20"></div>
        <div class="wow bounceInRight right-box bg-red"></div>
      </div>

      <div class="clear"></div>

      <div class="ov-hide mt-20">
        <div class="fl box" style="height: 600px">
          <div class="wow bounceInLeft box-1 bg-purple mr-20"></div>
        </div>
        <div class="fr box" style="height: 600px">
          <div class="wow bounceInRight box-2 bg-green" data-wow-delay="0.3s"></div>
          <div class="wow bounceInRight box-3 bg-blue" data-wow-delay="0.6s"></div>
        </div>
      </div>

      <div>
        <div class="wow fadeInUp circular bg-blue" data-wow-delay="0.3s"></div>
        <div class="wow fadeInUp circular bg-green" data-wow-delay="0.6s"></div>
        <div class="wow fadeInUp circular bg-purple" data-wow-delay="0.9s"></div>
        <div class="wow fadeInUp circular bg-red" data-wow-delay="1.2s"></div>
      </div>

      <div>
        <div class="wow rollIn circular bg-yellow" data-wow-delay="0.9s"></div>
      </div>

    </div>
  </div>
</template>

<script>
  /* 
    <div class="wow slideInLeft" data-wow-duration="2s" data-wow-delay="5s" data-wow-offset="10"  data-wow-iteration="10"></div>
      slideInLeft就是说明动画样式。后面的data-wow-duration（动画持续时间）、data-wow-delay（动画延迟时间）、
      data-wow-offset（元素的位置露出后距离底部多少像素执行）和data-wow-iteration（动画执行次数）
   */

  import 'animate.css'
  import {WOW} from 'wowjs'
  export default {
    data() {
      return {
        wow : '',
      }
    },
    mounted() {
      this.wowInit();
    },
    methods : {
      wowInit() {
        if(!this.wow) {
          this.wow = new WOW({
            scrollContainer : '.layout-container .el-scrollbar__wrap',
            live : false,
          });
        }
        this.wow.init();
        this.wow.sync();
      },
    },
  }
</script>

<style lang="scss" scoped>

.wow-box{
  font: 30px/280px "Microsoft Yahei";
  .list{
    text-align: center;
    // 圆样式
    .circular{
      width: 280px;
      height: 280px;
      border-radius: 50%;
      display: inline-block;
      margin: 30px 15px;
      vertical-align: middle;
    }
    .left-box , .right-box{
      width: calc(50% - 10px);
      float: left;
      height: 600px;
    }
    .box{
      width: calc(50% - 10px);
    }
    .box-1{
      width: 100%;
      height: 600px;
      display: inline-block;
    }
    .box-2{
      margin-bottom: 20px;
    }
    .box-2 , .box-3{
      width: 100%;
      height: 290px;
      float: left;
    }
  }
}

</style>