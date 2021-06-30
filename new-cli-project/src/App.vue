<template>
  <div>
    <div class="bg">
      <div class="bg-list"><img src="./assets/img1.jpg" /></div>
    </div>

    <highlight-code lang="javascript">
			let str = 'Hello, World!';
			console.log(str);
		</highlight-code>

    <highlight-code lang="javascript" inline>alert('Hello, World!');</highlight-code>

    <highlight-code lang="javascript">
      const me = {
        name: "Yasmin ZY", country: "Indonesia"
      }
    </highlight-code>

    <pre>
      <code class="language-javascript">
      const me = {
        name: "Yasmin ZY", country: "Indonesia"
      }
      </code>
    </pre>



    <!-- <vue-highlights
      v-model="text"
      :extractUrlsWithoutProtocol="true"
      caretColor="#ccc"
      placeholder="My custom placeholder..."
      usernameClass="my-username-class"
      hashtagClass="my-hash-class"
      urlClass="my-url-class"
    /> -->
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data(){ //데이터 보관함
    return{
      cnt:0,
      imgSrc:[require('./assets/img1.jpg'),
      require('./assets/img2.jpg'),
      require('./assets/img3.jpg')]
      // imgSrc:['https://pbs.twimg.com/media/D6_d7JXU0AAXtJG.jpg',
      // 'https://pbs.twimg.com/media/EOkTW9GUEAAdD6n.jpg',
      // 'https://fashionseoul.com/wp-content/uploads/2021/03/20210325_BROOKS-Running_05.jpg'],
      // text:text
    }
  },
  computed: {
    // compiledMarkdown: function () {
    //   return marked(this.input, { sanitize: true })
    // }
  },
  methods:{
    ChangeImage() {
      this.cnt++;
      if( this.cnt >= this.imgSrc.length ) this.cnt = 0;
      document.querySelector(".bg-list img").src  = this.imgSrc[this.cnt];
      setTimeout(this.ChangeImage.bind(),5000);  //1초후에 자기자신을 호출 
      // if( this.cnt < this.imgSrc.length5){
      //   document.querySelector(".bg-list img").src  = this.imgSrc[this.cnt];
      //   setTimeout(this.ChangeImage.bind(),1000);  //1초후에 자기자신을 호출 
      // }else{
      //   clearTimeout(this.obTimeOut.bind()); //Timeout 을 중지
      // }
    },
    startAnimation(){
      window.setTimeout(this.ChangeImage.bind(),100); // 윈도우 로드 후 0.1초 후
    }

    // bgTransition:function(){
    //   var list = document.querySelectorAll('.bg-list');
    //   for( var i=0,len=list.length;i<len;i++ ){
    //     list[i].style.opacity = '0';
    //   }
    //   list[0].style.opacity = 1;

    //   if( this.cnt > list.length ) return this.cnt = 0;
    //   list[this.cnt].style.opacity = 1;
    //   list[this.cnt-1].style.opacity = 0;
      
    //   console.log(list)
    //   console.log(this.cnt)
    //   // setTimeout(this.bgTransition(), 3000);
    //   setInterval(function(){ this.cnt++ }, 3000);
    // },
  },
  mounted:function(){
    this.startAnimation();
    // this.ChangeImage();
    // this.bgTransition();
  }

}
</script>

<style>
*{margin: 0;padding:0;}
.bg{
  width:50%;
  height: 100vh;
  position: relative;
  overflow: hidden;
}
.bg-list{
  /* animation-name: bgAni; */
  /* animation-iteration-count:infinite; */
  /* animation-duration: 3s; */
  /* animation-delay: 3s; */
  /* opacity: 0; */
  transition:all 0.5s;

  width: 100%;
  height: 100%;
}
.bg-list img{ 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

  min-width: 100%; 
}

.bg-list:nth-child(1){background: darkorchid; }
.bg-list:nth-child(2){background: darksalmon; }
.bg-list:nth-child(3){background: darkturquoise;}

@keyframes bgAni{
  0%{ opacity: 1;}
  99%{opacity: 1;}
  100%{ opacity: 0; }
}
</style>
