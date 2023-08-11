import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {LoginRequest} from "../../interfaces/login-request";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/ProgramacaoWeb2021';
  constructor(private http: HttpClient, private router: Router) { }

  public login(login: LoginRequest): Observable<any> {
    const loginUrl = this.baseUrl+'/authentication/login';
    return this.http.post(loginUrl, login);
  }

  public checkLogin(): boolean {
    const user = localStorage.getItem('user');
    return !!user;
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  public validateUserToken(): Promise<any> {
    const userByLocalStorage = localStorage.getItem('user');
    if (userByLocalStorage) {
      const validateTokenUrl = this.baseUrl+'/usuario/validate';
      return this.http.get(validateTokenUrl, {
        headers: {
          "Authorization": 'Bearer ' + JSON.parse(userByLocalStorage).token
        }
      }).toPromise();
    }
    this.logout();
    return Promise.resolve(false);
  }

}
