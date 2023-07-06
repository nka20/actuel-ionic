<template>
<ion-header>
<ion-toolbar>
<ion-buttons>
<ion-button @click="retour">Retour</ion-button>
</ion-buttons>

<ion-title align="center">Ajouter Caption</ion-title>
</ion-toolbar>
</ion-header>
<ion-content  class="ion-padding">
  <ion-list>
    <ion-button @click="getImage">Image</ion-button>
   <ion-item>
      <ion-input 
      label-placement="stacked"
       label="caption"
     placeholder="caption"
     type="text"
     v-model="caption">
    </ion-input>
    </ion-item>
    <ion-item>
      <ion-input label-placement="stacked"  v-model="date" type="date" label="date"  placeholder="date"></ion-input>
    </ion-item>
  </ion-list>
    <ion-button expand="block" @click="ajouterData">ajouter</ion-button>

</ion-content>
</template>
<script>
import { Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {IonList,IonHeader,IonToolbar,IonButtons,IonButton,IonTitle,IonContent,IonItem,IonInput, modalController} from '@ionic/vue';
export default{
    name: 'AddCaption',
   data(){
return{
  date:null,
  caption:"",
}
   },
   components:{
    IonList,
IonHeader,
IonToolbar,
IonButtons,
IonButton,
IonTitle,
IonContent,
IonItem,
IonInput,
   },
   methods:{
    retour(){
      return modalController.dismiss(null,'cancel')
    },
    ajouterData(){
      let data={
        caption:this.caption,
        date:this.date
      }
      return modalController.dismiss(data,"confirm")
    },
    ajouterCaption(){
        let p = {
            date:this.date, 
            caption:this.caption
        }
       return modalController.dismiss(p, "addCaptionEmited")
    },
    async getImage(){
         const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            correctOrientation:true,
            resultType: CameraResultType.Uri,
            source:CameraSource.Prompt,
          }).catch((e)=>{
            console.log("error: ",e)
          });
          console.log(image)
    }
   }
}
</script>

<style scoped>

</style>
