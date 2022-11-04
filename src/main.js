import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// 引入完整的 element ui 在项目当中使用 这里是将需要使用的 element ui 的组件都实际声明引入进来
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 申明使用 element ui 正真的在 vue 项目当中创建了 element ui 的对象
Vue.use(ElementUI)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
