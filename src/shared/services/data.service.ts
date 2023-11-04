import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Student } from 'src/shared/models/interfaces/Student';
import { STUDENT_ENDPOINT } from '../constants/api.constant';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  public isLoadingSubject = new BehaviorSubject<boolean>(true);
  private studentsSubject = new BehaviorSubject<Student[]>([]);
  public data$: Observable<Student[]> = this.studentsSubject.asObservable();

  newStudent!: Student;

  intitalFetch(): void {
    console.log('Initial fetch called');
    this.isLoadingSubject.next(true);
    this.http.get<Student[]>(STUDENT_ENDPOINT).subscribe((val) => {
      this.studentsSubject.next(val);
      this.isLoadingSubject.next(false);
    });
  }

  updateStudentsData(): void {
    this.isLoadingSubject.next(true);
    this.http.get<Student[]>(STUDENT_ENDPOINT).subscribe((val) => {
      this.studentsSubject.next(val);
      this.isLoadingSubject.next(false);
    });
    console.log('updated student details');
  }

  /**
   * @description POST /api/student
   * @param data: Student data to be be uplaoded
   * @returns Student Data that was uploaded
   */
  addOneStudent(data: Student): Student {
    this.isLoadingSubject.next(true);
    this.http.post<Student>(STUDENT_ENDPOINT, data).subscribe((val) => {
      this.newStudent = val;
      this.updateStudentsData();
    });

    return this.newStudent;
  }
}
