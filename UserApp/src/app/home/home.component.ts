import { Component, ViewChild, ViewContainerRef, } from '@angular/core'; 
import { LoginComponent } from '../login/login.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent { 
username: string = "";

@ViewChild('loginPageContainer', {read: ViewContainerRef, static:true})

container!:ViewContainerRef;

 loginPage(){ 
  this.container.clear();
  const containRef = this.container.createComponent(LoginComponent);
  containRef.instance.userGreeting.subscribe((name: string) => {
      this.welcomeUser(name);
    });
  containRef.instance.helloMsg = "Hi there!";
 }

 welcomeUser(name : string){
  console.log("welcome user event");
  this.username = name;
 }
}
