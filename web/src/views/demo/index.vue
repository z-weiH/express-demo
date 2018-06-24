<template>
  <div>
    <p :key="index" v-for="(item , index) in list">
      {{item}}-{{index}}
      {{ 
        index === (list.length - 1) ? '-最后一个' : ''
      }}
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list : []
      }
    },
    mounted() {
      let arr = [];
      for(let i = 0 ; i <= 55 ; i ++){
        arr.push('dfdjkfdjfkdjl');
      }
      this.list = arr;
    },
  }
</script>

<style scoped>

</style>