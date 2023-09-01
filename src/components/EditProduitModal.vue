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
          <ion-label>Nom</ion-label>
          <ion-input aria-label="varchar" v-model="object.nom" required type="text">nom editer</ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Prix unitaire</ion-label>
          <ion-input aria-label="number" v-model="object.prix" required type="number">prix a editer</ion-input>
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


} from '@ionic/vue';
import { defineComponent} from 'vue';
export default  defineComponent({
  name:'EditProduitVue',
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

  },
  data(){
    return{
      prod:this.$store.state.produit,
      object:this.select
    };
  },
  methods: {
    modifier() {
      axios.put(`http://127.0.0.1:8000/produit/${this.object.id}/`,{nom: this.object.nom, prix_unitaire:this.object.prix},{
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
        "$store.state.produit"(new_val){
            this.prod=new_val
}
      }
    },
})
</script>

<style scoped>

</style>