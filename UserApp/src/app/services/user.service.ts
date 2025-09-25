import { inject, Injectable, Signal, signal, WritableSignal } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from "rxjs";
import { User } from "../models/user";
import { AddUser } from "../models/add-user";

@Injectable({ 
    providedIn: "root"
})
export class UserService{
    //https://reqres.in/api-docs/
    private apiUrl = 'https://reqres.in/api';

    private headers = new HttpHeaders({ 
    'x-api-key': 'reqres-free-v1'
    });

    constructor(private http: HttpClient){}

    //http = inject(HttpClient);

    getUsers(page: number = 1): Observable<User[]>{
       return this.http 
       .get<any>(`${this.apiUrl}/users?page=${page}`, {headers: this.headers})
       .pipe(map(response => {
        let i = response;
        return response.data as User[];
    }
    ));        
    }

    addUser(addUser: AddUser): Observable<{id: number, token: string}>{
       return this.http
        .post<any>(`${this.apiUrl}/register`, addUser, {headers : this.headers})
        .pipe(map(response => {
            return {
            id: response.id,
            token: response.token}
         }));
    }
 
}