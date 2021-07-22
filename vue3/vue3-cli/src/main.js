import { createApp } from 'vue'
import "@/permission"
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './language/i18n'
import utils from './utils'
import MyUI from './plugins/MyUI'
import SvgIcon from './plugins/SvgIcon'

const app = createApp(App)
app.config.globalProperties.$utils = utils

app.use(MyUI,{
    components:['MyInput',"MyButton"]
})
app.use(SvgIcon,{imports:[]})

app.use(store).use(router).use(i18n).mount('#app')


