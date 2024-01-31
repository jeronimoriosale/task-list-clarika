import { Injectable } from '@angular/core';
import { ITask } from '../interfaces/task-interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskListService {
  saveList(data: ITask[]): void {
    localStorage.setItem('taskList', JSON.stringify(data));
  }

  getList(): Observable<ITask[]> {
    return of(JSON.parse(localStorage.getItem('taskList') || '[]'));
  }
}
