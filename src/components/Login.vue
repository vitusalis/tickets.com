<template>
  <div class="flex center">
    <div id="login" class="card">
      <div class="flex horizontal">
        <h3 class>Login</h3>
      </div>
      <slot></slot>
      {{ message }}
      <b-form @submit="submitLogin">
        <b-form-group label="Email" label-for="email">
          <b-form-input id="email" type="email" required placeholder="Email" v-model="user.email"></b-form-input>
        </b-form-group>

        <b-form-group label="Senha" label-for="password">
          <b-form-input
            id="password"
            type="password"
            required
            placeholder="Password"
            v-model="user.password"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Login</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: ""
      },
      message: ""
    };
  },
  methods: {
    submitLogin(e) {
      e.preventDefault();

      var user_active;
      user_active = this.$store.getters.users.filter(el => {
        return this.user.email == el.email && this.user.password == el.password;
      })[0];

      if (user_active) {
        this.$store.commit("SET_USER", user_active);
        // go home
        this.$router.push("/");
        location.reload();
      } else {
        this.message = "user not found";
      }
    }
  },
  actions: {}
};
</script>

<style lang="scss" scoped>
form {
  input {
    margin: 3px auto;
  }
  button {
  }
}
#login {
  width: 20rem;
  padding: 10px;
}
</style>
