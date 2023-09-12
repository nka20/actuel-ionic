<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Accueil
        </ion-title>
        <ion-searchbar placeholder="Do you want change a name of product" @keyup.enter="handlerInput($event)"  v-model="chercher"></ion-searchbar>
        <ion-button slot="end" color="danger" @click="logout">logout</ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div class="container">
        <h1>Bienvenue sur notre application de vente!</h1>
        
        <!-- Conteneur avec mise en page flex -->
        <div class="lists-container">
          <!-- Liste des produits -->
          <ion-label v-for="az in searchedData" :key="az">
            <h1>{{az.nom}}-{{az.prix_unitaire}}</h1>
            </ion-label>
        </div>
        
        <!-- Boutons de navigation -->
        <ion-button expand="full" router-Link="/produit">Produit</ion-button>
        <ion-button expand="full" router-Link="/vente">Vente</ion-button>
     <!--  <ion-button expand="full" @click="modal_produit=true">Produit</ion-button>
        <ion-button expand="full" @click="modal_vente=true">Vente</ion-button> --> 
      </div>
    </ion-content>
    <!--
    <vente v-if="modal_vente != false"/>
    <produit v-if="modal_produit != false"/>  --> 
  </ion-page>
</template>

<script>
//import produit from "../components/ProduitVendue.vue";
//import vente from "../components/VenteVendue.vue";
import axios from 'axios';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,IonSearchbar } from '@ionic/vue';
export default {
  components: {
   // vente,
    //produit,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonSearchbar
  },
  data() {

    return {
      //modal_vente:false ,
      //modal_produit:false ,
      products:"",
      sales:"",
      searchedData:[]
      //products:this.$store.state.produit.results// Remplacez cela par vos données réelles de produits
      //sales: this.$store.state.vente.results // Remplacez cela par vos données réelles de ventes
    };
  },
  methods: {
    handlerInput(e){
      let data={"keyword":e.target.value.toLowerCase()}
      axios.post(`http://127.0.0.1:8000/produit/search/`,data,{
          headers: {
            Authorization: 'Bearer ' + this.$store.state.tokens.access,
          },
        })
        .then(response => {
         //console.log(response.data)
         this.searchedData=response.data
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du produit:', error);
        });

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
    axios.get("http://127.0.0.1:8000/produit/")
     .then((response)=>{
      this.$store.state.produit=response.data.results
      this.products=this.$store.state.produit
      console.log(response)//pour fournir les donnee seul car si on donne seulement response ca donne trop information d'inutile c est pourquoir on ajoute data.results
      localStorage.setItem("produit", JSON.stringify(response.data))
    });

    axios.get("http://127.0.0.1:8000/vente/")
     .then((response)=>{
      this.$store.state.vente=response.data.results
      this.sales=this.$store.state.vente
      localStorage.setItem("vente", JSON.stringify(response.data))
    });
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
.horizontal-line {
  border-bottom: 1px solid #ccc;
  height: 100%;
}
</style>
