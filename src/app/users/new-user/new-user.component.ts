import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {Message} from "primeng/api";
import {StudentsService} from "../../services/students.service";
import {Router} from "@angular/router";
import {Student} from "../../interfaces/student";
import {UsersService} from "../../services/users.service";
import {User} from "../../interfaces/user";
import {Role} from "../../interfaces/role";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit, OnDestroy {

  public createUserForm: FormGroup = new FormGroup({});
  public ngUnsubscribe = new Subject<void>;
  public messages: Message[] = [];
  public roles: Role[] = [];
  constructor(private usersService: UsersService, private router: Router) {
  }

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      'login': new FormControl(null, Validators.required),
      'password': new FormControl(null),
      'roles': new FormControl(null)
    });
    this.roles = [
      {roleName: 'ADMIN', label: 'Administrador'},
      {roleName: "USER", label: 'Usuário'}
    ]
  }

  changeRole(event: any): void {
    if (event && event.value) {
      this.createUserForm.controls['roles'].patchValue([{roleName: event.value.roleName}])
    }
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe.next(undefined);
    this.ngUnsubscribe.complete();
  }

  onSubmit(): void {
    this.usersService.createNewUser(this.createUserForm.value as User)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.messages = [{ severity: 'success', detail: `Usuário com o id ${res.id} foi criado com sucesso` }];
          this.createUserForm.controls['login'].patchValue(null);
          this.createUserForm.controls['password'].patchValue(null);
          // setTimeout(() => {
          //   this.router.navigate(['/user/list']);
          // },1000);

        },
        error: (err) => {
          this.messages = [{ severity: 'error', detail: `Aconteceu um erro: ${err.error.message}` }];
        }
      })
  }

}
