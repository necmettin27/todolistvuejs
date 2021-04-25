<template>
    <div class="row">
        <div class="col-md-6 offset-md-3">
            <h4 class="text-center mt-4">Kayıt Ol</h4>
            <form action="#" @submit.prevent="register">
                <div class="form-group mt-4">
                    <label>Ad Soyad</label>
                    <input type="text" class="form-control" v-model="name" name="name" id="name">
                </div>
                <div class="form-group mt-4">
                    <label>Email Adresi</label>
                    <input type="email" class="form-control" name="email" id="email" v-model="email">
                </div>
                <div class="form-group mt-4">
                    <label>Parola</label>
                    <input type="password" name="password" id="password" v-model="password" class="form-control">
                </div>
                <div class="form-group mt-4">
                    <button class="btn btn-danger">Kayıt Ol</button>
                </div>
            </form>
        </div>
        
        
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
    }
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password,
      })
        .then(response => {
          this.$router.push({ name: 'login' })
          console.log(response)
        })
    }
  }
}
</script>