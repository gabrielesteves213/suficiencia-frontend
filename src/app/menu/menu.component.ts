import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{

  public items: MenuItem[] = [];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Alunos',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Novo Aluno',
            url: '/student/new',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Listar Alunos',
            url: '/student/list',
            icon: 'pi pi-fw pi-user-minus'
          },
        ]
      },
      {
        label: 'Usuários',
        icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Novo Usuário',
            url: '/user/new',
            icon: 'pi pi-fw pi-user-plus'
          },
          {
            label: 'Listar Usuários',
            url: '/user/list',
            icon: 'pi pi-fw pi-user-minus'
          },
        ]
      }
    ];
  }

  checkLogIn() {
    return this.authService.checkLogin();
  }

  public logout() {
    this.authService.logout();
  }

}
