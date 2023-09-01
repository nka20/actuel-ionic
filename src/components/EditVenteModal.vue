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
        <h1>modification</h1>
        <ion-item>
            <ion-select placeholder="Select a name of product"  v-model="produit">
                <ion-select-option v-for="produit in produits" :key="produit.id" :value="produit" >{{ produit.nom }} - {{ produit.prix_unitaire }}</ion-select-option>
                <ion-infinite-scroll @ionInfinite="ionInfinite">
                  <ion-infinite-scroll-content></ion-infinite-scroll-content>
                </ion-infinite-scroll>
              </ion-select>
   </ion-item>
        <ion-item>
          <ion-label>Quantite</ion-label>
          <ion-input aria-label="number" v-model="object.kilos" required type="number">quantite</ion-input>
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
  IonInfiniteScroll,
    IonInfiniteScrollContent,
  IonButton,
  modalController,


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
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonItem,
    IonLabel,
    IonButton,

  },
  data(){
    return{
      prod:this.$store.state.produit,
      object:this.select,
      produit:"allan",
      produits:""
    };
  },
  methods: {
    modifier() {
     /* let send={
        nom: this.produit.nom,
      }*/
      axios.put(`http://127.0.0.1:8000/vente/${this.object.id}/`,{nom: this.object.nom, quantite:this.object.kilos,prix_unique:this.object.nom.prix_unique,prix_total:this.produit.prix_unique * this.object.kilos},{
          headers: {
            Authorization: 'Bearer ' + this.$store.state.tokens.access,
          },
        })
        .then(response => {
          /*let index = this.$store.state.produit.findIndex(x => x.id == this.object.id)
          this.$store.state.produit[index] = response.data*/
          console.log(response)
          return modalController.dismiss(this.object, 'confirm');
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
            this.prod=new_val
}
      }
    },
    mounted(){
        axios.get("http://127.0.0.1:8000/produit/",).then((response) => {
            this.produits = response.data.results
            let nextPage = response.data.next;
//while(response.data.next != null){
console.log(response.data.results)
//response.data.next++
//}
for (let i=2;i <=10;i++) {
  console.log(nextPage)
  axios.get(`http://127.0.0.1:8000/produit/?page=${i}`).then((response) => {
    this.produits.push(...response.data.results);
    nextPage = response.data.next;
  });
}})
    }
})
</script>

<style scoped>

</style>