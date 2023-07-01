<template>
    <ion-page>
    <ion-content class="ion-padding">
    <ion-item fill="outline">
    <ion-label position="floating">username</ion-label>
    <ion-input type="text"></ion-input>
    </ion-item>
<br>
        <ion-item fill="outline">
    <ion-label position="floating">password</ion-label>
    <ion-input type="password"></ion-input>
    </ion-item>
    <br>
    <ion-button expand="block" @click="$emit('loginEmited')">connexion</ion-button>
    </ion-content>
    </ion-page>
</template>
<script>
import { IonItem,IonLabel,IonInput,IonPage,IonContent,IonButton} from '@ionic/vue'

export default{
    components:{
        IonItem,
        IonLabel,
        IonInput,
        IonPage,
        IonContent,
        IonButton
    }
}
</script>

<style scoped>

</style>