import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Company, Employee } from './model/organization.model'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganizationService } from './service/organization.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  providers: [

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  organization: Company[] = []
  companyName: string = ''
  companyId: number = 0
  employeeData: Employee = {
    first_name: "",
    last_name: "",
    role: "",
    address: {
      streetNo: 0,
      address1: "",
      address2: "",
      country: 'NZ'
    }
  }
  constructor(private orgService: OrganizationService) {

  }

  ngOnInit() {
    this.organization = this.orgService.getOrganization
  }

  addCompany() {
    const body: Company = {
      name: this.companyName,
      employees: []
    }
    this.orgService.addCompany(body).subscribe()
    this.clearFields()
  }

  addEmployee() {
    this.orgService.addEmployee(this.employeeData, this.companyId).subscribe()
    this.clearFields()
  }


  clearFields() {
    this.companyName = ''
    this.employeeData = {
      first_name: "",
      last_name: "",
      role: "",
      address: {
        streetNo: 0,
        address1: "",
        address2: "",
        country: 'NZ'
      }
    }
  }


}

