import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ItemListComponent } from '../item-list/item-list.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ITask } from 'src/app/interfaces/task-interface';
import { TaskListService } from 'src/app/services/task-list.service';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ItemListComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent {
  taskList: ITask[] = [];
  private fb = inject(FormBuilder);
  taskForm: FormGroup;
  private taskListService = inject(TaskListService);

  constructor() {
    this.taskForm = this.fb.group({
      taskName: [''],
    });
  }

  ngOnInit() {
    this.taskListService.getList().subscribe((list) => {
      this.taskList = list;
    });
  }

  onSubmit() {
    const newTask: ITask = {
      task: this.taskForm.get('taskName')!.value,
      isCompleted: false,
    };
    this.taskList.push(newTask);
    this.taskListService.saveList(this.taskList);
    this.taskForm.reset();
    this.taskForm.patchValue({
      taskName: '',
    });
  }

  onDeleteTask(index: number): void {
    this.taskList = this.taskList.filter((_, i) => i !== index);
    this.taskListService.saveList(this.taskList);
  }
}
