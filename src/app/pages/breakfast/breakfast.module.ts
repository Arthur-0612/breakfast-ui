import { BreadcrumbsModule } from "src/app/components/breadcrumbs/breadcrumbs.module";
import { BreakfastComponent } from "./breakfast.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BreakfastRoutingModule } from "./breakfast-routing.module";

@NgModule({
  declarations: [BreakfastComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    BreakfastRoutingModule
  ],
  exports: [BreakfastComponent]
})
export class BreakfastModule { }