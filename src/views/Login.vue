<template>
    <div class="app">
        <Navbar />
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow-sm rounded-lg">
                        <div class="card-body p-4">
                            <h2 class="card-title text-center mb-4"><i class="bi bi-person-fill me-2"></i> Login</h2>
                            <form @submit.prevent="login">
                                <div class="mb-3">
                                    <label for="email" class="form-label"><i class="bi bi-envelope-fill me-2"></i> Email Address</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter your email" v-model="email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label"><i class="bi bi-key-fill me-2"></i> Password</label>
                                    <input type="password" class="form-control" id="password" placeholder="Enter your password" v-model="password" required>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary btn-lg">
                                        <i class="bi bi-box-arrow-in-right me-2"></i> Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Navbar from '../components//Navbar.vue';
import auth from '../firebaseDb';

export default {
    name: 'Login',
    components: {
        Navbar
    },
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
        login() {
            const auth = getAuth();
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then(() => {
                    localStorage.setItem("log_user", JSON.stringify(this.email));
                    this.$router.push('/subscriptionsList');
                })
                .catch(error => {
                    alert(error.message);
                });
        },
    },
};
</script>

<style lang="scss" scoped>


.container {
    max-width: 576px;
}

.card-title {
    font-size: 2rem;
    font-weight: 500;
    color: #343a40;
}

.form-label {
    font-weight: 500;
    color: #495057;
    margin-bottom: 0.3rem;
}

.form-control {
    border: 1px solid #ced4da;
    border-radius: 0.375rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: #495057;
    background-color: #fff;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 0.25rem rgba(0, 123, 255, 0.25);
        outline: 0;
    }
}

.btn-primary {
    font-size: 1.1rem;
    padding: 0.8rem 1.5rem;
    border-radius: 0.375rem;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;

    i {
        vertical-align: middle;
    }

    &:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }
}
</style>