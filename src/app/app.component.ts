import { Component } from '@angular/core'
import { LoadingService } from './services/loading.service'


declare let $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Café da manhã'

  loading$ = this._loadingService.loading$

  constructor(
    private _loadingService: LoadingService) {
  }
}
