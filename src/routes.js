import App from './App'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

const routes = [
    {
      path : '/', 
      name : 'home',
      component : Login
    },
    {
      path : '/todo', 
      name : 'todo',
      component : App
    },
    {
      path : '/register', 
      name : 'register',
      component : Register
    },
    {
      path : '/login', 
      name : 'login',
      component : Login
    }
  ]

  export default routes