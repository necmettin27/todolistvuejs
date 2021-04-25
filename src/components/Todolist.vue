<template>
    <div class="row">
       
        <div class="col-md-6 offset-md-3 mt-3">
             <h4>{{textform.title}}</h4>
             <div class="form-group">
                <input type="text" class="form-control"  v-model="newTodo" @keyup.enter="addTodo">
             </div>
    
           
         
            <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
            </todo-item>
        </transition-group>
        
         
             <hr/>
             <div class="row">
                  <todo-check-all></todo-check-all>
                
                 <div class="col-md-12">
                      <todo-filtered></todo-filtered>
                 </div>
                 
                 <hr/>
                 <div class="col-md-12">
                    <p style="font-size:12px;color:red;margin-top:20px;">{{textform.description}}</p>
                 </div>
                
                
             </div>
        </div>
    </div>
</template>
<script>
 import eventBus from '../main'
 import TodoItem from './TodoItem'
 import TodoCheckAll from './TodoCheckAll'
 import TodoFiltered from './TodoFiltered'

export default {
    name : "todo-list",
    components:{
     TodoItem,
     TodoCheckAll,
     TodoFiltered, 
    },
    data : function(){
        return{
            idForTodo : 3,
            beforeEditCache:'',
            filter:'all',
            newTodo :'',
            textform:{
                title : "Yapılacak İş Listesi",
                input : "Yapılacak işi ekleyiniz.",
                description : "İşi düzenlemek için, ilgili işin üzerine çift tıklayınız.",
                removeall : 'Seçilenleri Sil',
                checkall : "Tümünü yapıldığı olarak işaretle"
            }
        }
    },
    created(){ 
        eventBus.$on('removedTodo', (id)=>this.removeTodo(id))
        eventBus.$on('finishedEdit', (data)=>this.finishedEdit(data))
        this.$store.dispatch('retrieveTodos')
    },
    computed: {
        remaining() {
            return this.$store.getters.remaining
        },
        anyRemaining() {
            return this.$store.getters.anyRemaining
        },
        todosFiltered() {
            return this.$store.getters.todosFiltered
        },
        showClearCompletedButton() {
            return this.$store.getters.showClearCompletedButton
        }
    },
    methods:{
        addTodo() {
            if (this.newTodo.trim().length == 0) {
                return
            }
            this.$store.dispatch('addTodo', {
                id: this.idForTodo,
                title: this.newTodo,
            })
            this.newTodo = ''
            this.idForTodo++
        },
        deleteTodo(id) {
            const index = this.$store.state.todos.findIndex((item) => item.id == id)
            this.$store.state.todos.splice(index, 1)
        },
        checkAllTodos() {
            this.$store.state.todos.forEach((todo) => todo.completed = event.target.checked)
        },
        clearCompleted() {
            this.$store.state.todos = this.$store.state.todos.filter(todo => !todo.completed)
        },
        finishedEdit(data) {
            const index = this.$store.state.todos.findIndex((item) => item.id == data.id)
            this.$store.state.todos.splice(index, 1, data)
        },
        changefilter(data){
            this.$store.state.filter = data
            this.filter = data
        }
    }
}
</script>
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
.list-group-item{
    animation-duration: 0.3s;

}
 input{
    border-radius: 0px;
}
.check{
    position: absolute;
    left:2px;
    top: 17px;
}
.remove{
   cursor: pointer;
   position: absolute;
   top: 10px;
   right: 10px;
}
.completed{
    text-decoration: line-through;
    color:gray;
}


.fade-enter-active, .fade-leave-active{
    transition: opacity .2s;
}
.fade-enter, fade-leave-to{
    opacity: 0;
}
</style>