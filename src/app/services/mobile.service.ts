import { Injectable } from '@angular/core'

@Injectable()
export class MobileService {

  isMobileDevice: boolean = false
  isTabletDevice: boolean = false

  constructor() {
    this.isMobileDevice = window.innerWidth <= 767
    this.isTabletDevice = window.innerWidth > 767 && window.innerWidth <= 1024
  }
}
