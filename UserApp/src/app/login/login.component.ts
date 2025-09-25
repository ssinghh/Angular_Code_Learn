import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'user-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() helloMsg: string = '';
  @Output() userGreeting = new EventEmitter<String>();

  user = { username: '', password: '' };

  onSubmit(form: NgForm) {
    console.log('user login form submitted!'); 
     this.userGreeting.emit(this.user.username);
  }
}
