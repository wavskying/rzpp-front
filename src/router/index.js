import Vue from 'vue'
import Router from 'vue-router'
import Home from "../view/Home";
import Login from "../view/Login";
import Register from "../view/Register";
import Talent from "../view/Talent";
import ELHeader from "../components/ELHeader";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Talent',
      name: 'Talent',
      component: Talent
    },
    {
      path: '/ELHeader',
      name: 'ELHeader',
      component: ELHeader
    },
  ]
})
