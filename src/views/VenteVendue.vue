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
            <ion-input aria-label="varchar" type="text">produit</ion-input>
          </ion-item>
          <ion-item>
            <ion-label>Prix</ion-label>
            <ion-input aria-label="number" type="number">prix</ion-input>
          </ion-item>
          <ion-button expand="full" @click="save">Enregistrer</ion-button>
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
              <ion-button v-model="sale.isSelected" color="danger" @click="handleCheckboxChange(sale)">supprimer</ion-button>
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
      vente:[]
    };
  },
    methods: {
      handleCheckboxChange(selectedSale) {
      this.vente.forEach(sale => {
        if (sale !== selectedSale) {
          sale.isSelected = false;
        }
      });
      if (selectedSale) {
        console.log("Vente sélectionnée. ID:", selectedSale.id);
        //console.log(this.$store.state.produit[1]['nom'])
        if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
          axios.delete(`http://127.0.0.1:8000/vente/${selectedSale.id}/`, {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.tokens.access,
              },
            })
         .then(response => {
         // mise a jour de la liste
        
               axios.get("http://127.0.0.1:8000/vente/")
                    .then((response)=>{
      this.$store.state.vente=response.data.results
      this.vente=this.$store.state.vente
      localStorage.setItem("vente", JSON.stringify(response.data))
    });




              console.log(response);
              // Actualiser la liste des produits
              this.vente = this.vente.filter(sale => sale.id !== selectedSale.id);
              console.log('Ressource supprimée avec succès');
            })
            .catch(error => {
              console.error('Erreur lors de la suppression de la ressource:', error);
            });
          }


      } else {
        console.log("Vente désélectionnée. ID:", selectedSale.id);
      }
    },
    save(){
      /*
      let product={
        nom:this.nom,
        prix_unitaire:this.prix,
      }
      let headers={
        headers:{
          Authorization: 'Bearer '+this.$store.state.tokens.access
        }
      }
      
      axios.post('http://127.0.0.1:8000/produit/', product, headers)
      .then((response) => {
        console.log(response)
        this.$store.state.produit.push(response.data)
      }).catch((error) => {
        console.log("Error:", error);
      });
*/
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