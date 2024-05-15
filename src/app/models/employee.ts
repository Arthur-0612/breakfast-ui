export class Employee {
    id: number;
    name: string;
    cpf: string;
    items: Set<string>;

    constructor(id?: number, name?: string, cpf?: string, items?: Set<string>) {
        this.id = id ?? 0;
        this.name = name ?? '';
        this.cpf = cpf ?? '';
        this.items = items ?? new Set<string>();
    }
}