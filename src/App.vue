<template>
  <ion-app>
    <ion-router-outlet v-if="$store.state.tokens!=null"></ion-router-outlet>
    <Log v-else> </Log>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import Log from "./components/LoginPage.vue";

export default defineComponent({
  name:'app',
  components:{
    IonApp,
    IonRouterOutlet,
    Log
  },
  mounted(){
    this.$store.state.tokens = JSON.parse(localStorage.getItem("tokens"))
    this.$store.state.produit = JSON.parse(localStorage.getItem("produit"))
    this.$store.state.vente = JSON.parse(localStorage.getItem("vente"))
  }
});
</script>
