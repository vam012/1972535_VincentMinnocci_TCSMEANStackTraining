import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  taskArr:Array<Task>=new Array();
  displayedColumns: string[] = ['id', 'aName', 'tName', 'deadLine'];
  constructor(public taskServ:TaskService) { }

  ngOnInit(): void {
    this.getTaskList();
  }

  getTaskList():void{
    this.taskServ.getTaskList().subscribe(data=>this.taskArr=data,err=>console.log(err));
  }

}
