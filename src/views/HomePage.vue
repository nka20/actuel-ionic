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
                <p>Prix unitaire: {{ product.prix_unitaire }}</p>
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
                <p>Nom du produit: {{ sale.nom }}</p>
                <p>Quantité: {{ sale.quantite }}</p>
                <p>Prix total: {{ sale.prix_total }}</p>
                <p>Prix unitaire: {{ sale.prix_unitaire }}</p>
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
    return {
      products:this.$store.state.produit.results,// Remplacez cela par vos données réelles de produits
      sales: this.$store.state.vente.results // Remplacez cela par vos données réelles de ventes
    };
  },
  methods: {
    logout(){
      localStorage.removeItem("tokens"),
      localStorage.removeItem("produit"),
      localStorage.removeItem ("vente"),
     this.$store.state.tokens=null
     this.$store.state.produit=null
     this.$store.state.vente=null
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
