import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-todo-task',
  templateUrl: './todo-task.component.html',
  styleUrls: ['./todo-task.component.css']
})
export class TodoTaskComponent implements OnInit {

  constructor(public taskServ:TaskService) { }

  ngOnInit(): void {
  }

  addNewTask(newTask:Task):void{
    this.taskServ.addNewTask(newTask)
  }
}
