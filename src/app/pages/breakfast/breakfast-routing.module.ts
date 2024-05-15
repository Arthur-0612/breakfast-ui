import { NgModule } from "@angular/core";
import { BreakfastComponent } from "./breakfast.component";
import { RouterModule, Routes } from "@angular/router";


const routes: Routes = [
    { path: '', component: BreakfastComponent }
  ]
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class BreakfastRoutingModule { }