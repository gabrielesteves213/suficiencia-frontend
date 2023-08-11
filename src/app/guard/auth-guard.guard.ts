import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

    if (localStorage.getItem('user')) {
      try {
        const validToken = await this.authService.validateUserToken();
        if (!validToken) {
          localStorage.removeItem('user');
          await this.router.navigate(['/login']);
        }
        return validToken;
      } catch (e) {
        localStorage.removeItem('user');
        await this.router.navigate(['/login']);
      }

    }
    await this.router.navigate(['/login']);
    return Promise.resolve(false);

  }

}
