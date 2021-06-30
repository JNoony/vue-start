<template>
  <div class="nav">
    <ul class="gnb">
        <li class="gnb-list" 
            v-for="(item,i) in gnbList" :key="i"
            @click="activeHandle">
            <div class="mm">{{item.maingnb}}</div>
            <ul class="sub">
                <li class="sub-list" 
                    v-for="(item,i) in item.subMenu" :key="i"
                    @click="activeHandle">
                  <a :href="item.link">{{item.sub}}</a>
                </li>
            </ul>
        </li>
    </ul>



    <!-- <v-navigation-drawer
      id="app-drawer"
      v-model="drawer"
      app
      dark
      floating
      persistent
      mobile-break-point="960"
      width="280"
    >
      <div>
        <v-layout
          class="fill-height"
          tag="v-list"
          column
        >
          <v-list>
            <v-list-item @click="movePage('');">
              <v-toolbar-title><v-icon class="mr-2">home</v-icon>JoBlog</v-toolbar-title>
            </v-list-item>
            <hr class="mt-2 mb-2">
            <v-list-item-group active-class="white--text">
              <template v-for="menu in menus">
                <template v-if="menu.childrens">
                  <v-list-group
                    :prepend-icon="menu.icon" 
                    :key="menu.id" 
                  >
                    <template v-slot:activator>
                      <v-list-item-title>{{menu.title}}</v-list-item-title>
                    </template>
                    <template v-for="children in menu.childrens">
                      <v-list-item 
                        @click="movePage(children.target);" 
                        :key="children.id" 
                        class="ml-2" 
                        :active-class="`${colors.menu_selected_color} accent-4 white--text`"
                      >
                        <v-list-item-icon :active-class="`${colors.menu_selected_color} accent-4`">
                          <v-icon>{{children.icon}}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>
                          {{children.title}}
                        </v-list-item-title>
                      </v-list-item>
                    </template>
                  </v-list-group>
                </template>
                <template v-else> 
                  <v-list-item 
                    @click="movePage(menu.target);" 
                    :key="menu.id" 
                    :active-class="`${colors.menu_selected_color} accent-4 white--text`"
                  >
                    <v-list-item-icon>
                      <v-icon>{{menu.icon}}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{menu.title}}</v-list-item-title>
                  </v-list-item>
                </template>
              </template>
            </v-list-item-group>
          </v-list>
        </v-layout>
      </div>
    </v-navigation-drawer> -->

  </div>
</template>

<script>
export default {
    name: 'Navi',
    props: {
    },
    data(){
      return{
          active:false,
          gnbList:[
            { maingnb:'main gnb1',
              subMenu:[
                {sub:'sub1',link:'/'},
                {sub:'sub2',link:'/'},
                {sub:'sub3',link:'/'},
                {sub:'sub4',link:'/'},
              ]
            },
            { maingnb:'main gnb2',
              subMenu:[
                {sub:'sub1',link:'/'},
                {sub:'sub2',link:'/'},
                {sub:'sub3',link:'/'},
              ]
            },
            { maingnb:'main gnb3',
              subMenu:[
                {sub:'sub1',link:'/'},
                {sub:'sub2',link:'/'},
                {sub:'sub3',link:'/'},
                {sub:'sub4',link:'/'},
                {sub:'sub5',link:'/'},
                {sub:'sub6',link:'/'},
              ]
            },
          ]
      }
    },
    computed:{
    },
    methods:{
        removeClass(ele){
            let num = ele.length;
            for( let i=0,len=num; i<len;i++ ){
                ele[i].classList.remove('on'); 
            } 
        },
        activeHandle(e){
            let target = e.target; // li>div(네이밍)
            if( target.className === 'mm' ){
                this.removeClass( e.currentTarget.parentNode.childNodes )
                target.parentNode.classList.add('on');
            }else if( target.className === 'sub-list'){
                target = e.target;
                this.removeClass( target.parentNode.childNodes );
                target.classList.add('on');
            }
            else return false;
        },
    },
    mounted(){        
        // this.onResponsiveInverted()
        // window.addEventListener('resize', this.onResponsiveInverted)
    },
}
</script>

<style scoped>
*{margin: 0;padding: 0;}
li{list-style: none;}

.nav{
    padding: 50px 0;
    width: 100px;
}
.gnb-list{
    text-align: center;
    position: relative;
    cursor: pointer;
}
.mm{
    border-bottom: 1px solid rebeccapurple;    
    line-height: 2;
}
.sub{
    position: fixed;
    top: 50px;
    left: 100px;
    background:#fefefe;
    padding: 10px 20px;
    width: 100px;
    height: 200px;
    box-shadow: 0 0 0.3em rgba(0,0,0,0.5);
    line-height: 1.7;
    display: none;
}
.sub li{
    position: relative;
    cursor: pointer;
    color: #222;
    font-weight: 400;
}
.sub li:after{
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    background: #999;
}
.nav li:hover{
    background: rgb(51, 80, 99);
    color: #fff;
}
.nav li:hover .mm{color: #fff;}
.nav li:hover .sub{display: block;}

.gnb-list.on,
.sub-list.on{
    color: rgb(8, 74, 116);
    font-weight: bold;
}


</style>
