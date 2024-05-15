import { Injectable } from '@angular/core'

declare let $: any

@Injectable()
export class ToastService {
  showSuccessToast(title: string, message: string) {
    this.showToast('bg-success custom-toast', title, message, 'fas fa-check-circle fa-lg')
  }

  showInfoToast(title: string, message: string) {
    this.showToast('bg-info custom-toast', title, message, 'fas fa-info-circle fa-lg')
  }

  showWarningToast(title: string, message: string) {
    this.showToast('bg-warning custom-toast', title, message, 'fas fa-exclamation-triangle fa-lg')
  }

  showErrorToast(title: string, message: string) {
    this.showToast('bg-danger custom-toast', title, message, 'fas fa-times-circle fa-lg')
  }

  private showToast(toastClass: string, title: string, message: string, icon: string) {
    $(document).Toasts('create', {
      class: toastClass,
      title: title,
      autohide: true,
      delay: 4000,
      body: message,
      icon: icon,
    })
  }
}
