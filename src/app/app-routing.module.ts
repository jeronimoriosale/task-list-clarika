import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  {
    path: 'task-list',
    loadChildren: () => import('./task/task.module').then((m) => m.TaskModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
