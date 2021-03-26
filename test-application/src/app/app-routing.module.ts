import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilloutComponent } from './fillout/fillout.component';
import { HomeComponent } from './home/home.component';
import { myAuthGaurd } from './myauthgaurd';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {path:"\questionnaire",component:FilloutComponent},
  {path:"\score",component:ResultsComponent,canActivate:[myAuthGaurd]},
  {path:"\home",component:HomeComponent},
  {path:"",redirectTo:"\home",pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
