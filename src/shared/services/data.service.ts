import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';
import { Student } from 'src/shared/models/interfaces/Student';
import {
  ATTENDANCE_ENDPOINT,
  STUDENT_ENDPOINT,
} from '../constants/api.constant';
import { Attendance } from '../models/interfaces/Attendance';
import { ToastService } from './toast.service';
import { RouterService } from './router.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private toaster: ToastService,
    private router: RouterService
  ) {}

  // For conditionally rendering MatSpinner
  public isLoadingSubject = new BehaviorSubject<boolean>(true);

  // For storing Student data
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  public studentData$: Observable<Student[]> =
    this.studentsSubject.asObservable();

  // For storing Attendance data
  private attendanceSubject = new BehaviorSubject<Attendance[]>([]);
  public attendanceData$: Observable<Attendance[]> =
    this.attendanceSubject.asObservable();

  newStudent!: Student; // validate its necessity

  /**
   * @description Fetches list of students and notifies subscribers on load.
   */
  intitalFetch(): void {
    this.isLoadingSubject.next(true);

    this.http.get<Student[]>(STUDENT_ENDPOINT).subscribe((val) => {
      this.studentsSubject.next(val);
      this.isLoadingSubject.next(false);
    });

    this.http.get<Attendance[]>(ATTENDANCE_ENDPOINT).subscribe((val) => {
      this.attendanceSubject.next(val);
    });
  }

  /**
   * @description Updates the list of students and notifies subscribers.
   */
  updateStudentsData(): void {
    this.isLoadingSubject.next(true);

    this.http.get<Student[]>(STUDENT_ENDPOINT).subscribe((val) => {
      this.studentsSubject.next(val);
      this.isLoadingSubject.next(false);
    });
  }

  /**
   * @description Updates the Attendance records and notifies subscribers.
   */
  updateAttendanceData(): void {
    this.http.get<Attendance[]>(ATTENDANCE_ENDPOINT).subscribe((val) => {
      this.attendanceSubject.next(val);
    });
  }

  /**
   * @description Adds a new student and returns the added student.
   * @param data Student object to be be uplaoded
   * @returns Student object that was uploaded
   */
  addOneStudent(data: Student): Student {
    this.isLoadingSubject.next(true);
    this.http.post<Student>(STUDENT_ENDPOINT, data).subscribe((val) => {
      this.newStudent = val;
      this.updateStudentsData();
      this.isLoadingSubject.next(false);
      this.toaster.makeToast(`${this.newStudent.name} successfully added!`);
    });

    return this.newStudent; // what to do with this?
  }

  /**
   * @description Returns a student Observable based on ID.
   * @param id Student ID
   * @returns Student object as an observable
   */
  getOneStudent(id: number): Observable<Student> {
    return this.studentData$.pipe(
      map((students) => {
        const student = students.find((student) => student.id === id);
        if (student) return student;
        else throw new Error('Student not found');
      })
    );
  }

  /**
   * @description Adds a new attendance for a student
   * @param data Attendance details to be uploaded
   */
  markOneAttendance(data: Attendance): void {
    this.isLoadingSubject.next(true);
    this.http.post<Attendance>(ATTENDANCE_ENDPOINT, data).subscribe((val) => {
      this.updateAttendanceData();
      this.isLoadingSubject.next(false);
      this.toaster.makeToast(`Roll: ${data.student_id} marked ${data.status}`);
    });
  }

  /**
   * @description Deletes a Student record by ID
   * @param id Student ID
   */
  deleteStudent(id: number): void {
    this.isLoadingSubject.next(true);
    this.http.delete(`${STUDENT_ENDPOINT}/${id}`).subscribe(() => {
      this.updateStudentsData();
      this.isLoadingSubject.next(false);
      this.toaster.makeToast(`Roll: ${id} deleted from records!`);
    });
  }

  /**
   * @description Returns Attendance records for a student
   * @param id Student ID
   * @returns Attendance Records as an observable
   */
  getAttendanceById(id: number): Observable<Attendance[]> {
    return this.attendanceData$.pipe(
      map((attendanceObj) => {
        const attendance = attendanceObj.filter(
          (attendance) => attendance.student_id == id
        );
        if (attendance) return attendance;
        else throw new Error('Attendance not found');
      })
    );
  }

  /**
   * @description Updates Student record
   * @param id STUDENT ID
   * @param data Updated Data to be sent
   */
  updateStudentById(id: number, data: Student): void {
    this.http.put(`${STUDENT_ENDPOINT}/${id}`, data).subscribe((val) => {
      this.updateStudentsData();
      this.toaster.makeToast(`Roll: ${id} successfully updated!`);
      this.router.redirectToUrl('/dashboard');
    });
  }
}
