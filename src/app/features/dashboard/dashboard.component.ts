import { Component, OnInit } from '@angular/core';
import { Student } from 'src/shared/models/interfaces/Student';
import { DataService } from 'src/shared/services/data.service';
import { COLUMNS_TO_DISPLAY } from './dashboard.constant';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  students: Student[] = [];
  errMessage!: string;
  isLoading = true; // Bool for Mat-Spinner
  columnsToDisplay = COLUMNS_TO_DISPLAY;

  constructor(private data_service: DataService) {}

  ngOnInit(): void {
    /**
     * @description: Fetching data
     */
    this.data_service.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        console.log(this.students);
      },
      error: (err) => {
        this.errMessage = err;
        console.log(this.errMessage);
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
