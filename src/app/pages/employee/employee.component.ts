import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cpfValidator } from 'src/app/models/cpf-validator';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MobileService } from 'src/app/services/mobile.service';
import { ToastService } from 'src/app/services/toast.service';

declare let $: any

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  titlePage: string = 'Funcionário'
  
  status: string = 'A'

  employee: Employee = new Employee()
  currentItem: any

  dataset: any[] = []
  employeeList: any[] = []

  employeeForm: FormGroup

  headers: string[] = ['Nome', 'Cpf', 'Status', 'Ações']

  isSearch: boolean = false
  isMobileDevice: boolean = false
  isError: boolean = false
  isLoading: boolean = false

  constructor(private _mobileService: MobileService,
    private _formBuilder: FormBuilder,
    private _toastService: ToastService,
    private _loadingService: LoadingService,
    private _EmployeeService: EmployeeService) {
    this.isMobileDevice = this.isMobileDevice = this._mobileService.isMobileDevice

    this.employeeForm = this._formBuilder.group({
      name: ['', Validators.required],
      cpf: ['', [Validators.required, cpfValidator()]],
      status: ['']
    })
  }

  ngOnInit(): void {
  }

  openModalNewEmployee() {
    $('#registerEmployeeModal').modal('show')
  }

  closeModalNewEmployee() {
    this.employeeForm.reset()
    $('#registerEmployeeModal').modal('hide')
    this.findByStatus()
  }



  prepareSave() {
    if (this.employeeForm.invalid) {
      this._toastService.showErrorToast(this.titlePage, 'Existem campos obrigátorios não preenchidos !')
      this.isError = true
      return
    }


    this.isError = false
    this.employee.name = this.employeeForm.get('name')?.value
    this.employee.cpf = this.employeeForm.get('cpf')?.value
    this.employee.id !== 0 ? this.delete() : this.save()

  }

  prepareUpdate(employee: Employee) {
    this.employee = employee
    this.delete()
    this.findByStatus()
  }

  private save() {
    this._loadingService.show()
    this.employee.status = ('A')
    this._EmployeeService.save(this.employee).subscribe({
      next: this.handleResponseSaveOrUpdate.bind(this),
      error: this.handleError.bind(this)
    }).add(() => this._loadingService.hide())
  }

  private delete() {
    this._loadingService.show()

    this.employee.status = this.employee.status === "A" ? "I" : "A"

    this._EmployeeService.delete(this.employee).subscribe({
      next: this.handleResponseSaveOrUpdate.bind(this),
      error: this.handleError.bind(this)
    }).add(() => this._loadingService.hide())
  }

  findByStatus() {
    this.isLoading = true
    this._EmployeeService.findByStatus(this.status).subscribe({
      next: this.handleResponseFindPage.bind(this),
      error: this.handleError.bind(this)
    }).add(() => this.isLoading = false)
  }

  private handleResponseFindPage(resp: any[]) {
    this.dataset = resp;
    this.employeeList = this.dataset
    this.isSearch = true;
  }

  private handleResponseSaveOrUpdate() {
    let msg = this.employee.id ? 'Employee excluida com sucesso !' : 'Pontuação cadastrada com sucesso !'
    this._toastService.showSuccessToast(this.titlePage, msg)

    this.employee = new Employee()
    this.closeModalNewEmployee()
    this.findByStatus()
  }

  isTouchAndInvalid(field: string): boolean {
    const control = this.employeeForm.get(field)
    return !control ? false : control.touched && control.invalid
  }

  private handleError(error: any) {
    let msg: string = ''

    switch (error.error.code) {
      case 100:
        msg = 'Funcionário não Encontrado'
        break
      case 200:
        msg = 'Requisição Invalida'
        break
      case 300:
        msg = "Cpf existente na base de dados"
        break
      default:
        msg = 'Ocorreu um erro, tente novamente. Se o erro persistir entre em contato conosco.'
    }

    this._toastService.showErrorToast(this.titlePage, msg)
  }

}
