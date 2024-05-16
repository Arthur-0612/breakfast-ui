import { RouterModule, Routes } from "@angular/router";
import { ItemComponent } from "./item.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: '', component: ItemComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }