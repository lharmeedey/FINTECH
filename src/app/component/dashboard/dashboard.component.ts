import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/model/users';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

 


  
  usersList : Users[] = [];
  userObj : Users = {
    id: '',
    payment_ref: '',
    source_acc: '',
    source_acc_name: '',
    destination_acc: '',
    destination_acc_name: '',
    destination_bank_code: '',
    amount: '',
    trans_status: '',
    // status: false
  };
  // id = '';
  // first_name : string= '';
  // last_name : string = '';
  // email : string = '';
  // mobile : string = '';
  // status!: boolean;

    id = '';
    payment_ref: string= '';
    source_acc: string= '';
    source_acc_name: string= '';
    destination_acc: string= '';
    destination_acc_name: string= '';
    destination_bank_code: string= '';
    amount: string= '';
    trans_status: string= '';



  constructor(private auth : AuthService, private data : DataService) {}


  ngOnInit(): void {
    this.getAllStudents();
  }

  register() {
    this.auth.logOut();
  }

  resetForm() {

    this.id = '';
    this.payment_ref = '';
    this.source_acc = '';
    this.source_acc_name = '';
    this.destination_acc = '';
    this.destination_acc_name = '',
    this.destination_bank_code = '',
    this.amount = '',
    this.trans_status = ''

  }

  getAllStudents() {
     this.data.getAllUsers().subscribe(res =>{

      this.usersList = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id;
        return data;
      })
     }, err => {

      alert('Error invoking users')

     })
  }

  addUser() { 

    if(this.payment_ref == '' || this.source_acc == '' || this.source_acc_name == '' || this.destination_acc == '' || this.destination_acc_name== ''|| this.destination_bank_code == '' || this.amount == '' ){
      alert('Fill all input fields');
    }

    this.userObj.id = '';
    this.userObj.payment_ref= this.payment_ref;
    this.userObj.source_acc= this.source_acc;
    this.userObj.source_acc_name = this.source_acc_name;
    this.userObj.destination_acc= this.destination_acc;
    this.userObj.destination_acc_name = this.destination_acc_name ;
    this.userObj.destination_bank_code= this.destination_bank_code;
    this.userObj.amount= this.amount;
    this.userObj.trans_status= this.trans_status;

    this.data.addUser(this.userObj);
    this.resetForm();

  }

  updateUser() {
    


  }

  deleteUser(user : Users) {
    // this.status = !this.status;
    if(window.confirm('Are you sure you want to deactivate this account '   +user.source_acc_name+ ' ?')) {
      this.data.deleteUser(user)
    }

  }


}

