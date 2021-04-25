<template>
    <div></div>
</template>
<script>
export default {
    created(){
        this.$store.dispatch('clearTodes')
        this.$store.dispatch('destroyToken')
        .then(response =>{
            this.$router.push({name:'login'})
            console.log(response)
        })
       .catch(error => {
            this.$router.push({name:'login'})
            console.log(error)
          })
    }
}
</script>