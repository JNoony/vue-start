<template>
  <div>
    <Navi/>
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Chart/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Navi from './components/gnb.vue'
import Chart from './components/chart.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Navi,
    Chart
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
