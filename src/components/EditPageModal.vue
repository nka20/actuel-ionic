<template>
    <ion-page>
      <ion-header>
      <ion-toolbar>
        <ion-title >
          modal
        </ion-title>
        <ion-buttons slot="start">
          <ion-button color="danger" @click="cancel">Cancel</ion-button>
        </ion-buttons>
  
      </ion-toolbar>
    </ion-header>
    
    <ion-content>
      <div class="container">
        <h1>modification</h1>
        <ion-item>
          <ion-label>Nom</ion-label>
          <ion-input aria-label="varchar" v-model="object.nom" required type="text">nom editer</ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Prix unitaire</ion-label>
          <ion-input aria-label="number" v-model="object.prix" required type="number">prix a editer</ion-input>
        </ion-item>
        <ion-button expand="full"  >Modifier</ion-button>
    </div>
</ion-content>
</ion-page>
</template>
<script >
//import axios from 'axios';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
IonInput,
  IonLabel,
  IonButton,
  modalController,


} from '@ionic/vue';
import { defineComponent } from 'vue';
export default  defineComponent({
  name:'EditPageVue',
  props:["select"],
  components:{
    IonContent,
    IonHeader,
    IonPage,
    IonInput,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButton,

  },
  data(){
    return{
      object:this.select
    };
  },
  methods: {
      cancel() {
        return modalController.dismiss(null, 'cancel');
      },
    },
})
</script>

<style scoped>

</style>