import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL='http://127.0.0.1:8000/api'

export const store = new Vuex.Store({
  state: {
    token : localStorage.getItem('access_token') || null,
    filter: 'all',
    todos: []
  },
  getters: {
    loggedIn(state){
      return state.token !== null
    },
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0
    },
    todosFiltered(state) {
      if (state.filter == 'all') {
        return state.todos
      } else if (state.filter == 'active') {
        return state.todos.filter(todo => !todo.completed)
      } else if (state.filter == 'completed') {
        return state.todos.filter(todo => todo.completed)
      }
      return state.todos
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
      })
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id)
      state.todos.splice(index, 1, {
        'id': todo.id,
        'title': todo.title,
        'completed': todo.completed,
        'editing': todo.editing,
      })
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id)
      state.todos.splice(index, 1)
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked))
    },
    updateFilter(state, filter) {
      state.filter = filter
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed)
    },
    retrieveTodos(state,todos){
      state.todos = todos
    },
    retrieveToken(state,token){
      state.token = token
    },
    destroyToken(state){
      state.token = null
    },
    clearTodes(state){
      state.todos = []
    }
  },
  actions: {
    clearTodes(context){
      context.commit('clearTodos')
    },
    register(context, data) {
      return new Promise((resolve, reject) => {
        axios.post('/register', {
          name: data.name,
          email: data.email,
          password: data.password,
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    destroyToken(context){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      if(context.getters.loggedIn){
        return new Promise((resolve,reject) => {
          axios.post('/logout')
          .then(response => {
            
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            resolve(response)
          
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            context.commit('destroyToken')
            reject(error)
          })
        })
      } 
    },
    retrieveToken(context,credentials){
      return new Promise((resolve,reject) => {
        axios.post('/login',{
          email : credentials.username,
          password : credentials.password
        })
        .then(response => {
          const token = response.data.success.token
          localStorage.setItem('access_token',token)
          context.commit('retrieveToken',token)
          resolve(response)
        
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    retrieveTodos(context){ 
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      axios.get('/todos')
      .then(response => {
       context.commit('retrieveTodos',response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    addTodo(context,todo) {
      axios.post('/todos',{
        title : todo.title,
        completed : false
      })
      .then(response => {
       context.commit('addTodo',response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateTodo(context, todo) {
      axios.put('/todos/' + todo.id,{
        title : todo.title,
        completed : todo.completed
      })
      .then(response => {
        context.commit('updateTodo',response.data)
      })
      .catch(error => {
        console.log(error)
      })
     
    },
    deleteTodo(context, id) {
      axios.delete('/todos/' + id)
      .then(response => {
        context.commit('deleteTodo',id)
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    checkAll(context, checked) {
      axios.put('/todosCheckAll/',{
        completed:checked
      })
      .then(response => {
        context.commit('checkAll',response)
      })
      .catch(error => {
        console.log(error)
      })
    },
    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit('updateFilter', filter)
      }, 100)
    },
    clearCompleted(context) {
      setTimeout(() => {
        context.commit('clearCompleted')
      }, 100)
    }
  }
})
