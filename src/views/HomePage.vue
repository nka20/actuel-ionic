<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Accueil
        </ion-title>
        <ion-button slot="end" color="danger" @click="logout">logout</ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <h1>Bienvenue sur notre application de vente!</h1>
        
        <!-- Conteneur avec mise en page flex -->
        <div class="lists-container">
          <!-- Liste des produits -->
          <div class="list-container">
            <div class="list-title">Liste des produits</div>
            <div class="list">
              <div class="list-item" v-for="product in products" :key="product">
                <p>Id: {{ product.id }}</p>
                <p>Nom du produit: {{  product.nom }}</p>
                <p>Prix unitaire: {{ prix_unitaire }}</p>
                <p>Utilisateur: {{ product.utilisateur }}</p>
                <div class="horizontal-line"></div>
              </div>
            </div>
          </div>
          
          <!-- Ligne verticale de séparation -->
          <div class="vertical-line"></div>
          
          <!-- Liste des ventes -->
          <div class="list-container">
            <div class="list-title">Liste des ventes</div>
            <div class="list">
              <div class="list-item" v-for="(sale, index) in sales" :key="index">
                <p>Id: {{ sale.id }}</p>
                <p>Nom du produit: {{ sale.nomProduit }}</p>
                <p>Quantité: {{ sale.quantite }}</p>
                <p>Prix total: {{ sale.prixTotal }}</p>
                <p>Prix unitaire: {{ sale.prixUnitaire }}</p>
                <p>Utilisateur: {{ sale.utilisateur }}</p>
                <div class="horizontal-line"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Boutons de navigation -->
        <ion-button expand="full" routerLink="/produit">Produit</ion-button>
        <ion-button expand="full" routerLink="/vente">Vente</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import axios from 'axios';
export default {
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton
  },
  data() {
    axios.get("http://127.0.0.1:8000/vente/")
     .then((response)=>{
      this.products=response.data.results
    }),
    axios.get("http://127.0.0.1:8000/produit/")
     .then((response)=>{
      this.sales=response.data.results
    })
    return {
      products:'',// Remplacez cela par vos données réelles de produits
      sales: '' // Remplacez cela par vos données réelles de ventes
    };
  },
  methods: {
    logout(){
      localStorage.removeItem("tokens"),
     this.$store.state.tokens=null
    },
  }
}
</script>

<style scoped>
/* Vos styles CSS */
.lists-container {
  display: flex;
  justify-content: space-between;
}

.list-container {
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  margin: 10px;
}

.list-title {
  font-weight: bold;
  margin-bottom: 10px;
}

.list {
  border-top: 1px solid #ccc;
  padding-top: 10px;
}

.list-item {
  margin-bottom: 15px;
}

.vertical-line {
  border-left: 1px solid #ccc;
  height: 100%;
}
.horizontal-line {
  border-bottom: 1px solid #ccc;
  height: 100%;
}
</style>
