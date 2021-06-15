import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import "./sass/main.scss"

// import cors from 'cors'


// import axios from 'axios';
// Vue.use(axios)

Vue.config.productionTip = false
// Vue.use(cors({
//   origin: ['http://localhost:8080'],
// }))


new Vue({
	router,
	render: h => h(App)
}).$mount("#app")
