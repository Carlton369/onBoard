<template>
  <div>
    <h1 > onBoard </h1>
    <section v-if="!user">
      <h2> Please log in to continue </h2>
      <button @click="login">Sign in with Google</button>
    </section>
    <section v-if="user">
      <h3>Hello {{ user.displayName }}!</h3>
      <p>User ID: {{ user.uid }}</p>
      <button @click="logout">Sign Out</button>
      <h4>NUS Board Games' Catalogue</h4>
      <input type="text" id="searchField" placeholder="Search by name">
      <button onclick="searchData()">Search</button>
      <ul id="searchResults"></ul>

      <ul v-if="user">
        <li v-for="item in items" :key="item.id">
          Name: {{ item.name }} <br>
          Category: {{ item.category }} <br>
          Complexity: {{ item.complexity }}
        </li>
      </ul>
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
          category: doc.data().category,
          name: doc.data().name,
          complexity: doc.data().complexity,
        }));
      });
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
