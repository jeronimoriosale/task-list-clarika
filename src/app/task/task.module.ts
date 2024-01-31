import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { TaskRoutingModule } from './task-routing.module';
import { TaskListComponent } from './components/task-list/task-list.component';
import { ItemListComponent } from './components/item-list/item-list.component';

@NgModule({
  declarations: [TaskComponent],
  imports: [CommonModule, TaskRoutingModule, TaskListComponent],
})
export class TaskModule {}
