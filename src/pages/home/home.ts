import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClientListPage } from '../client/client-list/client-list';
import { TaskFormPage } from '../tasks/task-form/task-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  showClients() {
    this.navCtrl.push(ClientListPage);
  }

  showForm() {
    this.navCtrl.push(TaskFormPage);
  }
}
