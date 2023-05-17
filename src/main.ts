import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'virtual:windi.css'
import cloud from './util/unicloud'

const pinia = createPinia()

const userData = uni.getStorageSync('userData')
export function createApp() {
  const app = createSSRApp(App)
  app.use(pinia)

  uni.$cloud = cloud
  uni.$userData = userData
  return {
    app,
  }
}
