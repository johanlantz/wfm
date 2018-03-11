import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { ClientInfoPage } from '../client-info/client-info';

@IonicPage()
@Component({
  selector: 'page-client-list',
  templateUrl: 'client-list.html',
})
export class ClientListPage {

  private db: any;
  clients: Array<Object>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.db = firebase.firestore();
    this.clients = new Array();
  }

  ionViewWillEnter() {
    this.getClients();
  }

  async getClients() {
    const querySnapshot = await this.db.collection("clients").get();
    this.clients = querySnapshot.docs.map(doc => {
      return { firebaseId: doc.id, ...doc.data() }
    });
  }

  addClient() {
    this.navCtrl.push(ClientInfoPage);
  }

  editClient(client) {
    console.log(client);
    this.navCtrl.push(ClientInfoPage, {clientToUpdate: client});
  }
}
