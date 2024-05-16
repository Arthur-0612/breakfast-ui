import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadcrumbsModule } from "src/app/components/breadcrumbs/breadcrumbs.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoadingLocalModule } from "src/app/components/loading-local/loading-local.module";
import { NgxMaskModule } from "ngx-mask";
import { ItemComponent } from "./item.component";
import { ItemRoutingModule } from "./item-routing.module";

@NgModule({
  declarations: [ItemComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    FormsModule,
    ItemRoutingModule,
    ReactiveFormsModule,
    LoadingLocalModule,
    NgxMaskModule
  ],
  exports: [ItemComponent]
})
export class ItemModule { }