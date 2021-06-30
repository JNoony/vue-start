<template>
  <div>
      <v-input
        :messages="['Messages']"
        append-icon="mdi-close"
        prepend-icon="mdi-phone"
       ></v-input>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){ //데이터 보관함
    return{
      modalState: false,
    }
  },
  methods:{
    //함수쓰는 공간
    appendIconCallback () {},
    prependIconCallback () {},
  },
  components: {
  }
}

</script>

<style>


</style>
