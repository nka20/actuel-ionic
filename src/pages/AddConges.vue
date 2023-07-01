<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button color="medium" @click="cancel">Cancel</ion-button>
      </ion-buttons>
      <ion-title>Modal</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm" :strong="true">Confirm</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding">
    <ion-item>
      <ion-label position="floating" fill="outline">Debut</ion-label>
      <ion-input
        label-placement="stacked"
        v-model="name" type="date" class="ion-margin-top"
        
        
      ></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="floating" fill="outline">Fin</ion-label>
      <ion-input
        label-placement="stacked"
        v-model="name" type="date" class="ion-margin-top"
        
        
      ></ion-input>
    </ion-item>
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
  IonItem,
  IonInput,
  modalController,
} from "@ionic/vue";

export default {
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonInput,
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




