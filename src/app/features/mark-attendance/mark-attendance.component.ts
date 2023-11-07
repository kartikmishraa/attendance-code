import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Attendance } from 'src/shared/models/interfaces/Attendance';
import { Student } from 'src/shared/models/interfaces/Student';
import { DataService } from 'src/shared/services/data.service';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss'],
})
export class MarkAttendanceComponent implements OnInit {
  students: Student[] = [];
  isLoading = true;

  statusOptions = ['Present', 'Absent'];
  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dataService.isLoadingSubject.subscribe(
      (val) => (this.isLoading = val)
    );

    this.dataService.studentData$.subscribe((val) => {
      this.students = val;
    });
  }

  markAttendanceForm = this.fb.group({
    id: [0, Validators.required],
    date: [new Date(), Validators.required],
    status: ['', Validators.required],
  });

  /**
   * @description:
   */
  handleSubmit(): void {
    if (this.markAttendanceForm.valid) {
      const dateValue = this.markAttendanceForm.controls.date!.value;
      let newAttendance: Attendance = {
        student_id: Number(this.markAttendanceForm.controls.id!.value),
        date: dateValue ? new Date(dateValue) : new Date(),
        status: String(this.markAttendanceForm.controls.status.value),
      };

      this.dataService.markOneAttendance(newAttendance);
    } else {
      console.log('form invalid');
    }
  }
}
