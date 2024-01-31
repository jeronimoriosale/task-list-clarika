import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ItemListComponent } from '../item-list/item-list.component';
import { TaskListService } from 'src/app/services/task-list.service';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ITask } from 'src/app/interfaces/task-interface';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        TaskListComponent,
        ItemListComponent,
        BrowserAnimationsModule,
      ],
      providers: [TaskListService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new task', () => {
    component.taskForm.get('taskName')!.setValue('Test Clarika Task');
    component.onSubmit();
    expect(component.taskList.length).toBe(1);
    expect(component.taskList[0].task).toBe('Test Clarika Task');
  });

  it('should delete a task', () => {
    component.taskList = [{ task: 'Task 1', isCompleted: false }];
    component.onDeleteTask(0);
    expect(component.taskList.length).toBe(0);
  });

  it('should retrieve tasks from service on initialization', () => {
    const taskListService = TestBed.inject(TaskListService);
    const mockTasks: ITask[] = [{ task: 'Mock Task', isCompleted: false }];
    spyOn(taskListService, 'getList').and.returnValue(of(mockTasks));

    component.ngOnInit();

    expect(component.taskList).toEqual(mockTasks);
  });
});
