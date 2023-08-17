<template>
    <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-title>
            Vente
          </ion-title>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <div class="container">
          <h1>Enregistrement de vente</h1>
          <ion-item>
            <ion-label>Nom du produit</ion-label>
            <ion-input type="text"></ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Prix</ion-label>
            <ion-input type="number"></ion-input>
          </ion-item>
          <ion-button expand="full" @click="Login">Enregistrer</ion-button>
        </div>
        <div class="list-container">
          <div class="list-title">Liste des ventes</div>
          <div class="list">
            <div class="list-item" v-for="sale in ibije" :key="sale">
              <p>Id: {{ sale.id }}</p>
              <p>Nom du produit: {{ sale.nomProduit }}</p>
              <p>Quantité: {{ sale.quantite }}</p>
              <p>Prix total: {{ sale.prixTotal }}</p>
              <p>Prix unitaire: {{ sale.prixUnitaire }}</p>
              <p>Utilisateur: {{ sale.utilisateur }}</p>
              <div class="vertical-line"></div>
              </div>
          </div>
        </div>
      
      </ion-content>
    </ion-page>
</template>
<script>
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
      axios.get("http://127.0.0.1:8000/vente/")
     .then((response)=>{
      this.ibije=response.data.results
     })
    return{
      ibije:"",
    };
  },
    methods: {
    Login(){
     
      axios.get("http://127.0.0.1:8000/vente/")
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