<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <h4 class="text-center mt-4">Giriş Yap</h4>
            <div class="form-group mt-4">
                <label>Email Adresi</label>
                <input type="email" name="username" id="username" class="form-control" v-model="username">
            </div>
             <div class="form-group mt-4">
                <label>Parola</label>
                <input type="text" name="password" id="password" class="form-control" v-model="password">
            </div>
             <div class="form-group mt-4">
                <button @click="login()" type="submit" class="btn btn-danger">Giriş Yap</button>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    name : 'login',
    data(){
        return{
            username : '',
            password : ''
        }
    },
    methods:{
        login(){
            this.$store.dispatch('retrieveToken',{
                username: this.username,
                password: this.password
            })
            .then(response =>{
                this.$router.push({name:'todo'})
                console.log(response)
            })
        }
    }
}
</script>