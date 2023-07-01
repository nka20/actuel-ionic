<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
<ion-list>

<ion-item v-for="item in liste_caption" :key="item.id">

<ion-avatar><img src="item.img">
</ion-avatar>

<ion-label>
Date:{{item.date}}
<P>{{item.caption}}</P>
</ion-label>

<ion-button @click="detailCaption(item)">Detail</ion-button>
</ion-item>

</ion-list>
<ion-fab slot="fixed" vertical="bottom" horizontal="end">
<ion-fab-button @click="addinfo">
<ion-icon :icon="add"></ion-icon>
</ion-fab-button>
</ion-fab>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar,IonList,IonItem,IonAvatar,IonLabel,IonButton, modalController ,IonFab,IonFabButton,IonIcon} from '@ionic/vue';
import DetailCaption from "../components/DetailCaption.vue";
import {add} from "ionicons/icons";
import AddCaption from '../components/AddCaption.vue';
import { Camera, CameraResultType } from '@capacitor/camera';
export default{
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
      IonIcon
  },
  data(){
    return{
      add,
    liste_caption:[
      {id:1,
      image:null,
      date:"23/6/2023",
      caption:"Lorem ipsum dolor sit ...."
      },

         {id:2,
      image:null,
      date:"26/6/2023",
      caption:"Lorem ipsum dolor"
      },

         {id:3,
      image:null,
      date:"29/6/2023",
      caption:"Lorem sit ...."
      },
    ]
  }
  },
  methods:{
    openCaption(){
      this.add_Caption_show =! this.add_Caption_show
    },
    async detailCaption(caption){
      console.log("inside")
const modal= await modalController.create({
  component: DetailCaption,
  componentProps:{captionProps:caption}
})

modal.present();
    },

        async addinfo(){
const modal= await modalController.create({
  component: AddCaption,
})

modal.present();


const {data,role}=await modal.onWillDismiss();
console.log(data,role)
if(role==="confirm"){
  this.liste_caption.push(data),
  console.log(this.liste_caption)
}
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
