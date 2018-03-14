import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ClientInfoPage } from '../pages/client/client-info/client-info';
import { ClientListPage } from '../pages/client/client-list/client-list';
import { TaskFormPage } from '../pages/tasks/task-form/task-form';
import { SignaturePadModule } from 'angular2-signaturepad';
import { TaskListPage } from '../pages/tasks/task-list/task-list';
import { TaskInfoPage } from '../pages/tasks/task-info/task-info';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ClientListPage,
    ClientInfoPage,
    TaskListPage,
    TaskFormPage,
    TaskInfoPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    ClientListPage,
    ClientInfoPage,
    TaskListPage,
    TaskFormPage,
    TaskInfoPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
