import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HomeComponent } from './home.component'
import { HomeRoutingModule } from './home-routing.module'
import { BreadcrumbsModule } from 'src/app/components/breadcrumbs/breadcrumbs.module'

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    HomeRoutingModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }