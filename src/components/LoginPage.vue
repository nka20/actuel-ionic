<template>
    <ion-page>
<ion-header>
    <ion-toolbar>
      <ion-title>
        Connexion
      </ion-title>
    </ion-toolbar>
  </ion-header>
  
  <ion-content>
    <ion-col class="container">
      <h1>Connectez-vous</h1>
      <ion-item>
        <ion-label>Email</ion-label>
        <ion-input aria-label="email"  type="text" v-model="username">Username</ion-input>
      </ion-item>
      <ion-item>
        <ion-label>Mot de passe</ion-label>
        <ion-input aria-label="password" type="password" v-model="password">Password</ion-input>
      </ion-item>
      <ion-button expand="full" @click="Login" >connexion</ion-button>
    </ion-col>
    <div class="list-item">
      <p>{{ibije}}</p>
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
  IonCol,
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
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonCol,

  },
  data(){
    return {
      ibije:"",
      username:"",
      password:"",
    }
  },
  methods: {
    Login(){
      let user={
        'username': this.username,
        'password':this.password
      }
      axios.post("http://127.0.0.1:8000/login/",user)
      .then((response)=>{
        this.$store.state.tokens = response.data
        localStorage.setItem("tokens", JSON.stringify(response.data))

      }).catch((error) => {
        console.log("Error:", error);
        this.ibije="mots de passe incorrect"
      });

      console.log('hello')
/*
      axios.get("http://127.0.0.1:8000/produit/")
     .then((response)=>{
      this.$store.state.produit=response
      localStorage.setItem("produit", JSON.stringify(response.data))
    });

    axios.get("http://127.0.0.1:8000/vente/")
     .then((response)=>{
      this.$store.state.vente=response
      localStorage.setItem("vente", JSON.stringify(response.data))
    });
    */
    }
  },
  mounted(){

  }
}
</script>

<style scoped>

</style>