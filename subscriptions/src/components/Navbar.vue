<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div class="container">
            <router-link to="/subscriptionsList" class="navbar-brand">
                <i class="me-2 align-middle"></i> <span class="text-success">Subscriptions</span>
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item" v-if="loggedIn === 'false'">
                        <router-link to="/register" class="nav-link">
                            <i class="bi bi-person-plus-fill me-1 align-middle"></i> Register
                        </router-link>
                    </li>
                    <li class="nav-item" v-if="loggedIn === 'true'">
                        <button class="nav-link btn btn-link" @click="logout">
                            <i class="bi bi-box-arrow-right me-1 align-middle"></i> Logout
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { getAuth } from "firebase/auth";
import auth from '../firebaseDb'

export default {
    name: 'Navbar',
    data() {
        return {
            loggedIn: 'false',
        }
    },
    beforeCreate() {
        auth = getAuth();
        if (auth.currentUser) {
            this.loggedIn = 'true';
        } else {
            this.loggedIn = 'false';
        }
    },
    updated() {
        auth = getAuth();
        if (auth.currentUser) {
            this.loggedIn = 'true';
        } else {
            this.loggedIn = 'false';
        }
    },
    mounted() {
        auth = getAuth();
        if (auth.currentUser) {
            this.loggedIn = 'true';
        } else {
            this.loggedIn = 'false';
        }
    },
    methods: {
        logout() {
            auth = getAuth();
            auth.signOut().then(() => {
                this.loggedIn = 'false';
                this.$router.push('/');
            })
                .catch(error => {
                    alert(error.message);
                    this.$router.push('/');
                });
        },
        register() {
            this.$router.push('/register')
        },
    },
}
</script>

<style lang="scss" scoped>

.navbar-custom {
    background-color: #2c3e50; 
}

.navbar-brand {
    font-size: 1.5rem;
    font-weight: 600;
    color: #ffffff; 

    i {
        font-size: 1.3rem;
        color: #ffffff; 
    }
}

.navbar-toggler {
    border-color: rgba(255, 255, 255, 0.1);
}

.navbar-nav .nav-link {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    padding: 0.75rem 1rem;
    transition: color 0.15s ease-in-out;

    i {
        font-size: 1rem;
        vertical-align: middle;
    }

    &:hover {
        color: #ffffff;
    }

    &.router-link-exact-active {
        color: #27ae60; 
        font-weight: 500;
    }
}

.navbar-nav .btn-link {
    color: rgba(255, 255, 255, 0.7);
    font-size: 1rem;
    padding: 0.75rem 1rem;
    transition: color 0.15s ease-in-out;
    text-decoration: none;

    &:hover {
        color: #e74c3c; 
    }
}
</style>