import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {LoginRequest} from "../interfaces/login-request";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {Message} from "primeng/api";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup = new FormGroup({});
  public ngUnsubscribe = new Subject<void>;
  public messages: Message[] = [];


  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'login': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe.next(undefined);
    this.ngUnsubscribe.complete();
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value as LoginRequest)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.router.navigate(['']);
        },
        error: (err) => {
          this.messages = [{ severity: 'error', detail: `Aconteceu um erro: ${err.error.message}` }];
          localStorage.removeItem('user');
        }
      });
  }

}
