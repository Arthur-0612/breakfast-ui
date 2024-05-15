import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoadingLocalComponent } from './loading-local.component'

@NgModule({
  declarations: [LoadingLocalComponent],
  imports: [
    CommonModule
  ],
  exports: [LoadingLocalComponent]
})
export class LoadingLocalModule { }
