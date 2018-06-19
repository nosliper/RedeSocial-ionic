import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostProvider {
    apiUrl: string = "http://localhost:3000/api/posts/";

    constructor(public http: Http) {
    }

    getToken(): string {
        return localStorage.getItem("token");
    }

    addPost(text: string, likes: number = 0): Observable<any> {
        return this.http.post(this.apiUrl + "?token=" + this.getToken(),
            {
                texto: text,
                likes: likes
            }
        )
        .map(function(res: Response) {
                return res.json();
            },
            function(error) {
                console.log(error);
        });
    }

    getPosts(): Observable<any> {
        return this.http.get(this.apiUrl + "?token=" + this.getToken())
        .map(function(res: Response) {
                return res.json();
            },
            function(error) {
                console.log(error);
        });
    }

    getPostAuthor(id: string): Observable<any> {
        let url = this.apiUrl + id + "/usuario" + "?token=" + this.getToken();
        return this.http.get(url)
        .map(function(res: Response) {
                return res.json();
            },
            function(error) {
                console.log(error);
        });
    }
}
