import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { TaskFormPage } from '../task-form/task-form';
import { TaskInfoPage } from '../task-info/task-info';

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  private db: any;
  clients: Array<Object>;
  tasks: Array<Object>;
  selectedClientFirebaseId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController) {
    this.db = firebase.firestore();
  }

  ionViewDidLoad() {
    this.getClients();
  }

  ionViewWillEnter() {
    if(this.selectedClientFirebaseId) {
      console.log("Popping back to list, update tasks")
      this.getTasksForClient();
    }
  }

  addTask() {
    this.navCtrl.push(TaskFormPage);
  }

  editTask(task) {
    this.navCtrl.push(TaskInfoPage, {task: task, clientFirebaseId: this.selectedClientFirebaseId});
  }

  private async getClients() {
    let loadingIndicator = this.loadingCtrl.create({
      content: 'Loading clients'
    });
    loadingIndicator.present();

    try {
      const querySnapshot = await this.db.collection("clients").get();
      this.clients = querySnapshot.docs.map(doc => {
        return { firebaseId: doc.id, ...doc.data() }
      });
    } catch (error) {
      console.log("Failed to get clients")
    }
    loadingIndicator.dismiss();
  }

  private async getTasksForClient() {
    try {
      const querySnapshot = await this.db.collection("clients").doc(this.selectedClientFirebaseId).collection("work").get();
      this.tasks = querySnapshot.docs.map(doc => {
        return { firebaseId: doc.id, ...doc.data() }
      });
    } catch (error) {
      console.log("Failed to get tasks")
    }
    console.log("done gettings tasks")
  }

  clientSelected() {
    console.log("selected client is " + this.selectedClientFirebaseId);
    this.getTasksForClient();
  }
}
