<template>
    <ion-page>
    <ion-header>
        <ion-toolbar>
          <ion-title>
            Vente
          </ion-title>
          <ion-button slot="end" color="danger" @click="logout">logout</ion-button>
        </ion-toolbar>
      </ion-header>
      
      <ion-content>
        <div class="container">
          <h1>Enregistrement de vente</h1>
          <ion-item>
            <ion-label>Nom du produit</ion-label>
            <ion-input aria-label="varchar" type="text">nom du produit</ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Prix</ion-label>
            <ion-input aria-label="number" type="number">prix</ion-input>
          </ion-item>
          <ion-button expand="full" @click="Login">Enregistrer</ion-button>
        </div>
        <div class="list-container">
          <div class="list-title">Liste des ventes</div>
          <div class="list">
            <div class="list-item" v-for="sale in vente" :key="sale">
              <p>Id: {{ sale.id }}</p>
              <p>Nom du produit: {{ sale.nom }}</p>
              <p>Quantité: {{ sale.quantite }}</p>
              <p>Prix total: {{ sale.prix_total }}</p>
              <p>Prix unitaire: {{ sale.prix_unitaire }}</p>
              <p>Utilisateur: {{ sale.utilisateur }}</p>
              <div class="horizontal-line"></div>
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
    IonInput,
    IonItem,
  
    IonLabel,
    IonButton,
  
  } from '@ionic/vue';
  export default {
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
      vente:""
    };
  },
    methods: {
    Login(){
     
},
logout(){
  localStorage.removeItem("tokens"),
      localStorage.removeItem("produit"),
      localStorage.removeItem ("vente"),
     this.$store.state.tokens=null
     this.$store.state.produit=null
     this.$store.state.vente=null
    },
  },
    mounted(){
      axios.get("http://127.0.0.1:8000/vente/")
     .then((response)=>{
      this.$store.state.vente=response.data.results
      this.vente=this.$store.state.vente
      localStorage.setItem("vente", JSON.stringify(response.data))
    });
},
}
  </script>
  
  <style scoped>
  .horizontal-line {
    border-bottom: 1px solid #ccc;
    height: 100%;
  }
  </style>