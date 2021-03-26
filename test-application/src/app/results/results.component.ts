import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  qArr: Array<Question> = [];
  aArr: Array<number> = [];
  finalScore:number = 0;
  constructor(public qService:QuestionService,public route:Router) { }

  ngOnInit(): void {
    this.getQuestions();
    this.getAnswers();
  }

  getFinalScore() {
    console.log(this.qArr)
    console.log(this.aArr)
    for (let i = 0; i < this.aArr.length; i++) {
      if(this.aArr[i] == this.qArr[i].corrOpt){
        this.finalScore++;
      }
    }
  }
  getAnswers() {
    let hold = <string>sessionStorage.getItem('answers')
    this.aArr = JSON.parse(hold).answers;
  }

  getQuestions():void {
    this.qService.getQuestionData().subscribe(data=>this.qArr=data,err=>console.log(err),()=>this.getFinalScore());
  }

  goToHome():void{
    sessionStorage.clear();
    this.route.navigate(["home"]);
  }
  
}
