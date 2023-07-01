<template>

<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button color="white">Cancel</ion-button>
    </ion-buttons>
    <ion-title class="ion-text-center">Detail Photo</ion-title>
    <ion-buttons slot="end">
      <ion-button>Modifier</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>
<ion-content class="ion-padding">
<ion-label>voici l'info</ion-label>
</ion-content>

</template>
<script>
  import{IonContent,IonToolbar,IonButtons,IonHeader,IonLabel,IonTitle} from '@ionic/vue'
export default {
    components:{
        IonContent,
        IonToolbar,
        IonButtons,
        IonHeader,
        IonLabel,
        IonTitle
    }
}
</script>