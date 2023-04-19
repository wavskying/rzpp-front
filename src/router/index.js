import Vue from 'vue'
import Router from 'vue-router'
import Home from "../view/Home";
import Login from "../view/Login";
import Register from "../view/Register";
import Talent from "../view/Talent";
import ELHeader from "../components/ELHeader";
import Communicate from "../components/Communicate";
import Order from "../view/Order";
import Success from "../view/Success";
import MyOrder from "../view/MyOrder";
import TalentPool from "../view/TalentPool";

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
    {
      path: '/Communicate',
      name: 'Communicate',
      component: Communicate
    },
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
    {
      path: '/Success',
      name: 'Success',
      component: Success
    },
    {
      path: '/MyOrder',
      name: 'MyOrder',
      component: MyOrder
    },
    {
      path: '/TalentPool',
      name: 'TalentPool',
      component: TalentPool
    },
  ]
})
