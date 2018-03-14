import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { Client } from '../client-model';

/**
 * Class to handle user info, both adding a new user and editing an existing one.
 */



@IonicPage()
@Component({
  selector: 'page-client-info',
  templateUrl: 'client-info.html',
})
export class ClientInfoPage {
  private db: any;
  userForm: any;
  clientToUpdate: Client = null;
  operationType = "Add";
  submitAttempt = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private alertCtrl: AlertController) {
    this.db = firebase.firestore();

    if (navParams.get("clientToUpdate")) {
      this.clientToUpdate = navParams.get("clientToUpdate");
      this.operationType= "Update";
    }

    //We should be able to assign default values here instead of in the template if we are in isUpdate but its not working
    this.userForm = formBuilder.group({
      firebaseId: [''],
      companyName: ['', Validators.required],
      cif: [''],
      center: [''],
      firstName: [''],
      lastName: [''],
      email: ['']
    });
  }

  async saveOrUpdate() {
    this.submitAttempt = true;

    if (!this.userForm.valid) {
      return;
    }
    
    try {
      //We do not want to upload the firebase it to the doc, its just needed for the update
      let id = this.userForm.value.firebaseId
      delete this.userForm.value.firebaseId;
      if (this.clientToUpdate) {
        await this.db.collection("clients").doc(id).update(this.userForm.value);
        console.log("Document updated ");
      } else { 
        const docRef = await this.db.collection("clients").add(this.userForm.value);
        console.log("Document written with ID: ", docRef.id)
      }
      this.navCtrl.pop();
    } catch (error) { console.error("Error adding or updating document: ", error); }
  }

  presentDeleteConfirmDialog() {
    let alert = this.alertCtrl.create({
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this client?<br><br>This can not be undone.',
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
            this.deleteClient()
          }
        }
      ]
    });
    alert.present();
  }

  async deleteClient() {
    try {
      await this.db.collection("clients").doc(this.userForm.value.firebaseId).delete();
      this.navCtrl.pop();
    } catch (error) { console.error("Failed to delete client")};
  }
}
