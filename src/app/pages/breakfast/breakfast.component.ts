import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Breakfast } from 'src/app/models/breakfast';
import { Employee } from 'src/app/models/employee';
import { Item } from 'src/app/models/items';
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
  selectedBreakfast: any

  dataset: any[] = []
  breakfastList: any[] = []
  employeeList: any[] = []
  itemList: any[] = []

  breakfastForm: FormGroup

  headers: string[] = ['Descrição', 'Data']

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
    this.findAll()
  }

  openModalViewBreakfast(breakfastData: any) {
    this.breakfastForm.reset()
    this.selectedBreakfast = breakfastData
    this.breakfastForm.patchValue({
      description: breakfastData.description,
      dateBreakfast: breakfastData.dateBreakfast,
      employee: breakfastData.employee.name
    })
    console.log(this.dataset)
    $('#viewBreakfastModal').modal('show')
  }

  openModalNewBreakfast() {
    $('#registerBreakfastModal').modal('show')
  }

  closeModalNewBreakfast() {
    this.breakfastForm.reset()
    $('#registerBreakfastModal').modal('hide')
    this.findAll()
  }
  closeModalViewBreakfast() {
    this.breakfastForm.reset()
    $('#viewBreakfastModal').modal('hide')
    this.findAll()
  }

  deleteItem(entry: any): void {
    const index = this.selectedItemList.indexOf(entry);
    if (index !== -1) {
      this.selectedItemList.splice(index, 1);
    }
  }
  

  itemSelected(): void {
    const employeeId: number = parseInt(this.breakfastForm.get('employee')?.value)
    const itemId: number = parseInt(this.breakfastForm.get('item')?.value)
  
    const employee: Employee | undefined = this.employeeList.find((elem: Employee) => elem.id === employeeId);
    const item: Item | undefined = this.itemList.find((elem: Item) => elem.id === itemId)
  
    if (!employee || !item) {
      this._toastService.showErrorToast(this.titlePage, 'Por favor, preencha os campos com Funcionário e Item');
      return;
    }
  
    const existingEntry = this.selectedItemList.find((entry: any) => entry.id === employeeId)
    if (existingEntry) {
      existingEntry.items.push({ id: itemId, description: item.description })
    } else {
      this.selectedItemList.push({
        id: employeeId,
        name: employee.name,
        cpf: employee.cpf,
        items: [{ id: itemId, description: item.description }]
      })
    }
    console.log(this.selectedItemList)
  
    this.breakfastForm.get('item')?.setValue("")
  }
  
  prepareSave(): void {
    if (this.breakfastForm.invalid) {
      this._toastService.showErrorToast(this.titlePage, 'Existem campos obrigatórios não preenchidos!')
      this.isError = true
      return
    }
  
    this.isError = false;
  

    this.breakfast.description = this.breakfastForm.get('description')?.value
    this.breakfast.dateBreakfast = this.breakfastForm.get('dateBreakfast')?.value
  

    let employees = this.selectedItemList.map(item => ({
      id: item.id,
      items: item.items.map((item: { id: any; }) => ({ id: item.id }))
    }))
  
    const breakfastData = {
      dateBreakfast: this.breakfast.dateBreakfast,
      descricao: this.breakfast.description,
      employee: employees
    }
  
    this.save(breakfastData)
  }
  

  prepareUpdate(breakfast: Breakfast) {
    this.breakfast = breakfast
    this.findAll()
  }

  private save(breakfastData: any): void {
    this._loadingService.show();
    this._BreakfastService.save(breakfastData).subscribe({
      next: this.handleResponseSaveOrUpdate.bind(this),
      error: this.handleError.bind(this)
    }).add(() => this._loadingService.hide());
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
    console.log(resp)
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
        break
      default:
        msg = 'Ocorreu um erro, tente novamente. Se o erro persistir entre em contato conosco.'
    }

    this._toastService.showErrorToast(this.titlePage, msg)
  }

}
