import { Component, OnInit } from '@angular/core'


declare let $: any

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  localUser: any


  ngOnInit() {
    $(() => {
      $('[data-widget="treeview"]').Treeview('init')

      const url = window.location

      $('ul.nav-sidebar a').filter(function(this: HTMLAnchorElement) {
        return $(this).attr('id') === url.pathname.substring(1)
      }).addClass('active')

      $('ul.nav-treeview a').filter(function(this: HTMLAnchorElement) {
        return $(this).attr('id') === url.pathname.substring(1)
      }).parentsUntil('.nav-sidebar > .nav-treeview').addClass('menu-open').prev('a').addClass('active')

      $('ul.nav-sidebar a').on('click', function(event: any) {
        if (event.currentTarget.id !== 'menuRegister' && event.currentTarget.id !== 'menuOrderService') {
          $('ul.nav-sidebar a').removeClass('active')
          $(event.currentTarget).parentsUntil('.nav-sidebar', 'li').children('a').addClass('active')
        }
      })

      $('.nav-link').on('click', function() {
        if ($('body').hasClass('sidebar-open')) {
          $('body').removeClass('sidebar-open').addClass('sidebar-closed sidebar-collapse')
        }
      })
    })

    $(document).ready(function () {
      let canalLogo = $('.brand-link img.brand-image')
      canalLogo.addClass('d-none')
  
      $('a[data-widget="pushmenu"]').on('click', function () {
        toggleLogoVisibility()
      })
  
      function toggleLogoVisibility() {
        let isMenuCollapsed = $('body').hasClass('sidebar-collapse');
        canalLogo = $('.brand-link img.brand-image')
        
        if (!isMenuCollapsed) {
          canalLogo.removeClass('d-none')
        } else {
          canalLogo.addClass('d-none')
        }
      }
    })
  }
}
