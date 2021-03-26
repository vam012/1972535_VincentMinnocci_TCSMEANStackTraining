export class Question{
    constructor(public qNum:number,
        public question:string,
        public opt1:string,
        public opt2:string,
        public opt3:string,
        public opt4:string,
        public corrOpt:number,
        public userChoice:number){}
}