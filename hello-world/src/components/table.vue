<template>
  <div class="table">
        <h2>table</h2>
        <v-card>
            <v-card-title>
                Nutrition
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-card-title>
            <v-data-table
                :search="search"
                :items-per-page="5"
            >
            <!-- :sort-by="['calories', 'fat']"
                :sort-desc="[false, true]"
                :loading="isLoading" -->

                <!-- 
                :single-select="singleSelect"
                item-key="name"
                show-select    
                <template v-slot:top>
                    <v-switch
                        v-model="singleSelect"
                        label="Single select"
                        class="pa-3"
                    ></v-switch>
                </template> -->

                <!-- <template v-slot:body> -->
                    <table>
                        <thead>
                            <tr>
                                <th v-for="(item,idx) in listHead" :key="idx">
                                    {{item.text}}
                                </th> 
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item,idx) in listbody" :key="idx">
                                <td v-for="(item,idx) in item" :key="idx">
                                    {{item}}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                <!-- </template> -->

                <template v-slot:pagination>
                    <v-pagination
                    v-model="page"
                    :length="6"
                    ></v-pagination>
                </template>

                <!-- <template
                    v-if="isEnabled('no-data')"
                    v-slot:no-data
                >
                    NO DATA HERE!
                </template>

                <template
                    v-if="isEnabled('progress')"
                    v-slot:progress
                >
                    <v-progress-linear
                    color="purple"
                    :height="10"
                    indeterminate
                    ></v-progress-linear>
                </template> -->
            </v-data-table>
            <!-- <table>
                <thead>
                        <tr>
                            <th v-for="(item,idx) in listHead" :key="idx">
                                {{item.text}}
                            </th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item,idx) in listbody" :key="idx">
                            <td v-for="(item,idx) in item" :key="idx">
                                {{item}}
                            </td>
                        </tr>
                    </tbody>
            </table> -->
        </v-card>
  </div>
</template>

<script>
const handler ={
    get(target, property){
        console.log('intercepted!')
        return target[property]
    }
} 

export default {
    name: 'Table',
    props: {
        data:Array,
        default:function(){
        }
    },
    data(){
      return{
        //   singleSelect: false,
        //   selected: [],
        search: '',
        page: 1,
        list:this.data,
        listHead:[],
        listbody:[]
      }
    },
    // state: {
    //     list:this.data
    // },
    computed:{
    },
    methods:{
        
    },
    mounted(){   
        let proxy = new Proxy(this.list,handler);
        this.listHead = proxy.headers;
        this.listbody = proxy.desserts;
        console.group('=========================')
        console.log('porxy : ',this.listHead)  
        console.log('porxy : ',this.listbody)  
        console.log('list : ',this.list)  
        console.log(proxy)  

        console.groupEnd()
    },
}
</script>

<style scoped>
.table{
    height: 70vh;
    background: #efefef;
    text-align: left;
}
</style>
