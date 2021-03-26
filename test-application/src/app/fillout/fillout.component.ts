import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Answers } from '../answer.model';
import { Question } from '../question.model';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-fillout',
  templateUrl: './fillout.component.html',
  styleUrls: ['./fillout.component.css']
})
export class FilloutComponent implements OnInit {

  
  questRef:FormGroup = new FormGroup({
    q1:new FormControl(),
    q2:new FormControl(),
    q3:new FormControl(),
    q4:new FormControl(),
    q5:new FormControl(),
    q6:new FormControl(),
    q7:new FormControl(),
    q8:new FormControl(),
    q9:new FormControl(),
    q10:new FormControl()
  })
  qArr: Array<Question> = [];
  aArr: Array<number> = [];
  constructor(public qService:QuestionService,public route:Router) { }

  ngOnInit(): void {
    this.getAnswers()
  }

  getAnswers():void {
    this.qService.getQuestionData().subscribe(data=>this.qArr=data,err=>console.log(err));
  }

  submitAnswers():void{
    let answers:Array<string> = Object.values(this.questRef.value);
    for (let i = 0; i < this.qArr.length; i++) {
      this.qArr[i].userChoice=(eval(answers[i])!=null)? eval(answers[i]): 0;
      this.aArr.push(this.qArr[i].userChoice)
    }
    this.saveAnswers()
    this.goToResults()
  }
  saveAnswers() {
    let answers = new Answers(this.aArr)
    sessionStorage.setItem('answers',JSON.stringify(answers))
  }

  goToResults():void{
    this.route.navigate(["score"])
  }

  goToHome():void{
    this.route.navigate(["home"]);
  }
  
}
