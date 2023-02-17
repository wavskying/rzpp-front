import Vue from 'vue'
import Router from 'vue-router'
import Home from "../view/Home";
import Login from "../view/Login";
import Register from "../view/Register";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
  ]
})
