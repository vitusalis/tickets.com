<template>
    <nav id="nav" class="flex">
        <div id="title">
            <b-button id="toggleMenu" @click="toggleMenu">
                &#x2630;
            </b-button>
            <router-link id="logo" to="/">TICKETS.COM</router-link>
        </div>
        <div id="menu" class="hidden">
            <router-link to="/">Home</router-link>
            <router-link to="/tickets">Ingressos</router-link>
            <router-link to="/about">Sobre</router-link>
            <router-link to="/login" v-if="!isActiveUser">Login</router-link>
            <span v-else class="loggedin">
                <router-link to="/user">Meu Perfil</router-link>
                <a href @click="logout">LOGOUT</a>
            </span>
            <!-- <span id="searchbox">
                <input type="text" class="hiddenOnFocus" />
                &#128269;
            </span> -->
        </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["isActiveUser"])
    },
    methods: {
        logout() {
            localStorage.removeItem("active_user");
        },
        toggleMenu() {
            var menu = document.querySelector("div#menu");
            if (menu.className == "hidden") {
                menu.className = "shown";
            } else {
                menu.className = "hidden";
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 900px) {
    .hidden {
        // transform: translateY(-200px);
        display: none;
    }
    .shown {
        // transform: translateY(200px);
        display: flex;
        flex-direction: column;
    }
    #toggleMenu {
        position: absolute;
        top: 30px;
        right: 20px;
    }
    #nav {
        flex-direction: column;
        .loggedin {
            display: flex;
            flex-direction: column;
        }
    }
}
@media screen and (min-width: 901px) {
    #toggleMenu {
        display: none;
    }
}

#nav {
    justify-content: space-between;
    padding: 30px;
    width: 100%;
    color: #fafafa;
    background-color: #333;
    #title {
        justify-content: flex-start;
    }
    #menu {
        justify-content: flex-end;
    }
    a {
        text-transform: uppercase;
        font-weight: bold;
        color: inherit;
        margin: auto 10px;
        transition: all 0.4s;
        &:hover {
            text-decoration: none;
            color: #aaaaaa;
        }
        &.router-link-exact-active {
            color: #42b983;
        }
    }
    #logo {
        font-weight: 600;
        letter-spacing: normal;
        font-size: 1.5em;
        &:hover {
            text-decoration: none;
        }
        &.router-link-exact-active {
            color: inherit;
        }
    }
}

#searchbox {
    input {
        transform: translateX(700px);
        transition: transform 2s;
        transition-delay: 1s;
    }

    &:hover {
        input {
            transition: transform 0.4s;
            transform: translateX(0px);
        }
    }
}
</style>
