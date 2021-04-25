import App from './App'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Logout from './components/auth/Logout'

const routes = [
    {
      path : '/', 
      name : 'home',
      component : Login
    },
    {
      path : '/todo', 
      name : 'todo',
      component : App,
      meta:{
        requiresAuth:true
      }
    },
    {
      path : '/register', 
      name : 'register',
      component : Register,
      meta:{
        requiresVisitor:true
      }
    },
    {
      path : '/login', 
      name : 'login',
      component : Login,
      meta:{
        requiresVisitor:true
      }
    },
    {
      path : '/logout', 
      name : 'logout',
      component : Logout
    }
  ]

  export default routes