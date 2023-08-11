import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Student} from "../interfaces/student";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  private baseUrl = 'http://localhost:8080/ProgramacaoWeb2021';

  constructor(private http: HttpClient) {
  }

  public createNewStudent(student: Student): Observable<any> {
    const userByLocalStorage = localStorage.getItem('user');
    if (userByLocalStorage) {
      const urlCreateNewStudent = `${this.baseUrl}/aluno`;
      return this.http.post(urlCreateNewStudent, student, {
        headers: {
          "Authorization": 'Bearer ' + JSON.parse(userByLocalStorage).token
        }
      });
    }
    return of(null);
  }

  public getAllStudents(page: number, pageSize: number): Observable<any> {
    const userByLocalStorage = localStorage.getItem('user');
    if (userByLocalStorage) {
      const urlGetAllStudents = `${this.baseUrl}/aluno?page=${page}&size=${pageSize}`;
      return this.http.get(`${urlGetAllStudents}`, {
        headers: {
          "Authorization": 'Bearer ' + JSON.parse(userByLocalStorage).token
        }
      })
    }
    return of([]);
  }

}
