import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import * as firebase from 'firebase';
import 'firebase/firestore';
/**
 * Generated class for the TaskInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-info',
  templateUrl: 'task-info.html',
})
export class TaskInfoPage {
  private db: any;
  taskForm: any;
  taskToUpdate: any = null;
  submitAttempt = false;
  clientFirebaseId: String = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private alertCtrl: AlertController) {
    this.db = firebase.firestore();

    this.taskToUpdate = navParams.get("task");
    this.clientFirebaseId = navParams.get("clientFirebaseId");

    this.taskForm = formBuilder.group({
      firebaseId: [this.taskToUpdate.firebaseId],
      center: [this.taskToUpdate.center],
      worker: [this.taskToUpdate.worker],
      sT: [this.taskToUpdate.sT],
      eT: [this.taskToUpdate.sT],
      obs: [this.taskToUpdate.obs],
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskInfoPage');
  }

  async update() {
    this.submitAttempt = true;

    if (!this.taskForm.valid) {
      return;
    }

    try {
      //We do not want to upload the firebase it to the doc, its just needed for the update
      let id = this.taskToUpdate.firebaseId;
      
        await this.db.collection("clients").doc(this.clientFirebaseId).collection("work").doc(id).update(this.taskForm.value);
        //let dbRef =  this.db.collection("clients").doc(this.clientFirebaseId);
        //dbRef.collection("work").doc(id).update(this.taskForm.value);
        console.log("Document updated ");
      
      this.navCtrl.pop();
    } catch (error) { console.error("Error adding or updating document: ", error); }

  }


  async deleteTask() {
    try {
      await this.db.collection("clients").doc(this.clientFirebaseId).collection("work").doc(this.taskToUpdate.firebaseId).delete();
      this.navCtrl.pop();
    } catch (error) { console.error("Failed to delete client")};
  }

  presentDeleteConfirmDialog() {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this task?<br><br>This can not be undone.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.deleteTask()
          }
        }
      ]
    });
    alert.present();
  }
}
