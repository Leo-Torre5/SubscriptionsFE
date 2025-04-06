<template>
    <div class="app">
        <Navbar />
        <div class="subscription-list">
            <div class="container">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <h2 class="section-title">Your Active Subscriptions</h2>
                    <button @click="createSubscription" class="btn btn-primary btn-md">
                        <i class="bi bi-plus-circle-fill me-2"></i> Add New
                    </button>
                </div>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                    <div v-for="subscription in Subscriptions" :key="subscription.key" class="col">
                        <div class="card h-100 shadow-sm">
                            <div class="img-container">
                                <img :src="getSubscriptionImage(subscription.name)" class="card-img-top square-image" alt="Subscription Image">
                            </div>
                            <div class="card-body d-flex flex-column justify-content-between">
                                <div>
                                    <h5 class="card-title mb-2">{{ subscription.name }}</h5>
                                    <p class="card-text text-muted d-none d-sm-block mb-2">{{ subscription.description }}</p>
                                    <p class="card-text mb-1"><strong class="me-1">Amount:</strong> ${{ subscription.amount }}</p>
                                    <p class="card-text mb-1"><small class="text-muted me-1">Frequency:</small> {{ subscription.frequency }}</p>
                                    <p class="card-text"><small class="text-muted me-1">Joined:</small> {{ subscription.date }}</p>
                                </div>
                                <div class="mt-3">
                                    <div class="d-grid gap-2">
                                        <router-link :to="{ name: 'edit', params: { id: subscription.key } }"
                                            class="btn btn-outline-primary btn-sm">
                                            <i class="bi bi-pencil-square me-2"></i> Edit
                                        </router-link>
                                        <button @click.prevent="deleteSubscription(subscription.key)"
                                            class="btn btn-outline-danger btn-sm">
                                            <i class="bi bi-trash-fill me-2"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="Subscriptions.length === 0" class="text-center mt-5">
                    <p class="lead">You don't have any active subscriptions yet.</p>
                    <button @click="createSubscription" class="btn btn-primary btn-md">
                        <i class="bi bi-plus-circle-fill me-2"></i> Add Your First Subscription
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './Navbar.vue'
import db from '../firebaseDb'
import { collection, onSnapshot, doc, deleteDoc, query, where } from 'firebase/firestore'
const subsCollectionRef = collection(db, 'subscriptions') // Database collection reference

export default {
    name: "List-vue",
    components: {
        Navbar
    },
    data() {
        return {
            Subscriptions: [],
            user: '',
            subscriptionImages: {
                'Amazon Prime': require('../assets/amazon.png'),
                'Disney+': require('../assets/disney.png'),
                'HBO': require('../assets/hbo.png'),
                'hulu': require('../assets/hulu.png'),
                'Netflix': require('../assets/netflix.png'),
                'Default': require('../assets/default.png'),
            }
        }
    },
    async created() {
        this.user = JSON.parse(localStorage.getItem("log_user"));
        const q = query(subsCollectionRef, where("username", "==", this.user));
        const dbquery = onSnapshot(q, (snapshot) => {
            this.Subscriptions = []
            snapshot.forEach((doc) => {
                if (doc.data().name) {
                    this.Subscriptions.push({
                        key: doc.id,
                        name: doc.data().name,
                        description: doc.data().description,
                        amount: doc.data().amount,
                        frequency: doc.data().frequency,
                        date: doc.data().date,
                        username: doc.data().username,
                    })
                }
            })
        })
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("log_user"));
    },
    methods: {
        deleteSubscription(id) {
            if (window.confirm('Do you really want to delete?')) {
                deleteDoc(doc(subsCollectionRef, id)).then(() => {
                })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        },
        createSubscription() {
            this.$router.push('/create')
        },
        getSubscriptionImage(subscriptionName) {
            return this.subscriptionImages[subscriptionName] || this.subscriptionImages['Default'];
        }
    }
}
</script>

<style lang="scss" scoped>

.subscription-list {
    padding: 30px 0; 
}

.container {
    max-width: 1200px; 
}

.section-title {
    font-size: 1.75rem; 
    color: #343a40;
    margin-bottom: 0;
}

.card {
    border: none;
    border-radius: 10px; 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08); 
    transition: transform 0.2s ease-in-out;

    &:hover {
        transform: translateY(-2px); 
    }
}

.img-container {
    width: 100%;
    overflow: hidden;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.square-image {
    width: 100%;
    height: auto;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
}

.card-body {
    padding: 1rem; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-title {
    font-size: 1rem; 
    font-weight: 600;
    color: #212529;
    margin-bottom: 0.3rem;
}

.card-text {
    font-size: 0.8rem; 
    color: #495057;
    margin-bottom: 0.15rem;

    strong {
        font-weight: 500;
    }
}

.btn-outline-primary,
.btn-outline-danger,
.btn-primary {
    font-size: 0.75rem; 
    padding: 0.5rem 0.8rem; 
    border-radius: 6px; 
    transition: all 0.15s ease-in-out;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;

    &:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }
}

.btn-outline-primary {
    color: #007bff;
    border-color: #007bff;

    &:hover {
        background-color: #007bff;
        color: #fff;
        border-color: #007bff;
    }
}

.btn-outline-danger {
    color: #dc3545;
    border-color: #dc3545;

    &:hover {
        background-color: #dc3545;
        color: #fff;
        border-color: #dc3545;
    }
}

.btn-md {
    font-size: 0.9rem; 
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
}
</style>