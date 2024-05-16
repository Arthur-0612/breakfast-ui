import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import localePT from '@angular/common/locales/pt'
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { JwtModule } from '@auth0/angular-jwt'
import { NgxMaskModule } from 'ngx-mask'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { FooterModule } from './components/footer/footer.module'
import { LoadingModule } from './components/loading/loading.module'
import { SidebarModule } from './components/sidebar/sidebar.module'
import { LoadingService } from './services/loading.service'
import { MobileService } from './services/mobile.service'
import { EmployeeService } from './services/employee.service'
import { ToastService } from './services/toast.service'
import { BreakfastService } from './services/breakfast.service';
import { ItemComponent } from './pages/item/item.component'
import { ItemService } from './services/item.service'


registerLocaleData(localePT)

export function tokenGetter() {
  return sessionStorage.getItem('localUser')
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxMaskModule.forRoot(),
    BrowserModule,
    SidebarModule,
    FooterModule,
    HttpClientModule,
    LoadingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: [],
        disallowedRoutes: []
      }
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    LoadingService,
    MobileService,
    EmployeeService,
    ToastService,
    BreakfastService,
    ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
