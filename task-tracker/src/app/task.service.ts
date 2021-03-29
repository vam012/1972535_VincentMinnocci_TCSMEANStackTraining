import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(public http:HttpClient) { }

  addNewTask(taskInfo:Task):void{
    this.http.post("http://localhost:3000/tasks",taskInfo).subscribe(()=>{},err=>console.log(err));
  }

  getTaskList():Observable<Task[]>{
    return this.http.get<Task[]>("http://localhost:3000/tasks");
  }
}
