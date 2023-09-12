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
        <ion-item>
        <h1>modification</h1>
            <ion-searchbar placeholder="Do you want change a name of product" @keyup.enter="handlerInput($event)"  v-model="chercher"></ion-searchbar>
          </ion-item>
          <ion-item>
          <ion-list>
            <ion-label v-for="az in searchedData" :key="az">
              <h1>{{az.nom}}-{{az.prix_unitaire}}</h1>
            </ion-label>
          </ion-list>
        </ion-item>
        <ion-item>
          <ion-label>Quantite</ion-label>
          <ion-input aria-label="number" v-model="object.kilos" type="number">quantite</ion-input>
        </ion-item>
        <ion-button expand="full" @click="modifier" >Modifier</ion-button>
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
IonInput,
  IonLabel,
  IonButton,
  modalController,
  IonSearchbar,
  IonList


} from '@ionic/vue';
import { defineComponent} from 'vue';
export default  defineComponent({
  name:'EditVenteVue',
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
    IonSearchbar,
    IonList
  },
  data(){
    return{
      prod:this.$store.state.produit,
      object:this.select,
      
      produit:{
        id:this.select.id,
        prix_unitaire:this.select.prixU
    },
        chercher:"",
         produits:null,
         searchedData:[]
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
    chercherP(){
          if(this.chercher.trim().length ==0){
            return this.$store.state.produit,
            console.log(this.prod)
          }
          if(this.chercher.toLowerCase() != this.chercher.toUpperCase()){
            return this.$store.state.produit.filter((i)=>i.nom.toLowerCase().includes(this.chercher.trim.toLowerCase())),
            console.log(this.prod)
          }
          else{
            return this.$store.state.produit.filter((i)=> i.prix_unitaire.toString().includes(this.chercher.trim()))
          }
        },
    modifier() {
      let send={
        nom: this.produit.id,
        prix_unique:this.produit.prix_unitaire,
        prix_total:this.object.kilos * this.produit.prix_unitaire,
        quantite:this.object.kilos
      }
      console.log(send.prixT,send.prixU)
      axios.put(`http://127.0.0.1:8000/vente/${this.object.id}/`,send,{
          headers: {
            Authorization: 'Bearer ' + this.$store.state.tokens.access,
          },
        })
        .then(response => {
          let index = this.$store.state.vente.findIndex(x => x.id == this.object.id)
          this.$store.state.vente[index] = response.data
          console.log(response)
          return modalController.dismiss(index, 'confirm');
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour du produit:', error);
        });
    },
      cancel() {
        return modalController.dismiss(null, 'cancel');
      },
      watch:{
        "$store.state.vente"(new_val){
            this.$store.state.produit=new_val
}
      },
      computed:{
        chercherP(){
          if(this.chercher.trim().length ==0){
            return this.$store.state.produit,
            console.log(this.prod)
          }
          if(this.chercher.toLowerCase() != this.chercher.toUpperCase()){
            return this.$store.state.produit.filter((i)=>i.nom.toLowerCase().includes(this.chercher.trim.toLowerCase())),
            console.log(this.prod)
          }
          else{
            return this.$store.state.produit.filter((i)=> i.prix_unitaire.toString().includes(this.chercher.trim()))
          }
        },
      },
    },
    mounted(){
    }
    }
)
</script>

<style scoped>

</style>