import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Login.vue";
import Tickets from "../views/Tickets.vue";
import Event from "../views/Event.vue";
// import UpdateEvent from "../views/UpdateEvent.vue";
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
            path: "/tickets",
            name: "Tickets",
            component: Tickets
        },
        {
            path: "/add",
            name: "create-event",
            component: EventForm
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

router.beforeEach((to, from, next) => {
    if (to.meta.authentication && !localStorage.getItem("active_user")) {
        next("/login");
    } else {
        next();
    }
});

export default router;
