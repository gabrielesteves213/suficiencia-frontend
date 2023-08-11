import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {StudentsService} from "../../services/students.service";
import {Message} from "primeng/api";
import {Student} from "../../interfaces/student";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-student',
  templateUrl: './new-student.component.html',
  styleUrls: ['./new-student.component.scss']
})
export class NewStudentComponent implements OnInit, OnDestroy {

  public createStudentForm: FormGroup = new FormGroup({});
  public ngUnsubscribe = new Subject<void>;
  public messages: Message[] = [];

  constructor(private studentsService: StudentsService, private router: Router) {
  }

  ngOnInit(): void {
    this.createStudentForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'phone': new FormControl(null)
    });
  }

  ngOnDestroy(): void{
    this.ngUnsubscribe.next(undefined);
    this.ngUnsubscribe.complete();
  }

  onSubmit(): void {
    this.studentsService.createNewStudent(this.createStudentForm.value as Student)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe({
        next: (res) => {
          this.messages = [{ severity: 'success', detail: `Aluno com o id ${res.id} foi criado com sucesso` }];
          this.createStudentForm.controls['name'].patchValue(null);
          this.createStudentForm.controls['phone'].patchValue(null);
          setTimeout(() => {
            this.router.navigate(['/student/list']);
          },1000);

        },
        error: (err) => {
          this.messages = [{ severity: 'error', detail: `Aconteceu um erro: ${err.error.message}` }];
        }
      })
  }

}
