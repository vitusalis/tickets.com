import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Login from "../components/Login.vue";
import Tickets from "../views/Tickets.vue";
import Event from "../views/Event.vue";

import EventForm from "../views/EventForm.vue";
import PurchaseForm from "../views/PurchaseForm.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home
        },
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/user",
            name: "User",
            component: User,
            meta: {
                authentication: true
            }
        },
        {
            path: "/tickets",
            name: "Tickets",
            component: Tickets
        },
        {
            path: "/add",
            name: "create-event",
            component: EventForm,
            meta: {
                authentication: true
            }
        },

        {
            path: "/event/:id",
            name: "event",
            component: Event,
            children: [
                {
                    path: "edit",
                    name: "update-event",
                    component: EventForm,
                    meta: {
                        authentication: true
                    }
                }
            ]
        },
        {
            path: "/buy/:id",
            name: "purchase-event",
            component: PurchaseForm,
            meta: {
                authentication: true
            }
        },
        {
            path: "/about",
            name: "About",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "about" */ "../views/About.vue")
        }
    ]
});

function userIsAuthenticated() {
    var user = JSON.parse(localStorage.getItem("active_user"));
    if (user) return true;
    return false;
}
router.beforeEach((to, from, next) => {
    if (to.meta.authentication && !userIsAuthenticated()) {
        next("/login");
    } else {
        next();
    }
});

export default router;
