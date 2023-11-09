import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Attendance } from 'src/shared/models/interfaces/Attendance';
import { Student } from 'src/shared/models/interfaces/Student';
import { DataService } from 'src/shared/services/data.service';
import { STATUS_OPTIONS } from '../../constants/mark-attendance.constant';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.scss'],
})
export class MarkAttendanceComponent implements OnInit {
  students: Student[] = [];
  isLoading = true;
  statusOptions = STATUS_OPTIONS;

  // Form Group for Mark Attendance form
  markAttendanceForm = this.fb.group({
    roll: ['', Validators.required],
    date: [new Date(), Validators.required],
    status: ['', Validators.required],
  });

  constructor(private dataService: DataService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.dataService.isLoadingSubject.subscribe(
      (val) => (this.isLoading = val)
    );

    this.dataService.studentData$.subscribe((val) => {
      this.students = val;
    });
  }

  /**
   * @description Handles form submission, marks attendance for the student
   */
  handleSubmit(): void {
    if (this.markAttendanceForm.valid) {
      const dateValue = this.markAttendanceForm.controls.date!.value;
      let newAttendance: Attendance = {
        student_id: Number(this.markAttendanceForm.controls.roll!.value),
        date: dateValue ? new Date(dateValue) : new Date(),
        status: String(this.markAttendanceForm.controls.status.value),
      };

      this.dataService.markOneAttendance(newAttendance);
      this.markAttendanceForm.reset();
    } else {
      console.log('form invalid');
    }
  }
}
