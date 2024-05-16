import { NgModule } from "@angular/core";
import { EmployeeComponent } from "./employee.component";
import { CommonModule } from "@angular/common";
import { BreadcrumbsModule } from "src/app/components/breadcrumbs/breadcrumbs.module";
import { EmployeeRoutingModule } from "./employee-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { LoadingLocalModule } from "src/app/components/loading-local/loading-local.module";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
  declarations: [EmployeeComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    LoadingLocalModule,
    NgxMaskModule
  ],
  exports: [EmployeeComponent]
})
export class EmployeeModule { }