// src/plugins/vuetify.js

import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader
import Vue from 'vue'
import Vuetify from 'vuetify'


// svg사용자 지정
import myIconSvg from 'myIcon.svg'

//아이콘 라이브러리 사용하는경우
const MY_ICONS = {
    complete: '...',
    cancel: '...',
    close: '...',
    delete: '...', // delete (e.g. v-chip close)
    clear: '...',
    success: '...',
    info: '...',
    warning: '...',
    error: '...',
    prev: '...',
    next: '...',
    checkboxOn: '...',
    checkboxOff: '...',
    checkboxIndeterminate: '...',
    delimiter: '...', // for carousel
    sort: '...',
    expand: '...',
    menu: '...',
    subgroup: '...',
    dropdown: '...',
    radioOn: '...',
    radioOff: '...',
    edit: '...',
    ratingEmpty: '...',
    ratingFull: '...',
    ratingHalf: '...',
    loading: '...',
    first: '...',
    last: '...',
    unfold: '...',
    file: '...',
}

Vue.use(Vuetify)

export default new Vuetify({
  theme: { dark: true },
  icons: {
    iconfont: 'mdi', // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    values: {
        cancel: 'fas fa-ban',
        menu: 'fas fa-ellipsis-v',
        //--사용자 지정 svg
        customIconSvg: myIconSvg,
        customIconSvgPath: 'M14.989,9.491L6.071,0.537C5.78,0.246,5.308,0.244,5.017,0.535c-0.294,0.29-0.294,0.763-0.003,1.054l8.394,8.428L5.014,18.41c-0.291,0.291-0.291,0.763,0,1.054c0.146,0.146,0.335,0.218,0.527,0.218c0.19,0,0.382-0.073,0.527-0.218l8.918-8.919C15.277,10.254,15.277,9.784,14.989,9.491z',
        //--END 사용자 지정 svg
        MY_ICONS,
        //--재사용 가능한 아이콘
        product: 'mdi-dropbox',
        support: 'mdi-lifebuoy',
        steam: 'mdi-steam-box',
        pc: 'mdi-desktop-classic',
        xbox: 'mdi-xbox',
        playstation: 'mdi-playstation',
        switch: 'mdi-nintendo-switch',
        //--END 재사용 가능한 아이콘
    },
  },
})