<template>
  <ion-app>
    <ion-router-outlet v-if="$store.state.connected"></ion-router-outlet>
      <Log v-if="!$store.state.connected"> </Log>
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import Log from "../src/views/LoginPage.vue";

export default defineComponent({
  name:'app',
  components:{
    IonApp,
    IonRouterOutlet,
    Log
  }
});
</script>
