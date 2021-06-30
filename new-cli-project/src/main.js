import { createApp } from 'vue'
import VueHighlightJS from 'highlight.js';
// import VueHighlights, { autoLink, autoHighlight } from 'vue-highlights'
import App from './App.vue'


// Highlight.js languages (Only required languages)
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
// import vue from 'vue-highlight.js/lib/languages/vue';

import 'highlight.js/styles/default.css';
const app = createApp(App);

app.use(VueHighlightJS,{
    languages: {
		css,
		javascript,
		// vue
	}
});
// app.component(VueHighlights.name, VueHighlights)

app.mount('#app')
