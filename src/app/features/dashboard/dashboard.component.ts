import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/interfaces/student';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  students: Student[] = [];
  errMessage!: string;
  isLoading = true;
  columnsToDisplay = ['id', 'name', 'email', 'phone'];

  constructor(private data_service: DataService) {}

  ngOnInit(): void {
    this.data_service.getAllStudents().subscribe({
      next: (data) => {
        this.students = data;
        this.isLoading = false;
        console.log(this.students);
      },
      error: (err) => {
        this.errMessage = err;
        console.log(this.errMessage);
      },
    });
  }
}
