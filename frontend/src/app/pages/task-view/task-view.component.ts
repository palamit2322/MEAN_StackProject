import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { ActivatedRoute, Router, Params } from '@angular/router';
@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  lists: List[] = [];
  tasks: Task[] = [];
  listId:string;
  weaterData:any=[];
  constructor(private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
   
  }

  ngOnInit() {
    this.taskService.getLists()
      .subscribe((lists: List[]) => this.lists = lists);
    this.route.params.subscribe((params: Params) => {
      this.listId = params.listId;
      if (!this.listId) return;

      this.taskService.getTasks(this.listId).subscribe((tasks: Task[]) => this.tasks = tasks);
    });
     
    this.getTemp();
  }

  noTaskClick(task:Task){
    this.taskService.setComplete(this.listId,task).subscribe(()=>task.completed=!task.completed);
  }

  deleteTask(task:Task){
    this.taskService.deleteTask(this.listId,task._id)
    .subscribe((task:Task)=>this.tasks=this.tasks.filter(t=>t._id!=task._id));
  }

  deleteList(list:List){
    this.taskService.deleteList(list._id)
    .subscribe(()=>this.lists=this.lists.filter(l=>l._id!=list._id));
  }

  addTaskClick(){
    if(!this.listId){
      alert("Please Select a List to Add Tasks");
      return;
    }
    this.router.navigate(['./new-task'], {relativeTo:this.route});
  }

  addList(value: string) {
    this.taskService.createList(value)
      .subscribe((list: List) => {
        this.router.navigate(['/lists', list._id]);
        location.reload();
      });
  }
  getTemp(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&APPID=ccd4974791ef3df873ce15bee84a47cc")
    .then((data)=>{
      return data.json();
    })
    .then((data1)=>{
      console.log(data1);
      this.weaterData=data1;
    })
  }
}
