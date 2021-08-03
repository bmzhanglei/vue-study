import { createApp } from 'vue'
import App from './App.vue'
import '@/css/index.scss'
import store,{key} from './store'
import element3 from '@/plugins/element3.ts'
import MyUI from '@/plugins/MyUi'
import util from './utils/util'
import i18n from '@/language/i18n'
import router from './router/index';

const app = createApp(App)

app.config.globalProperties.$utils = util

app.use(MyUI,{
    components:['MyInput',"MyButton"]
})
app.use(router)
app.use(store,key)
app.use(i18n)
app.use(element3)
app.mount('#app')
