import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ClientListPage } from '../client/client-list/client-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  showClients() {
    this.navCtrl.push(ClientListPage)
  }
}
