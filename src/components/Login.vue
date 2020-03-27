<template>
  <div class="flex center">
    <!-- IF LOGADO  -->
    <div class="page-title" v-if="this.$store.getters.isActiveUser">
      <h1>Voce já está logado</h1>
    </div>
    <!-- ELSE -->
    <div id="login" class="card" v-else>
      <div class="flex horizontal">
        <h3 class>Login</h3>
      </div>
      <!-- <p>Login: a@a.com Senha:1234</p> -->

      <slot></slot>
      {{ message }}
      <b-form @submit.prevent="submitLogin">
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

        <b-button pill type="submit" class="dark">Login</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        email: "a@a.com",
        password: "1234"
      },
      message: ""
    };
  },
  computed: {
    ...mapGetters(["users", "activeUser"])
  },
  methods: {
    ...mapActions(["fetchUsers", "fetchActiveUser", "addActiveUser"]),

    submitLogin() {
      var verifiedUser = undefined;
      verifiedUser = this.users.filter(el => {
        return this.user.email == el.email && this.user.password == el.password;
      })[0];
      console.log("verifiedUser:", verifiedUser);
      if (verifiedUser) {
        this.addActiveUser(verifiedUser);
        this.$router.push("/");
      } else {
        this.message = "user not found";
      }
    }
  },
  created() {
    this.fetchUsers();
    this.fetchActiveUser();
  }
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
