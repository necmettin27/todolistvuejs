<template>
    <div id="app">
        <div class="container">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
              
                        <router-link :to="{name:'home'}" tag="a">Anasayfa</router-link>
                        <router-link :to="{name:'login'}" tag="a">Giriş Yap</router-link>
                        <router-link :to="{name:'register'}" tag="a">Kayıt Ol</router-link>
                    
          

                </div>
                </nav>
                <router-view></router-view>
        </div>
       
    </div>
</template>
<script>
export default {
   
}
</script>
<style scoped>
a{
    color:black;
    margin-right: 10px;
}
</style>