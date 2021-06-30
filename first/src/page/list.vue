<template>
  <div>
    <div class="gnb">
      <a v-for="(item,i) in menu" :key="i">{{ item }}</a>
    </div>
    
    <div class="list" v-for="(item,i) in list" :key="i">
      <!-- :src, v-bind:src 써서 바인딩 해주면 되는데, 이미지 엑박이 뜰때가 있다.
           단순 string일 경우인데 require('url주소') 하면 정상처리 된다. -->
      <!-- <img class="img-thum" :src="require('./assets/room'+ i +'.jpg')">  -->
      <img class="img-thum" :src="item.image"> 
      <h4 @click="modalState = true">{{ item.title }}</h4>
      <p>{{ item.content }}</p>
      <p>{{ item.price }}</p>
      <!-- <button v-on:click="increase">허위매물신고</button> <span>신고수 : {{신고수}} </span> -->
      <!-- <button @click="increase(i)">허위매물신고</button> <span>신고수 : {{ 신고수[i] }}</span> -->
    </div>

    <div class="modal" v-if="modalState == true" >
      <div class="modal-bg" v-on:click="modalState = false"></div>
      <div class="modal-content">
        <h4>상세페이지</h4>
        <p>내용무</p>
        <button class="modal-close" @click="modalState = false">x</button>
      </div>
    </div>

  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue';
import Data from '../data/dataList.js';

export default {
  name: 'App',
  data(){ //데이터 보관함
    return{
      menu:['home','shop','about'],
      // list:[
      //   {title:'역삼동원룸', price:65 },
      //   {title:'천호동원룸', price:110 },
      //   {title:'구로구원룸', price:70 },
      // ],
      list: Data,
      신고수:[0,0,0],
      modalState: false,
    }
  },
  methods:{
    //함수쓰는 공간
    increase(i){
      this.신고수[i] += 1;
    },
  },
  components: {
  }
}

</script>

<style>
@import '../assets/css/reset.css';

.modal{
  position: fixed;top: 0;
  width: 100%;height: 100%;
}
.modal-bg{
  position: absolute;top:0;
  width: 100%;height: 100%;
  background: rgba(0,0,0,.3);
}
.modal-content{
  width: 50%;
  margin:5% auto 0;
  padding: 2%;
  border-radius: 5px;
  background: #fff;
  position: relative;
}
.modal-close{
  position: absolute;
  top: 20px;right: 20px;
  cursor: pointer;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.gnb{
  background: darkorchid;
  padding: 15px;
  border-radius: 5px;
}
.gnb a{
  color: #fff;
  padding:10px;
}

.list{
  width: 100%;
  margin:10px auto 30px;
  box-shadow: 0 1px 0.5em rgba(0,0,0,.3);
  padding-bottom: 20px;
}
.img-thum{
  width:100%;
}

</style>
