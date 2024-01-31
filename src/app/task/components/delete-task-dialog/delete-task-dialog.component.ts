import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-delete-task-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './delete-task-dialog.component.html',
  styleUrls: ['./delete-task-dialog.component.scss'],
})
export class DeleteTaskDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteTaskDialogComponent>
  ) {}

  deleteTask(): void {
    this.dialogRef.close(true);
  }
}
