import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserProvider {
    
    apiUrl: string = "http://localhost:3000/api/usuarios";

    constructor(public http: Http) {
    }

    hasToken(): boolean {
        return localStorage.getItem("token") && true;
    }

    getToken(): string {
        return localStorage.getItem("token");
    }

    removeToken(): void {
        localStorage.removeItem("token");
    }

    addUser(nome: string, email: string, password: string): Observable<any> {
        return this.http.post(this.apiUrl,
            {
                nome: nome,
                email: email,
                senha: password
            }
        )
        .map(function(res: Response) {
                return res.json();
            },
            function(error) {
                console.log(error);
        });
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(this.apiUrl + "/signin", 
            {
                email: email,
                senha: password
            }
        )
        .map(function(res: Response) {
                let token = res.json().token;
                localStorage.setItem("token", token);
                return res.json();
            },
            function(error) {
                console.log(error);
            });
    }

    logout(): boolean {
        this.removeToken();
        return this.hasToken();
    }
}
