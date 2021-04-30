import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
import AgendLayout from '@/views/AgendamientoCliente'
import ConfirmLayout from '@/views/agendamientoConfirm'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/Sectionclient',
      redirect: 'AgendaCliente',
      component: AgendLayout,
      children: [
        {
          path: '/Agendamientocliente',
          name: '',
          component: () => import('./views/AgendamientoCliente.vue')
        }
      ] 
    },
    {
      path: '/Sectionclientconfirm',
      redirect: 'confirmCliente',
      component: ConfirmLayout,
      children: [
        {
          path: '/ConfirmacionAgenda',
          name: '',
          component: () => import('./views/agendamientoConfirm.vue')
        }
      ] 
    },
    {
      path: '/dashboard',
      redirect: 'dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'Metricas',
          component: () => import('./views/Dashboard.vue')
        },
        {
          path: '/Pedidos',
          name: '',
          component: () => import('./views/Pedidos.vue')
        },
        {
          path: '/icons',
          name: '',
          component: () => import('./views/Icons.vue')
        },
        {
          path: '/profile',
          name: '',
          component: () => import('./views/UserProfile.vue')
        },
        {
          path: '/reporteCierre',
          name: '',
          component: () => import('./views/reporteCierre.vue')
        },
        {
          path: '/tables',
          name: '',
          component: () => import('./views/Tables.vue')
        },
        {
          path: '/Empleados',
          name: '',
          component: () => import('./views/Empleados.vue')
        },
        {
          path: '/Usuarios',
          name: '',
          component: () => import('./views/Usuarios.vue')
        },
        {
          path: '/Ventas',
          name: '',
          component: () => import('./views/Ventas.vue')
        },
        {
          path: '/Servicios',
          name: '',
          component: () => import('./views/Servicios.vue')
        },
        {
          path: '/Clientes',
          name: '',
          component: () => import('./views/Clientes.vue')
        },
        {
          path: '/Inventario',
          name: '',
          component: () => import('./views/Inventario.vue')
        },
        {
          path: '/Correo',
          name: '',
          component: () => import('./views/emailBuild.vue')
        },
        {
          path: '/Gastos',
          name: '',
          component: () => import('./views/Gastos.vue')
        },
        {
          path: '/Caja',
          name: '',
          component: () => import('./views/Caja.vue')
        },
        {
          path: '/reporteEmpleado',
          name: '',
          component: () => import('./views/reportEmploye.vue')
        },
        {
          path: '/Agendamiento',
          name: '',
          component: () => import('./views/Agendamiento.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
