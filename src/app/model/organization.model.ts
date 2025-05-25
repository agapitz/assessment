

export interface Company {
    name: string;
    employees: Employee[]
}

export interface Employee {
    first_name: string;
    last_name: string;
    role: string;
    address: Address;
}

export interface Address {
    streetNo: number;
    address1: string;
    address2: string;
    country: 'NZ' | 'AU' | 'UK';
}

