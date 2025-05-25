import { inject, Injectable } from '@angular/core';
import { Company, Employee } from '../model/organization.model'
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class OrganizationService {
    private http = inject(HttpClient)
    private organization: Company[] = []
    constructor() { }

    public get getOrganization(): Company[] {
        return this.organization
    }

    addCompany(companyData: Company): Observable<any> {
        this.organization.push(companyData)
        return this.http.post('https://dummyjson.com/c/9b85-ea04-46a1-9de0', { companyData })
    }

    addEmployee(employeeData: Employee, companyId: number): Observable<any> {
        this.organization[companyId].employees.push(employeeData)
        return this.http.post('https://dummyjson.com/c/9b85-ea04-46a1-9de0', { employeeData })
    }



}
