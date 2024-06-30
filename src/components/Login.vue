<template>
  <div>
    <h1>onBoard</h1>
    <section v-if="!user">
      <h2>Please log in to continue</h2>
      <button @click="login">Sign in with Google</button>
    </section>
    <section v-if="user">
      <h3>Hello {{ user.displayName }}!</h3>
      <button @click="logout">Sign Out</button> <br>

      <button>Event Listings</button>
      <button>Contact Us!</button>
      <h4>NUS Board Games' Catalogue</h4>

      <input type="text" v-model="searchQuery" placeholder="Search">

      <div v-if="searchQuery === ''">
        <div v-for="(games, genre) in organizedItems" :key="genre">
          <h4 class="genre-header">{{ genre }}</h4>
          <ul>
            <li v-for="game in games" :key="game.id">
              <h5 class="game-name">{{ game.Name }}</h5>
              <ul class="game-details">
                <li>Players: {{ game.Players }}</li>
                <li>Mechanics: {{ game.Mechanics }}</li>
                <li>Complexity: {{ game.Complexity }}</li>
                <li>Duration: {{ game.Duration }}</li>
                <button @click="sendRentRequest(game.Name)">Rent this game!</button>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div v-else>
        <div v-for="game in filteredItems" :key="game.id">
          <h5 class="game-name">{{ game.Name }}</h5>
          <ul class="game-details">
            <li>Players: {{ game.Players }}</li>
            <li>Mechanics: {{ game.Mechanics }}</li>
            <li>Complexity: {{ game.Complexity }}</li>
            <li>Duration: {{ game.Duration }}</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>


<script>
import { auth, db, collection, getDocs, query, orderBy, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';
import emailjs from 'emailjs-com';

export default {
  data() {
    return {
      user: null,
      items: [],
      searchQuery: ""
    };
  },
  methods: {
    async login() {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    },
    async logout() {
      await signOut(auth);
    },
    async fetchCatalogue() {
      const catalogueRef = collection(db, 'catalogue');
      const q = query(catalogueRef, orderBy('Genre'));
      const querySnapshot = await getDocs(q);
      this.items = querySnapshot.docs.map(doc => ({
        id: doc.id, // Ensure each item has a unique id
        Genre: doc.data().Genre || 'Unknown Genre',
        Name: doc.data().Name || 'Unknown Name',
        Complexity: doc.data().Complexity || 'Unknown Complexity',
        Mechanics: doc.data().Mechanics || 'Unknown Mechanics',
        Duration: doc.data().Duration || 'Unknown Duration',
        Players: doc.data().Players || 'Unknown Players'
      }));
    },
    async sendRentRequest(gameName) {
      const serviceID = 'service_18nnn8k'; // Replace with your EmailJS service ID
      const templateID = 'template_5l5hyxi'; // Replace with your EmailJS template ID
      const publicKey = 'aDsCutNu06-pYc4tV'; 

      const templateParams = {
        from_name: this.user.displayName,
        game_name: gameName,
      };

      try {
        const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
        console.log('Email sent successfully:', response.status, response.text);
        alert('Rental request sent successfully!');
      } catch (error) {
        console.error('Failed to send email:', error);
        alert('Failed to send rental request.');
      }
    }
  },
  computed: {
    filteredItems() {
      const query = this.searchQuery.trim();
      return this.items.filter(item => item.Name.includes(query));
    },
    organizedItems() {
      const itemsByGenre = {};
      this.items.forEach(item => {
        if (!itemsByGenre[item.Genre]) {
          itemsByGenre[item.Genre] = [];
        }
        itemsByGenre[item.Genre].push(item);
      });
      return itemsByGenre;
    }
  },
  created() {
    onAuthStateChanged(auth, async (user) => {
      this.user = user;
      if (user) {
        await this.fetchCatalogue();
      }
    });
  }
};
</script>


<style scoped>
.genre-header {
  font-weight: bold;
  font-size: 1.5em;
}

.game-name {
  text-decoration: underline;
  font-size: 1.25em; /* Adjust the font size as needed */
}

.game-details {
  margin-left: 20px; /* Optional: to indent the details */
  font-size: 1em; /* Adjust the font size as needed */
}
</style>