import { BreadcrumbsModule } from "src/app/components/breadcrumbs/breadcrumbs.module";
import { BreakfastComponent } from "./breakfast.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BreakfastRoutingModule } from "./breakfast-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { LoadingLocalModule } from "src/app/components/loading-local/loading-local.module";

@NgModule({
  declarations: [BreakfastComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    BreakfastRoutingModule,
    ReactiveFormsModule,
    LoadingLocalModule,
    NgxMaskModule
  ],
  exports: [BreakfastComponent]
})
export class BreakfastModule { }