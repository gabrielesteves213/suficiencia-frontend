import {Component, OnInit} from '@angular/core';
import {Student} from "../../interfaces/student";
import {StudentsService} from "../../services/students.service";

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.scss']
})
export class ListStudentComponent {

  public studentsList: Student[] = [];
  public pageSize = 0;
  public totalRecods = 0;
  public loader = false;

  constructor(private studentsService: StudentsService) {}

  public getAllStudents(event?: any) {
    this.loader = true;
    const pageSize = event ? event.rows : 10;
    this.pageSize = pageSize;
    const page = event ? event.first / pageSize : 0;
    this.studentsService.getAllStudents(page, pageSize)
      .subscribe({
        next: (res) => {
          this.studentsList = res.content;
          this.totalRecods = res.totalElements;
          this.loader = false;
          console.log(this.studentsList);
        }
      })
  }

}
