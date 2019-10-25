import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,  BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    public loggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());
    public token = new BehaviorSubject(localStorage.getItem('auth_token'));

    constructor(
        private httpClient: HttpClient,
    ){

    }

    isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    private tokenAvailable(): boolean {
        return !!localStorage.getItem('auth_token');
    }
    
    getRequest(url: any) {
        return this.httpClient.get<any>(url);
    }
    login(post: any) {
        return this.httpClient.post<any>(`https://reqres.in/api/login`, post);
    }
}