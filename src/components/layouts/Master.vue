<template>
    <div id="app">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
              
                        <router-link v-if="!loggedIn" :to="{name:'home'}" tag="a">Anasayfa</router-link>
                        <router-link v-if="!loggedIn" :to="{name:'login'}" tag="a">Giriş Yap</router-link>
                        <router-link v-if="!loggedIn" :to="{name:'register'}" tag="a">Kayıt Ol</router-link>
                        <router-link v-if="loggedIn" :to="{name:'todo'}" tag="a">Todo List</router-link>
                        <router-link v-if="loggedIn" :to="{name:'logout'}" tag="a">Çıkış Yap</router-link>
                    
          

                </div>
                </nav>
                <router-view></router-view>
        </div>
       
    </div>
</template>
<script>
export default {
computed:{
    loggedIn(){
        return this.$store.getters.loggedIn
    }
}
}
</script>
<style scoped>
a{
    color:black;
    margin-right: 10px;
}
</style>