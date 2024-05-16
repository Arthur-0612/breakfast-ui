import { Employee } from "./employee";

export class Breakfast {
    id: number
    description: string
    dateBreakfast: Date
    employee: Employee[]

    constructor(id?: number, description?: string, dateBreakfast?: Date, employee?: Employee[]) {
        this.id = id ?? 0
        this.description = description ?? ''
        this.dateBreakfast = dateBreakfast ?? new Date()
        this.employee = employee ?? []
    }
}