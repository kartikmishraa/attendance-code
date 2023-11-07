import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Student } from 'src/shared/models/interfaces/Student';
import { DataService } from 'src/shared/services/data.service';
import { COLUMNS_TO_DISPLAY } from './dashboard.constant';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogueComponent } from 'src/shared/components/delete-dialogue/delete-dialogue.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  students: Student[] = [];
  isLoading = true;

  // Table & Paginator Config -- Put in another file? Constant?
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource!: MatTableDataSource<Student>;
  columnsToDisplay = COLUMNS_TO_DISPLAY;
  paginatorPageSizeOptions = [5, 10];
  paginatorPageSize = 5;
  paginatorLength = 0;

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataService.isLoadingSubject.subscribe((val) => {
      this.isLoading = val;
    });

    /**
     * @description: Subscribes to the studentData$ observable and updates the UI
     *               for student data. Configures the material paginator.
     * @todo: PAGINATOR NOT WORKING!
     */
    this.dataService.studentData$.subscribe({
      next: (data) => {
        this.students = data;

        // MatTable Config
        this.paginatorLength = this.students.length;
        this.dataSource = new MatTableDataSource(this.students);
      },
    });
  }

  ngAfterViewInit(): void {
    // MatPaginator Config
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * @description: Filters the data source based on user input and resets the paginator.
   * @param event: Keyboard input
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * @description: Navigates to the edit page for the specified student ID.
   * @param id: Student ID to navigate to.
   */
  handleEdit(id: number): void {
    this.router.navigateByUrl(`edit-student/${id}`);
  }

  /**
   * @description Opens delete confirmation dialogue
   * @param id Student ID of the student to be deleted
   * @param name Name of the student to be deleted
   */
  openDeleteDialogue(id: number, name: string): void {
    this.dialog.open(DeleteDialogueComponent, {
      data: { id: id, name: name },
    });
  }
}
