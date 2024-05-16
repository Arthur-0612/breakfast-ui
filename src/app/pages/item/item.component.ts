import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Item } from 'src/app/models/items';
import { ItemService } from 'src/app/services/item.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MobileService } from 'src/app/services/mobile.service';
import { ToastService } from 'src/app/services/toast.service';

declare let $: any

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  titlePage: string = 'Item'

  item: Item = new Item()

  dataset: any[] = []
  itemList: any[] = []

  itemForm: FormGroup

  headers: string[] = ['Id', 'Descrição']

  isSearch: boolean = false
  isMobileDevice: boolean = false
  isError: boolean = false
  isLoading: boolean = false

  status: string = 'A'

  input$ = new Subject<string>()

  constructor(
    private _mobileService: MobileService,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _loadingService: LoadingService,
    private _ItemService: ItemService) {
    this.isMobileDevice = this.isMobileDevice = this._mobileService.isMobileDevice

    this.itemForm = this._formBuilder.group({
      description: ['', Validators.required]
    })
  }
  ngOnInit(): void {
    this.findAll()
  }

  closeModalNewItem() {
    this.itemForm.reset()
    $('#registerItemModal').modal('hide')
    this.findAll()
  }

  openModalNewItem() {
    $('#registerItemModal').modal('show')
  }

  prepareSave() {
    if (this.itemForm.invalid) {
      this._toastService.showErrorToast(this.titlePage, 'Existem campos obrigátorios não preenchidos !')
      this.isError = true
      return
    }
    this.isError = false
    this.item.description = this.itemForm.get('description')?.value
    this.save()
  }

  private save() {
    this._loadingService.show()
    this._ItemService.save(this.item).subscribe({
      next: this.handleResponseSaveOrUpdate.bind(this),
      error: this.handleError.bind(this)
    }).add(() => this._loadingService.hide())

  }


  findAll() {
    this.isLoading = true;

    this._ItemService.findAll().subscribe({
      next: this.handleResponseFindPage.bind(this),
      error: this.handleError.bind(this)
    }).add(() => this.isLoading = false);
  }

  private handleResponseSaveOrUpdate() {
    let msg = this.item.id ? 'Item atualizado com sucesso !' : 'Item cadastrado com sucesso !'
    this._toastService.showSuccessToast(this.titlePage, msg)

    this.item = new Item()
    this.closeModalNewItem()
    this.findAll()
  }

  private handleResponseFindPage(resp: any []) {
    this.itemList = resp
    this.dataset = this.itemList
    this.isSearch = true
  }

  isTouchAndInvalid(field: string): boolean {
    const control = this.itemForm.get(field)
    return !control ? false : control.touched && control.invalid
  }


  private handleError(error: any) {
    let msg: string = ''

    switch (error.error.code) {
      case 100:
        msg = 'Invalid Request'
        break
      case 200:
        msg = 'Item não encontrado'
        break
      case 300:
        msg = 'Cpf ou Cnpj já cadastrado'
        break
      default:
        msg = 'Ocorreu um erro, tente novamente. Se o erro persistir entre em contato conosco.'
    }

    this._toastService.showErrorToast(this.titlePage, msg)
  }


}
