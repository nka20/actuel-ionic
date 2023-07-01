<template>
  <ion-card>
    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
    <ion-card-header>
      <ion-card-title>Card Title</ion-card-title>
      <ion-card-subtitle>{{allan.date }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{allan.caption }}
    </ion-card-content>
  </ion-card>
</template>
<script>
 import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,modalController } from '@ionic/vue';
  import { defineComponent } from 'vue';
export default defineComponent({
    name: 'DetalCaption',
    props:["captionProps"],
    data(){
      return {
        allan:this.captionProps,
      }
    },
    components: { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle },
   methods:{
    retour(){
      return modalController.dismiss(null,'cancel')
    }
   }
})
</script>

<style scoped>

</style>
