import { NewTaskComponent } from './pages/new-task/new-task.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path:'', redirectTo:'lists',pathMatch:'full'},
  {path:'lists', component:TaskViewComponent},
  {path:'lists/:listId', component:TaskViewComponent},
  {path:'new-list', component:NewListComponent},
  {path:'lists/:listId/new-task', component:NewTaskComponent},
  {path:'**', component:TaskViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
