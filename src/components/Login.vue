<template>
    <div class="flex center">
        <!-- IF LOGADO -->
        <div class="page-title" v-if="this.$store.getters.isActiveUser">
            <h1>Voce já está logado</h1>
        </div>

        <!-- ELSE NOT LOGADO -->
        <div v-else class="section">
            <!-- IF: LOGIN -->
            <div id="login" class="card" v-if="loginOverSignUp">
                <div class="flex horizontal">
                    <h3 class>Login</h3>
                </div>

                {{ message }}
                <b-form @submit.prevent="submitLogin">
                    <b-form-group label="Email" label-for="email">
                        <b-form-input
                            id="email"
                            type="email"
                            required
                            placeholder="Email"
                            v-model="user.email"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Senha" label-for="password">
                        <b-form-input
                            id="password"
                            type="password"
                            required
                            placeholder="Senha"
                            v-model="user.password"
                        ></b-form-input>
                    </b-form-group>

                    <b-button pill type="submit" class="sendButton dark"
                        >Login</b-button
                    >
                </b-form>
                <b-button
                    pill
                    class="secondary"
                    @click="loginOverSignUp = false"
                    >Fazer Cadastro</b-button
                >
            </div>
            <!-- ELSE: CADASTRO -->
            <div id="signup" class="card" v-else>
                <div class="flex horizontal">
                    <h3 class>Cadastro</h3>
                </div>

                <b-form @submit.prevent="submitSignUp">
                    <b-form-group label="Nome" label-for="email">
                        <b-form-input
                            id="signup-name"
                            type="text"
                            required
                            placeholder="Nome"
                            v-model="newUser.name"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Email" label-for="email">
                        {{ invalidMail }}
                        <b-form-input
                            id="signup-email"
                            type="email"
                            required
                            placeholder="Email"
                            v-model="newUser.email"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Senha" label-for="password">
                        <b-form-input
                            id="signup-password"
                            type="password"
                            required
                            placeholder="Digite a senha"
                            v-model="newUser.password"
                        ></b-form-input>
                        <b-form-input
                            id="signup-confirmpassword"
                            type="password"
                            required
                            placeholder="Confirme a senha"
                            @input="validatePassword"
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group label="Administrar">
                        <div v-for="(place, key) of this.places" :key="key">
                            <input
                                type="checkbox"
                                :id="'place' + key"
                                v-model="newUser.adm"
                                :value="place.id"
                            />
                            <label :for="'place' + key">{{ place.name }}</label>
                        </div>

                        <!-- <b-form-input id="newUser-adm" type='checkbox' v-model="newUser.adm"
                      >                        
                      </b-form-input> -->
                    </b-form-group>

                    <b-button pill type="submit" class="sendButton dark"
                        >Cadastrar
                    </b-button>
                </b-form>
                <b-button pill class="secondary" @click="loginOverSignUp = true"
                    >Fazer Login</b-button
                >
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            user: {
                email: "",
                password: ""
            },
            newUser: {
                name: "",
                email: "",
                password: "",
                adm: []
            },
            message: "",
            invalidMail: "",
            loginOverSignUp: true
        };
    },
    computed: {
        ...mapGetters(["users", "activeUser", "places"])
    },
    methods: {
        ...mapActions([
            "fetchUsers",
            "fetchActiveUser",
            "addUser",
            "addActiveUser"
        ]),

        validatePassword() {
            var password = document.querySelector("input#signup-password");
            var confirm_password = document.querySelector(
                "input#signup-confirmpassword"
            );
            if (password.value != confirm_password.value) {
                confirm_password.setCustomValidity("Senhas não coincidem");
            } else {
                // input is valid -- reset the error message
                confirm_password.setCustomValidity("");
            }
        },
        submitLogin() {
            var verifiedUser = undefined;
            verifiedUser = this.users.filter(el => {
                return (
                    this.user.email == el.email &&
                    this.user.password == el.password
                );
            })[0];
            if (verifiedUser) {
                this.addActiveUser(verifiedUser);
                this.$router.push("/");
            } else {
                this.message = "Usuário ou senha não estão corretos";
            }
        },
        submitSignUp() {
            if (this.users.filter(u => u.email === this.newUser.email).length)
                this.invalidMail = "email já está em uso";
            else {
                this.addUser(this.newUser);
                this.addActiveUser(this.newUser);
                this.$router.push("/");
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
#login,
#signup {
    width: 20rem;
    padding: 10px;
}

.sendButton {
    width: 100%;
    margin: 10px 0;
}
</style>
