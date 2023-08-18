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
      <ion-button expand="full" @click="Login">Produit</ion-button>
    </ion-col>
    <div class="list-item" v-for="product in ibije" :key="product">
      <p>{{product}}</p>
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
    return{
ibije:"nta na kimwe",
username:"",
password:"",
    }
  },
  methods: {
    Login(){
      let data={
        username: this.username,
        password:this.password
      }
     //this.$store.state.connected=true;
     axios.post("http://127.0.0.1:8000/login/",data)
     .then((response)=>{
      this.ibije=response.data
      //this.$store.state.connected=true;
     }).catch((error) => {
          console.log("Error:", error);
          console.log(this.response)

        }); 

},
mounted() {
    this.login = true;
  },
  }
  }
</script>

<style scoped>

</style>