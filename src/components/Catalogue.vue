<template>
  <div>
    <h2>NUS Board Games' Catalogue</h2>
    <ul v-if="user">
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { auth, db, collection, onSnapshot, onAuthStateChanged } from '../firebase';

export default {
  data() {
    return {
      items: [],
      user: null,
      unsubscribe: null,
    };
  },
  methods: {
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