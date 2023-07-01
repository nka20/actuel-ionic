<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-button @click="retour">Retour</ion-button>
            </ion-buttons>
            <ion-title>Details Caption</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <ion-card>
            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
            <ion-card-header>
              <ion-card-title>Date : {{captionProps.date}}</ion-card-title>
            </ion-card-header>

            <ion-card-content>
              {{captionProps.caption}}
            </ion-card-content>
          </ion-card>
    </ion-content>
</template>

<script>
import {
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    modalController,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle
} from '@ionic/vue'
export default {

  name: 'DetailsCaption',
  components:{
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonTitle,
    IonContent,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle
  },
  props:["captionProps"],
  data() {
    return {

    };
  },
  methods:{
    retour(){
        return modalController.dismiss(null, 'cancel');
    }
  }
};
</script>

<style lang="css" scoped>
</style>
