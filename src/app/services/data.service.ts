import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../interfaces/student';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // Store this in a CONSTANTS file?
  apiUrl = 'https://65390885e3b530c8d9e7ca59.mockapi.io/api/student/';

  /**
   * @description GET /api/student
   * @returns Student Data from the backend
   */
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  /**
   * @description POST /api/student
   * @param data: Student data to be be uplaoded
   * @returns Student Data that was uploaded
   */
  addOneStudent(data: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, data);
  }
}
