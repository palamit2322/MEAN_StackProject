
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
  preserveWhitespaces:true
})
export class NewTaskComponent implements OnInit {
listId:string;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params: Params) =>this.listId= params.listId);
  }

  ngOnInit(): void {
  }
  addTask(value:string){
  this.taskService.createTask(this.listId,value)
  .subscribe(()=>this.router.navigate(['../'],{relativeTo: this.route}));
}
}
