<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Liste des employes</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-list>
        <ion-item v-for="item in liste_captions" :key="item.id">
          <ion-avatar>
            <img :src="item.image">
          </ion-avatar>
          <ion-label>
            Date : {{item.date}}
            <p>{{item.caption}}</p>
          </ion-label>
          <ion-button @click="detailCaption(item)">Details</ion-button>
        </ion-item>
      </ion-list>
      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="openAddCaption">
          <ion-icon :icon="add"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script >
import {
  IonFab,
  IonFabButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  modalController

} from '@ionic/vue';
import {add} from "ionicons/icons"
import DetailsCaption from "../components/DetailsCaption.vue"
import AddCaption from "../components/AddCaption.vue"
import { Camera, CameraResultType } from '@capacitor/camera';
export default {
  components:{
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonButton,
    IonFab,
    IonFabButton,

  },
  data(){
    return {
      add,
      add_caption_shown:false,
      liste_captions:[
        {
          id:1,
          image:"",
          date:"23-6-2023",
          caption:"Lorem ipsum dolor sit amet, consectetur adipisicing elit,ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        },
        {
          id:2,
          image:null,
          date:"22-6-2023",
          caption:"Lorem ipsum dolor sit amet, consectetur adipisicing elit,ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        },
        {
          id:3,
          image:null,
          date:"21-6-2023",
          caption:"Lorem ipsum dolor sit amet, consectetur adipisicing elit,ed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
        }
      ]
    }
  },
  methods:{
    async detailCaption(caption){
      console.log("inside")
      const modal = await modalController.create({
        component:DetailsCaption,
        componentProps:{captionProps:caption}
      })
      modal.present();

    },
    appendToList(data){
      this.liste_captions.push(data)
    },
    async openAddCaption(){
      const modal = await modalController.create({
        component:AddCaption,
      })
      modal.present();

      const {data, role} = await modal.onWillDismiss();

      if(role==="addCaptionEmited")
        this.appendToList(data)
    },
    async takePic(){
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      console.log(image)
        }
  }
}
</script>

<style scoped>

</style>
