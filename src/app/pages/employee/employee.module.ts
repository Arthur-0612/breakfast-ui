import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";
import { CommonModule } from "@angular/common";
import { BreadcrumbsModule } from "src/app/components/breadcrumbs/breadcrumbs.module";
import { EmployeeRoutingModule } from "./employee-routing.module";

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    EmployeeRoutingModule
  ],
  exports: [EmployeeComponent]
})
export class EmployeeModule { }