import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteTaskDialogComponent } from '../delete-task-dialog/delete-task-dialog.component';
import { ITask } from 'src/app/interfaces/task-interface';
import { TaskListService } from 'src/app/services/task-list.service';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, MatIconModule, MatDialogModule],
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent {
  @Input() taskList!: ITask[];
  @Output() deleteTask = new EventEmitter<number>();
  public dialog = inject(MatDialog);
  private taskListService = inject(TaskListService);

  deleteTaskDialog(index: number): void {
    const dialogRef = this.dialog.open(DeleteTaskDialogComponent, {
      panelClass: ['dialog', 'modify-permissions-dialog'],
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteTask.emit(index);
      }
    });
  }

  onToggleTaskCompletion(index: number): void {
    this.taskList[index].isCompleted = !this.taskList[index].isCompleted;
    this.taskListService.saveList(this.taskList);
  }
}
