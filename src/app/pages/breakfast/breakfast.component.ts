import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Breakfast } from 'src/app/models/breakfast';
import { Employee } from 'src/app/models/employee';
import { BreakfastService } from 'src/app/services/breakfast.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ItemService } from 'src/app/services/item.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MobileService } from 'src/app/services/mobile.service';
import { ToastService } from 'src/app/services/toast.service';

declare let $: any

@Component({
  selector: 'app-breakfast',
  templateUrl: './breakfast.component.html',
  styleUrls: ['./breakfast.component.scss']
})
export class BreakfastComponent implements OnInit {
  titlePage: string = 'Café da manhã'

  breakfast: Breakfast = new Breakfast()
  currentItem: any
  selectedItemList: any[] = []

  dataset: any[] = []
  breakfastList: any[] = []
  employeeList: any[] = []
  itemList: any[] = []

  breakfastForm: FormGroup

  headers: string[] = ['Nome', 'Cpf']

  isSearch: boolean = false
  isMobileDevice: boolean = false
  isError: boolean = false
  isLoading: boolean = false

  constructor(private _mobileService: MobileService,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _loadingService: LoadingService,
    private _BreakfastService: BreakfastService,
    private _EmployeeService: EmployeeService,
    private _ItemService: ItemService) {
    this.isMobileDevice = this.isMobileDevice = this._mobileService.isMobileDevice

    this.breakfastForm = this._formBuilder.group({
      description: ['', Validators.required],
      dateBreakfast: ['', Validators.required],
      employee: [''],
      item:['']
    })
  }

  ngOnInit(): void {
    this.findEmployee()
    this.findItem()
  }
  openModalDeleteBreakfast(breakfast: Breakfast) {
    this.currentItem = breakfast
    $('#deleteBreakfastModal').modal('show')
  }

  openModalNewBreakfast() {
    $('#registerBreakfastModal').modal('show')
  }

  closeModalNewBreakfast() {
    this.breakfastForm.reset()
    $('#registerBreakfastModal').modal('hide')
    this.findAll()
  }
  closeModalDeleteBreakfast() {
    $('#deleteBreakfastModal').modal('hide')
    this.findAll()
  }

  deleteItem(item: Employee) {
    const index = this.selectedItemList.indexOf(item)
    if (index !== -1) {
      this.selectedItemList.splice(index, 1)
    }
  }

  itemSelected() {

    let employeeId = this.breakfastForm.get('employee')?.value
    let itemId = this.breakfastForm.get('item')?.value

    itemId = itemId ? parseInt(itemId) : 0
    employeeId = employeeId ? parseInt(employeeId) : 0

    let employee = this.employeeList.find(elem => elem.id === employeeId)
    let item = this.itemList.find(elem => elem.id === itemId)
    
    if (!employee || !item) {
      this._toastService.showErrorToast(this.titlePage, 'Por favor, preencha os campos com Funcionário e Item')
      return
    }

    console.log(this.employeeList)
    console.log(this.itemList)

    let selectedEntry: any = {
       nome: employee.name,
       cpf: employee.cpf,
       item: item.description
    } 

    this.selectedItemList.push(selectedEntry)

    this.breakfastForm.get('item')?.setValue("")

  }
  prepareSave() {
    if (this.breakfastForm.invalid) {
      this._toastService.showErrorToast(this.titlePage, 'Existem campos obrigátorios não preenchidos !')
      this.isError = true
      return
    }


    this.isError = false
    this.breakfast.description = this.breakfastForm.get('description')?.value
    this.breakfast.dateBreakfast = this.breakfastForm.get('dateBreakfast')?.value
    employee: this.selectedItemList.map((entry: any) => ({
      id: entry.id,
      items: entry.items.map((item: any) => ({ id: item.id }))
    }))
    this.save()

  }

  prepareUpdate(breakfast: Breakfast) {
    this.breakfast = breakfast
    this.findAll()
  }

  private save() {
    this._loadingService.show()
    this._BreakfastService.save(this.breakfast).subscribe({
      next: this.handleResponseSaveOrUpdate.bind(this),
      error: this.handleError.bind(this)
    }).add(() => this._loadingService.hide())
  }

  findAll() {
    this.isLoading = true
    this._BreakfastService.findAll().subscribe({
      next: this.handleResponseFindPage.bind(this),
      error: this.handleError.bind(this)
    }).add(() => this.isLoading = false)
  }

  findEmployee() {
    this._EmployeeService.findByStatus('A').subscribe((employee: any[]) => {
      this.employeeList = employee
      this.isLoading = false
    }).add(() => this._loadingService.hide())

  }

  findItem() {
    this._ItemService.findAll().subscribe((item: any[]) => {
      this.itemList = item
      this.isLoading = false
    }).add(() => this._loadingService.hide())

  }

  private handleResponseFindPage(resp: any[]) {
    this.dataset = resp;
    this.breakfastList = this.dataset
    this.isSearch = true;
  }

  private handleResponseSaveOrUpdate() {
    let msg = this.breakfast.id ? 'Breakfast excluida com sucesso !' : 'Pontuação cadastrada com sucesso !'
    this._toastService.showSuccessToast(this.titlePage, msg)

    this.breakfast = new Breakfast()
    this.closeModalNewBreakfast()
    this.findAll()
  }

  isTouchAndInvalid(field: string): boolean {
    const control = this.breakfastForm.get(field)
    return !control ? false : control.touched && control.invalid
  }

  private handleError(error: any) {
    let msg: string = ''

    switch (error.error.code) {
      case 100:
        msg = 'Café da manhã não Encontrado'
        break
      case 200:
        msg = 'A data do café da manhã não pode ser menor que a data atual invalida'
        break
      case 300:
        msg = "Requisição"
        break
      default:
        msg = 'Ocorreu um erro, tente novamente. Se o erro persistir entre em contato conosco.'
    }

    this._toastService.showErrorToast(this.titlePage, msg)
  }

}
