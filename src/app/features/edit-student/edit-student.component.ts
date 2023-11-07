import { Component, OnInit } from '@angular/core';
import { Student } from 'src/shared/models/interfaces/Student';
import { DataService } from 'src/shared/services/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss'],
})
export class EditStudentComponent implements OnInit {
  student!: Student;
  studentId: number = 0;

  constructor(private dataService: DataService, private route: ActivatedRoute) {
    this.studentId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    /**
     * @description: Retrieves the student data by ID and assigns it to a variable.
     */
    this.dataService.getOneStudent(this.studentId).subscribe((student) => {
      this.student = student;
    });
  }
}
