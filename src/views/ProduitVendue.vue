<template>
  <ion-page>
    <ion-header>
    <ion-toolbar>
      <ion-title>
        Produit
      </ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content>
    <div class="container">
      <h1>Enregistrement de produit</h1>
      <ion-item>
        <ion-label>Nom</ion-label>
        <ion-input type="text"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Quantité</ion-label>
        <ion-input type="number"></ion-input>
      </ion-item>
      <ion-button expand="full"  @click="Login">Enregistrer</ion-button>
    </div>
    <div class="lists-container">
      <!-- Liste des produits -->
      <div class="list-container">
        <div class="list-title">Liste des produits</div>
        <div class="list">
          <div class="list-item" v-for="product in ibije" :key="product">
            <p>Id: {{product.id}}</p>
            <p>Nom du produit: {{product.nom}}</p>
            <p>Prix unitaire: {{product.prix_unitaire}}</p>
            <p>Utilisateur: {{product.utilisateur}}</p>
            <div class="vertical-line"></div>
          </div>

        </div>
      </div>
      </div>
  </ion-content>
</ion-page>
</template>

<script >
import axios from 'axios';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,

  IonItem,

  IonLabel,
  IonButton,

} from '@ionic/vue';
export default {
  components:{
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButton,

  },
  data(){
    return{
      ibije:"",
    };
  },
  methods: {
    Login(){
     axios.get("http://127.0.0.1:8000/produit/")
     .then((response)=>{
      this.ibije=response.data.results
     })

},
  }
}
</script>

<style scoped>
.vertical-line {
  border-bottom: 1px solid #ccc;
  height: 100%;
}
</style>
