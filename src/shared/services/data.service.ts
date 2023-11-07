import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Student } from 'src/shared/models/interfaces/Student';
import {
  ATTENDANCE_ENDPOINT,
  STUDENT_ENDPOINT,
} from '../constants/api.constant';
import { Attendance } from '../models/interfaces/Attendance';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public isLoadingSubject = new BehaviorSubject<boolean>(true);
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  public studentData$: Observable<Student[]> =
    this.studentsSubject.asObservable();

  newStudent!: Student; // validate its necessity

  /**
   * @description: Fetches list of students and notifies subscribers on load.
   */
  intitalFetch(): void {
    this.isLoadingSubject.next(true);

    this.http.get<Student[]>(STUDENT_ENDPOINT).subscribe((val) => {
      this.studentsSubject.next(val);
      this.isLoadingSubject.next(false);
    });
  }

  /**
   * @description: Updates the list of students and notifies subscribers.
   */
  updateStudentsData(): void {
    this.isLoadingSubject.next(true);

    this.http.get<Student[]>(STUDENT_ENDPOINT).subscribe((val) => {
      this.studentsSubject.next(val);
      this.isLoadingSubject.next(false);
    });

    console.log('updated student details'); // for debug
  }

  /**
   * @description: Adds a new student and returns the added student.
   * @param data: Student object to be be uplaoded
   * @returns Student object that was uploaded
   */
  addOneStudent(data: Student): Student {
    this.isLoadingSubject.next(true);
    this.http.post<Student>(STUDENT_ENDPOINT, data).subscribe((val) => {
      this.newStudent = val;
      this.updateStudentsData();
    });

    return this.newStudent; // what to do with this?
  }

  /**
   * @description: Returns a student Observable based on ID.
   * @param id: Student ID to find and return the student
   * @returns: Student object as an observable
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
   * @description: Adds a new attendance for a student
   * @param data: Attendance details to be uploaded
   */
  markOneAttendance(data: Attendance): void {
    this.isLoadingSubject.next(true);
    this.http.post<Attendance>(ATTENDANCE_ENDPOINT, data).subscribe((val) => {
      this.isLoadingSubject.next(false);
      console.log('Attendance marked');
    });
  }

  deleteStudent(id: number): void {
    this.isLoadingSubject.next(true);
    this.http.delete(`${STUDENT_ENDPOINT}/${id}`).subscribe(() => {
      this.updateStudentsData();
      this.isLoadingSubject.next(false);
      console.log('item deleted with id: ', id);
    });
  }
}
