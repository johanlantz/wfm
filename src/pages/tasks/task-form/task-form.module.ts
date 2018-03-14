import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskFormPage } from './task-form';

@NgModule({
  declarations: [
    TaskFormPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskFormPage),
  ],
})
export class TaskFormPageModule {}
