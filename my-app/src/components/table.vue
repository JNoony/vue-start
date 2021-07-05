<template>
  <div>
      <h2>table</h2>

        <v-card>
            <!-- [타이틀 / 검색] -->
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
            <!-- END [타이틀 / 검색] -->

            <!-- <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            :single-select="singleSelect" //셀박컨트롤(스위치)::전체해제/선택
            :total-visible="5" //페이징 처리  number만큼 보이기
            //item-key="name"
            >
                <template v-slot:top>
                    <v-switch
                        v-model="singleSelect"
                        label="Single select"
                        class="pa-3"
                    ></v-switch>
                </template>
            </v-data-table> -->

            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="desserts"
                sort-by="calories"
                show-select
                :search="search"
                class="test"
                :page.sync="page"
                :items-per-page="itemsPerPage"
                hide-default-footer
            >

                <!-- [태그모양/스타일 추가] -->
                <template v-slot:item.calories="{ item }">
                    <v-chip
                        :color="getColor(item.calories)"
                        dark
                    >
                        {{ item.calories }}
                    </v-chip>
                </template>
                <!-- END [태그모양/스타일 추가] -->

                <!-- [데이터 체크박스 상태 받아오기] -->
                <template v-slot:item.glutenfree="{ item }">
                    <v-simple-checkbox
                    v-model="item.glutenfree"
                    disabled
                    ></v-simple-checkbox>
                </template>
                <!-- END [데이터 체크박스 상태 받아오기] -->

                <!-- [모달] -->
                <template v-slot:top>
                    <v-dialog
                        v-model="dialog"
                        max-width="500px"
                        >
                        <!-- 새로만들기 버튼 -->
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                            새로하나 만듭시
                            </v-btn>
                        </template>
                        <!-- END 새로만들기 버튼 -->

                        <!-- [새로만들기/수정하기] -->
                        <v-card>
                            <v-card-title>
                                <span class="text-h5">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="editedItem.name"
                                                label="Dessert name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="editedItem.calories"
                                                label="Calories"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="editedItem.fat"
                                                label="Fat (g)"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="editedItem.carbs"
                                                label="Carbs (g)"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col
                                            cols="12"
                                            sm="6"
                                            md="4"
                                        >
                                            <v-text-field
                                                v-model="editedItem.protein"
                                                label="Protein (g)"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="close"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    color="blue darken-1"
                                    text
                                    @click="save"
                                >
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                        <!-- END [새로만들기/수정하기] -->
                    </v-dialog>

                    <!-- [모달창] 삭제할거뉘? -->
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="text-h5">삭제 할고니?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog> 
                    <!-- END [모달창] 삭제할거뉘? -->   
                </template> 
                <!-- END [모달] -->        

                <!-- [컬럼 마지막 버튼 edit/del] -->
                <template v-slot:item.actions="{ item }">
                    <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                    >
                        mdi-pencil
                    </v-icon>
                    <v-icon
                        small
                        @click="deleteItem(item)"
                    >
                        mdi-delete
                    </v-icon>
                </template>
                <!-- END [컬럼 마지막 버튼 edit/del] -->

                <!-- [데이터가 없는경우] -->
                <template v-slot:no-data>
                    <v-btn
                        color="primary"
                        @click="initialize"
                    >
                        Reset
                    </v-btn>
                </template>
                <!-- END [데이터가 없는경우] -->

                <template v-slot:footer>
                    <v-pagination
                        v-model="page"
                        :length="Math.ceil(desserts.length/itemsPerPage)"
                    ></v-pagination>
                </template>

            </v-data-table>
        </v-card>

  </div>
</template>

<script>
export default {
  name: 'Table',

  components: {
  },

  data () {
      return {
        singleSelect: false,
        selected: [],
        search: '',
        dialog: false,
        dialogDelete: false,
        page: 1,
        pageCount: 0,
        itemsPerPage: 10,
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
          { text: 'Gluten-Free', value: 'glutenfree' },
          { text: 'Actions', value: 'actions', sortable: false },
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: '',
            calories: 0,
            fat: 0,
            carbs: 0,
            protein: 0,
        },
      }
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '새로만들기' : '수정하기'
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    created () {
      this.initialize()
    },
    methods: {
        initialize () {
            this.desserts = [
                {
                    name: 'Frozen Yogurt',
                    calories: 159,
                    fat: 6.0,
                    carbs: 24,
                    protein: 4.0,
                    iron: '6%',
                    glutenfree: false,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 237,
                    fat: 9.0,
                    carbs: 37,
                    protein: 4.3,
                    iron: '2%',
                    glutenfree: true,
                },
                {
                    name: 'Eclair',
                    calories: 262,
                    fat: 16.0,
                    carbs: 23,
                    protein: 6.0,
                    iron: '0%',
                    glutenfree: true,
                },
                {
                    name: 'Cupcake',
                    calories: 305,
                    fat: 3.7,
                    carbs: 67,
                    protein: 4.3,
                    iron: '7%',
                    glutenfree: false,
                },
                {
                    name: 'Gingerbread',
                    calories: 356,
                    fat: 16.0,
                    carbs: 49,
                    protein: 3.9,
                    iron: '1%',
                    glutenfree: true,
                },
                {
                    name: 'Jelly bean',
                    calories: 375,
                    fat: 0.0,
                    carbs: 94,
                    protein: 0.0,
                    iron: '1%',
                    glutenfree: true,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '5%',
                    glutenfree: true,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '0%',
                    glutenfree: false,
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '3%',
                    glutenfree: false,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '10%',
                    glutenfree: false,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '5%',
                    glutenfree: true,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '0%',
                    glutenfree: false,
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '3%',
                    glutenfree: false,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '10%',
                    glutenfree: false,
                },
                {
                    name: 'Lollipop',
                    calories: 392,
                    fat: 0.2,
                    carbs: 98,
                    protein: 0,
                    iron: '5%',
                    glutenfree: true,
                },
                {
                    name: 'Honeycomb',
                    calories: 408,
                    fat: 3.2,
                    carbs: 87,
                    protein: 6.5,
                    iron: '0%',
                    glutenfree: false,
                },
                {
                    name: 'Donut',
                    calories: 452,
                    fat: 25.0,
                    carbs: 51,
                    protein: 4.9,
                    iron: '3%',
                    glutenfree: false,
                },
                {
                    name: 'KitKat',
                    calories: 518,
                    fat: 26.0,
                    carbs: 65,
                    protein: 7,
                    iron: '10%',
                    glutenfree: false,
                },
            ]
        },
        
        editItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem (item) {
            this.editedIndex = this.desserts.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialogDelete = true
        },

        deleteItemConfirm () {
            this.desserts.splice(this.editedIndex, 1)
            this.closeDelete()
        },

        close () {
            this.dialog = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        closeDelete () {
            this.dialogDelete = false
            this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
            })
        },

        save () {
            if (this.editedIndex > -1) {
            Object.assign(this.desserts[this.editedIndex], this.editedItem)
            } else {
            this.desserts.push(this.editedItem)
            }
            this.close()
        },

        getColor (calories) {
            if (calories > 400) return 'red'
            else if (calories > 200) return 'orange'
            else return 'green'
        },
    },
};
</script>
