<template>
  <div id="app">
    <Login />
    <!--<Catalogue v-if="user"/>-->
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Catalogue from './components/Catalogue.vue';

export default {
  components: {
    Login,
    //Catalogue
  }
};
</script>