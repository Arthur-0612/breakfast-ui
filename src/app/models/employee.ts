export class Employee {
    id: number
    name: string
    cpf: string
    items?: Set<string>
    status: string

    constructor(id?: number, name?: string, cpf?: string, status?: string) {
        this.id = id ?? 0
        this.name = name ?? ''
        this.cpf = cpf ?? ''
        this.status = status ?? ''
    }
}