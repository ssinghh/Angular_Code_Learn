import { Component, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AddUser } from '../models/add-user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {

  constructor(private userService: UserService) { }
  // -------------------------users() Signal -------------------
  users = signal<User[]>([]);

  loadUsers() {
    this.userService.getUsers()
      .subscribe(
        data => {
          this.users.set(data);
        });
  }


 




    // -------------------------users[]  Observable -------------------
  // users: User[] = []; 
  //   loadUsers() : User[]{
  //     this.userService.getUsers()
  //     .subscribe(
  //       data => {
  //         this.users = data
  //   });
  //     return this.users;
  //   }
  // -------------------------users$ | async: Observable -------------------
  // users$!: Observable<User[]>;


  // loadUsers(): Observable<User[]> {
  //   this.users$ = this.userService.getUsers();
  //   return this.users$;
  // }
 
}
