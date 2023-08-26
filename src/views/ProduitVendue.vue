<template>
  <ion-page>
    <ion-header>
    <ion-toolbar>
      <ion-title>
        Produit
      </ion-title>
      <ion-button slot="end" color="danger" @click="logout">logout</ion-button>
    </ion-toolbar>
  </ion-header>
  
  <ion-content>
    <div class="container">
      <h1>Enregistrement de produit</h1>
      <ion-item>
        <ion-label>Nom</ion-label>
        <ion-input aria-label="varchar" v-model="nom" type="text">nom</ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Prix unitaire</ion-label>
        <ion-input aria-label="number" v-model="prix" type="number">prix unitaire</ion-input>
      </ion-item>
      <ion-button expand="full"  @click="save">Enregistrer</ion-button>
    </div>
    <div class="lists-container">
      <!-- Liste des produits -->
      <div class="list-container">
        <div class="list-title">Liste des produits</div>
        <div class="list">
          
          <div class="list-item" v-for="product in prod" :key="product.id">
            <ion-checkbox v-model="product.isSelected" @ionChange="handleCheckboxChange(product)"></ion-checkbox>
            <p>Id: {{product.id}}</p>
            <p>Nom du produit: {{product.nom}}</p>
            <p>Prix unitaire: {{product.prix_unitaire}}</p>
            <p>Utilisateur: {{product.utilisateur}}</p>
            <div class="horizontal-line"></div>
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
  IonCheckbox,
  IonItem,
IonInput,
  IonLabel,
  IonButton,

} from '@ionic/vue';
export default {
  components:{
    IonContent,
    IonHeader,
    IonPage,
    IonInput,
    IonCheckbox,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButton,

  },
  data(){
    return{
      ibije:"",
      nom:"",
      prix:"",
      prod:[],
    };
  },
  methods: {
    handleCheckboxChange(selectedProduct) {
      this.prod.forEach(product => {
        if (product !== selectedProduct) {
          product.isSelected = false;
        }
      });
      if (selectedProduct) {
        console.log("Vente sélectionnée. ID:", selectedProduct.id);
       
        if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
          axios.delete(`http://127.0.0.1:8000/produit/${selectedProduct.id}/`, {
              headers: {
                Authorization: 'Bearer ' + this.$store.state.tokens.access,
              },
            })
         .then(response => {
         // mise a jour de la liste
        
               axios.get("http://127.0.0.1:8000/produit/")
                    .then((response)=>{
      this.$store.state.produit=response.data.results
      this.prod=this.$store.state.produit
      //console.log(this.$store.state.produit)
      localStorage.setItem("produit", JSON.stringify(response.data))
    });




              console.log(response);
              // Actualiser la liste des produits
              this.prod = this.prod.filter(product => product.id !== selectedProduct.id);
              console.log('Ressource supprimée avec succès');
            })
            .catch(error => {
              console.error('Erreur lors de la suppression de la ressource:', error);
            });
          }


      } else {
        console.log("Vente désélectionnée. ID:", selectedProduct.id);
      }
    },
    save(){
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
      this.prod=this.$store.state.produit
      //console.log(this.$store.state.produit)
      localStorage.setItem("produit", JSON.stringify(response.data))
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
