import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AddStudentComponent } from './features/add-student/add-student.component';
import { MarkAttendanceComponent } from './features/mark-attendance/mark-attendance.component';

const routes: Routes = [
  { path: '', title: 'Attendance Management', component: HomeComponent },
  { path: 'dashboard', title: 'Dashboard', component: DashboardComponent },
  { path: 'addStudent', title: 'Add Student', component: AddStudentComponent },
  {
    path: 'markAttendance',
    title: 'Mark Attendance',
    component: MarkAttendanceComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
