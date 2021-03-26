import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable()
export class myAuthGaurd implements CanActivate{
    canActivate(): boolean {
        if(sessionStorage.getItem("answers")==null){
            return false;
        }else{
            return true
        }
    }
}