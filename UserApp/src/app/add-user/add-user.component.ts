import { Component, OnDestroy, OnInit, Signal } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AddUser } from '../models/add-user';
import { of, Subscription } from 'rxjs';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  id?: number;
  token?: string;
  errorMessage?:string;
  private subs: Subscription | undefined ;

  userForm = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  private addUser!: AddUser ;

  constructor(private service: UserService) { }

  ngOnInit(): void {
    console.log("add user");
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe;
  }
   
  onSubmit() {
    console.log("submit user");
    if (this.userForm.valid) {
      this.addUser = {
        name: this.userForm.value.name || '',
        password: this.userForm.get('password')?.value || '',
        email: this.userForm.get('email')?.value || '',
      };

      this.subs = this.service.addUser(this.addUser)
        .subscribe({
          next: (res) => { 
            this.id = res.id;
            this.token = res.token;
            console.log("user registered with id ", this.id);
          },
          error: (err ) => { 
            if (err.error && err.error.error) {
            this.errorMessage = err.error.error; }
            console.log("error", err.error) },
          complete: () => { 
            console.log("register complete") }
        }); 
    }
 
  }

closeError() {
  this.errorMessage = undefined;
}

}
