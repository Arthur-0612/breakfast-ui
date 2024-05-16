import { Employee } from "./employee";

export class Breakfast {
    id: number
    description: string
    dateBreakfast: Date
    employee: Set<Employee>

    constructor(id?: number, description?: string, dateBreakfast?: Date, employee?: Set<Employee>) {
        this.id = id ?? 0
        this.description = description ?? ''
        this.dateBreakfast = dateBreakfast ?? new Date()
        this.employee = employee ?? new Set<Employee>()
    }
}