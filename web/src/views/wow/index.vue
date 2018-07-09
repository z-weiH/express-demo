<template>
  <div class="wow-box">
    <div class="list">
      <div>
        <div class="wow fadeInUp bg-blue" data-wow-delay="0.3s"></div>
        <div class="wow fadeInUp bg-green" data-wow-delay="0.6s"></div>
        <div class="wow fadeInUp bg-purple" data-wow-delay="0.9s"></div>
      </div>

      <div>
        <div class="wow fadeInUp bg-yellow" data-wow-delay="0.3s"></div>
        <div class="wow fadeInUp bg-red" data-wow-delay="0.6s"></div>
        <div class="wow fadeInUp bg-blue" data-wow-delay="0.9s"></div>
      </div>

      <div>
        <div class="wow fadeInUp bg-green" data-wow-delay="0.3s"></div>
        <div class="wow fadeInUp bg-purple" data-wow-delay="0.6s"></div>
        <div class="wow fadeInUp bg-yellow" data-wow-delay="0.9s"></div>
      </div>

    </div>
  </div>
</template>

<script>
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
  .list{
    text-align: center;
    .wow{
      width: 280px;
      height: 280px;
      border-radius: 50%;
      display: inline-block;
      margin: 30px 15px;
    }
  }
}

</style>