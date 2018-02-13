import Vue from 'vue'
import App from './pages/App.vue'
import util from './util'
import './assets/css/reset.css'

new Vue({
    mounted() {
        util.setName()
    },
    render(h) {
        return h(App)
    }
}).$mount('#app')