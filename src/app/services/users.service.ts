import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../interfaces/student";
import {Observable, of} from "rxjs";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:8080/ProgramacaoWeb2021';

  constructor(private http: HttpClient) {
  }

  public createNewUser(user: User): Observable<any> {
    const userByLocalStorage = localStorage.getItem('user');
    if (userByLocalStorage) {
      const urlCreateNewStudent = `${this.baseUrl}/usuario`;
      return this.http.post(urlCreateNewStudent, user, {
        headers: {
          "Authorization": 'Bearer ' + JSON.parse(userByLocalStorage).token
        }
      });
    }
    return of(null);
  }

  public getAllUsers(page: number, pageSize: number): Observable<any> {
    const userByLocalStorage = localStorage.getItem('user');
    if (userByLocalStorage) {
      const urlGetAllStudents = `${this.baseUrl}/usuario?page=${page}&size=${pageSize}`;
      return this.http.get(`${urlGetAllStudents}`, {
        headers: {
          "Authorization": 'Bearer ' + JSON.parse(userByLocalStorage).token
        }
      })
    }
    return of([]);
  }
}
