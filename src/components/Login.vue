<template>
  <div>
    <h1 > onBoard </h1>
    <section v-if="!user">
      <h2> Please log in to continue </h2>
      <button @click="login">Sign in with Google</button>
    </section>
    <section v-if="user">
      <h3>Hello {{ user.displayName }}!</h3>
      <button @click="logout">Sign Out</button> <br>

      <button> Event Listings </button>
      <button> Contact Us! </button>
      <h4>NUS Board Games' Catalogue</h4>

      
      <input type="text" v-model="searchQuery" placeholder="Search">
      
      
      <div v-if = "searchQuery === ''">
        <div v-for="item in items"  :key="item.id">
          <li class="collection-header"><h4>{{item.Name}}</h4></li>
          <li class="collection-item">Genre: {{item.Genre}}</li>
          <li class="collection-item">Players: {{item.Players}}</li>
          <li class="collection-item">Mechanics: {{item.Mechanics}}</li>
          <li class="collection-item">Complexity: {{item.Complexity}}</li>
          <li class="collection-item">Duration: {{item.Duration}}</li>
        </div>
      </div>

      <div v-else>
        <div> {{ searchQuery }} </div>
        <div> {{ filteredItems }} </div>
        <div  v-for="f_item in filteredItems" :key="f_item.id">   </div>
          <li class="collection-header"><h4>{{f_item.Name}}</h4></li>
          <li class="collection-item">Genre: {{f_item.Genre}}</li>
          <li class="collection-item">Players: {{f_item.Players}}</li>
          <li class="collection-item">Mechanics: {{f_item.Mechanics}}</li>
          <li class="collection-item">Complexity: {{f_item.Complexity}}</li>
          <li class="collection-item">Duration: {{f_item.Duration}}</li>
      </div>

    </section>
  </div>
</template>

<script>
import { auth, db, collection, onSnapshot, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';

export default {
  data() {
    return {
      user: null,
      items: [],
      unsubscribe: null,
      searchQuery: ""
    };
  }, 
  methods: {
    login() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider);
    },
    logout() {
      signOut(auth);
    },
    subscribeToCatalogue() {
      const catalogueRef = collection(db, 'catalogue');
      this.unsubscribe = onSnapshot(catalogueRef, (querySnapshot) => {
        this.items = querySnapshot.docs.map(doc => ({
          Genre: doc.data().Genre,
          Name: doc.data().Name,
          Complexity: doc.data().Complexity,
          Mechanics: doc.data().Mechanics,
          Duration: doc.data().Duration,
          Players: doc.data().Players
        }));
      });
    }
  },
  computed: {
    filteredItems() {
      const query = this.searchQuery.trim();
      return this.items.filter(item => item.Name.includes(query));
     }
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
      if (user) {
        this.subscribeToCatalogue();
      } else if (this.unsubscribe) {
        this.unsubscribe(); // Unsubscribe when the user signs out
      }
    });
  }
};
</script>