<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="white" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Modal</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
<img :src="photo">
  </ion-content>

</template>


<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  modalController,
} from "@ionic/vue";

export default {
    props:['photo'],
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    confirm() {
      return modalController.dismiss(this.name, "confirm");
    },
  },
};
</script>




