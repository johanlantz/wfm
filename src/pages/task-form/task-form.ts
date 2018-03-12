import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { Client } from '../client/client-info/client-info';
import { Time } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the TaskFormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-task-form',
  templateUrl: 'task-form.html',
})
export class TaskFormPage {
  private db: any;
  taskDate: String = new Date().toISOString();
  startTime = new Date().toISOString();
  endTime = new Date().toISOString();
  clients: Array<Object>;
  selectedClientFirebaseId: string;
  selectedCenter: any; //todo
  tasks = ["Maintenence", "Windows", "Lights", "Occasional", "Cleaning", "Polish", "Terrass", "Other"];
  observations: String;
  workers = ["Jose", "Alejandro", "Mia", "Carla"];
  selectedWorker: String;
  taskForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder) {
    this.db = firebase.firestore();
    this.clients = new Array();

    let fbargs = {};
    this.tasks.forEach(task => fbargs[task] = []);
    this.taskForm = formBuilder.group(fbargs);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskFormPage');
    this.getClients();
  }

  private async getClients() {
    const querySnapshot = await this.db.collection("clients").get();
    this.clients = querySnapshot.docs.map(doc => {
      return { firebaseId: doc.id, ...doc.data() }
    });
  }

  getPerformedTasks() {
    let tasksPerformed = [];
    this.tasks.forEach((task) => {
      if (this.taskForm.get(task).value) {
        tasksPerformed.push(task);
      }
    });
    return tasksPerformed;
  }

  //TODO time is still in UTC
  async savePerformedTask() {
    let startTimeMinutes = ("0" + new Date(this.startTime).getMinutes().toString()).slice(-2);
    let startTimeHours = ("0" + new Date(this.startTime).getHours().toString()).slice(-2);
    let endTimeMinutes = ("0" + new Date(this.endTime).getMinutes().toString()).slice(-2);
    let endTimeHours = ("0" + new Date(this.endTime).getHours().toString()).slice(-2);

    let newTask = {
      date: this.taskDate.substring(0,10),  
      center: "Todo center",
      worker: this.selectedWorker,
      sT: startTimeHours + ":" + startTimeMinutes,  
      eT: endTimeHours + ":" + endTimeMinutes,
      tasks: this.getPerformedTasks(),
      obs: this.observations
    }
    
    const docRef = this.db.collection("clients").doc(this.selectedClientFirebaseId);
    docRef.collection("work").add(newTask);
    console.log("Document written with ID: ", docRef.id);
  }
}
