<template>
    <div class="app">
        <Navbar />
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow-sm rounded-lg">
                        <div class="card-body p-4">
                            <h3 class="card-title text-center mb-4">{{ isUpdate ? 'Edit Subscription' : 'Add New Subscription' }}</h3>
                            <form @submit.prevent="onFormSubmit">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Subscription Name</label>
                                    <input type="text" class="form-control" id="name" v-model="subscription.name" required>
                                </div>

                                <div class="mb-3">
                                    <label for="description" class="form-label">Description</label>
                                    <input type="text" class="form-control" id="description" v-model="subscription.description" required>
                                </div>

                                <div class="mb-3">
                                    <label for="amount" class="form-label">Amount</label>
                                    <div class="input-group">
                                        <span class="input-group-text">$</span>
                                        <input type="number" step="0.01" class="form-control" id="amount" v-model="subscription.amount" required>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label for="frequency" class="form-label">Payment Frequency</label>
                                    <select id="frequency" class="form-select" v-model="subscription.frequency" required>
                                        <option value="" disabled>Select Frequency</option>
                                        <option value="weekly">Weekly</option>
                                        <option value="bimonthly">Bi-monthly</option>
                                        <option value="monthly">Monthly</option>
                                        <option value="quarterly">Quarterly</option>
                                        <option value="biannually">Bi-annually</option>
                                        <option value="annually">Annually</option>
                                    </select>
                                </div>

                                <div class="mb-3">
                                    <label for="date" class="form-label">Date Joined</label>
                                    <input type="date" class="form-control" id="date" v-model="subscription.date" required>
                                </div>

                                <div class="d-grid gap-2">
                                    <button v-if="!isUpdate" type="button" class="btn btn-success btn-lg" @click="addSubscription">
                                        <i class="bi bi-save-fill me-2"></i> Save Subscription
                                    </button>
                                    <button v-if="isUpdate" type="button" class="btn btn-primary btn-lg" @click="updateSubscription">
                                        <i class="bi bi-pencil-fill me-2"></i> Update Subscription
                                    </button>
                                    <button type="button" class="btn btn-secondary btn-block" @click="cancelOperation">
                                        <i class="bi bi-x-circle-fill me-2"></i> Cancel
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
import db from '../firebaseDb'
import Navbar from '../components//Navbar.vue'
import { collection, addDoc, updateDoc, doc, getDoc } from 'firebase/firestore'
const subsCollectionRef = collection(db, 'subscriptions') // Database collection reference

export default {
    name: 'CreateUpdate',
    components: {
        Navbar
    },
    data() {
        return {
            subscription: {
                name: '',
                description: '',
                amount: '',
                frequency: '',
                date: '',
                username: ''
            },
            isUpdate: false,
            user: ''
        }
    },
    created() {
        this.user = JSON.parse(localStorage.getItem("log_user"));
        if (this.$route.params.id) {
            this.isUpdate = true;
            this.getRecord(this.$route.params.id);
        } else {
            this.isUpdate = false;
        }
    },
    methods: {
        async getRecord(id) {
            try {
                const docRef = doc(subsCollectionRef, id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    this.subscription = { ...docSnap.data(), id: docSnap.id };
                } else {
                    console.log("No such document!");
                    this.$router.push('/subscriptionsList'); // Redirect if record not found
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                this.$router.push('/subscriptionsList'); // Redirect on error
            }
        },
        addSubscription() {
            if (this.subscription.name && this.subscription.description && this.subscription.amount && this.subscription.frequency && this.subscription.date) {
                this.subscription.username = this.user; // save with username
                addDoc(subsCollectionRef, this.subscription)
                    .then(() => {
                        this.$router.push('/subscriptionsList');
                    })
                    .catch((error) => {
                        console.error("Error adding document:", error);
                        alert('Error adding subscription.');
                    });
            } else {
                alert('Please fill out all required fields.');
            }
        },
        cancelOperation() {
            this.$router.push('/subscriptionsList');
        },
        onFormSubmit(event) {
            event.preventDefault(); // Prevent default form submission (though we handle it with JS)
        },
        updateSubscription() {
            if (this.subscription.name && this.subscription.description && this.subscription.amount && this.subscription.frequency && this.subscription.date && this.subscription.id) {
                updateDoc(doc(subsCollectionRef, this.subscription.id), {
                    name: this.subscription.name,
                    description: this.subscription.description,
                    amount: this.subscription.amount,
                    frequency: this.subscription.frequency,
                    date: this.subscription.date,
                    username: this.user
                })
                    .then(() => {
                        this.$router.push('/subscriptionsList');
                    })
                    .catch((error) => {
                        console.error("Error updating document:", error);
                        alert('Error updating subscription.');
                    });
            } else {
                alert('Please ensure all fields are filled and a subscription ID exists for updating.');
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.container {
    max-width: 768px;
}

.card-title {
    font-size: 1.75rem;
    font-weight: 500;
    color: #343a40;
}

.form-label {
    font-weight: 500;
    color: #495057;
    margin-bottom: 0.3rem;
}

.form-control,
.form-select {
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

.input-group-text {
    background-color: #e9ecef;
    color: #495057;
    border: 1px solid #ced4da;
    border-radius: 0.375rem 0 0 0.375rem;
    padding: 0.75rem 1rem;
    font-size: 1rem;
}

.btn-primary,
.btn-success,
.btn-secondary {
    font-size: 1rem;
    padding: 0.8rem 1.5rem;
    border-radius: 0.375rem;
    transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;

    i {
        vertical-align: middle;
    }
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;

    &:hover {
        background-color: #0056b3;
        border-color: #0056b3;
    }
}

.btn-success {
    background-color: #28a745;
    border-color: #28a745;

    &:hover {
        background-color: #1e7e34;
        border-color: #1e7e34;
    }
}

.btn-secondary {
    background-color: #6c757d;
    border-color: #6c757d;

    &:hover {
        background-color: #5a6268;
        border-color: #5a6268;
    }
}
</style>