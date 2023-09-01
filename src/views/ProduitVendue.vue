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
  
  <ion-content class="ion-padding">
    <div class="container">
      <h1>Enregistrement de produit</h1>
      <ion-item>
        <ion-label>Nom</ion-label>
        <ion-input aria-label="varchar" v-model="nom" required type="text">nom</ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Prix unitaire</ion-label>
        <ion-input aria-label="number" v-model="prix" required type="number">prix unitaire</ion-input>
      </ion-item>
      <ion-button expand="full"  @click="save">Enregstrer</ion-button>
    </div>
    <div class="lists-container">
      <!-- Liste des produits -->
      <div class="list-container">
        <div class="list-title">Liste des produits</div>
        <div class="list">
          <div class="list-item"  v-for="product in prod" :key="product.id">
            <p>Id: {{product.id}}</p>
            <p>Nom du produit: {{product.nom}}</p>
            <p>Prix unitaire: {{product.prix_unitaire}}</p>
            <p>Utilisateur: {{product.utilisateur}}</p>
            <ion-button v-model="product.isSelected"  color="danger" @click="supprimer(product)">supprimer</ion-button>
            <ion-button class="block" v-model="product.isSelect" color="success" @click="modal(product)">modifier</ion-button>
            <div class="horizontal-line"></div>
          </div>
          <ion-infinite-scroll @ionInfinite="ionInfinite">
            <ion-infinite-scroll-content></ion-infinite-scroll-content>
          </ion-infinite-scroll>
        </div>
      </div>
      </div>
  </ion-content>
</ion-page>
</template>

<script >
import axios from 'axios';
import { defineComponent} from 'vue';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInfiniteScroll,
    IonInfiniteScrollContent,
IonInput,
  IonLabel,
  IonButton,
  modalController,

} from '@ionic/vue';
import Edit from "../components/EditProduitModal.vue"
export default defineComponent({
  components:{
    IonContent,
    IonHeader,
    IonPage,
    IonInput,
    IonTitle,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButton,

  },
  data(){
    return{
      nom:"",
      prix:"",
      id:"",
      prod:[],
      next_link: null,
    };
  },
  methods: {
    supprimer(selectedProduct) {
       
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
      localStorage.setItem("produit", JSON.stringify(response.data))
    });
              console.log(response);
              // Actualiser la liste des produits
              this.prod = this.prod.filter(product => product.id !== selectedProduct.id);
              console.log('Ressource supprimée avec succès');
            })
            .catch(error => {
              console.error('Erreur lors de la suppression de la ressource:', error);
            })


      } 
    },
    async modal(product) {
      const modal = await modalController.create({
      component: Edit,
      componentProps:{select:{nom:product.nom, prix:product.prix_unitaire, id:product.id}}
    });

    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.$store.state.produit=data
      this.message = `Hello, ${data}!`;
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
    getProducts(){
      axios.get("http://127.0.0.1:8000/produit/")
     .then((response)=>{
      this.$store.state.produit=response.data.results
      this.prod=this.$store.state.produit
      //console.log(this.$store.state.produit)
      localStorage.setItem("produit", JSON.stringify(response.data))
    });
    },
    getDatas(){
        axios.get(this.next_link)
        .then((response) => {
          if(response.data.next!=null)
            this.next_link = response.data.next
          else this.next_link=null   // this.products = response.data.results
            this.$store.state.produit.push(...response.data.results)
            console.log(this.$store.state.produit)
          }).catch(()=>{
            alert("Pas de donnees !")
          })  
    },
    ionInfinite(e){
      console.log(e, "yahashitse")
      e.target.complete()
      this.getDatas()
    },
},

   mounted(){
      axios.get("http://127.0.0.1:8000/produit/")
    .then((response) => {
      if(response.data.next != null)
      this.next_link = response.data.next
      this.$store.state.produit = response.data.results
      this.prod=this.$store.state.produit
})

    },
    watch:{
        "$store.state.produit"(new_val){
            this.prod=new_val
}
},
})
</script>

<style scoped>
.horizontal-line {
  border-bottom: 1px solid #ccc;
  height: 100%;
}
.block {
  align-items: center;
  justify-content: center;
}


</style>
