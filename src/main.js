import { createApp } from 'vue'
import App from './App.vue'
import qs from 'qs'
import axios from 'axios'

const app = createApp(App)
app.config.productionTip = false
app.prototype.$axios = axios //全局注册，使用方法为:this.$axios
app.prototype.qs = qs //全局注册，使用方法为:this.qs
app.use(ElementUI)

app.mount('#app')
