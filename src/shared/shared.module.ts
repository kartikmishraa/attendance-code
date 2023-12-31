import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DeleteDialogueComponent } from './components/delete-dialogue/delete-dialogue.component';
import { MaterialModule } from 'src/material/material.module';
import { AttendanceDialogueComponent } from './components/attendance-dialogue/attendance-dialogue.component';
import { NumberOnlyDirective } from './directives/number-only.directive';

@NgModule({
  declarations: [
    SidebarComponent,
    DeleteDialogueComponent,
    AttendanceDialogueComponent,
    NumberOnlyDirective,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    SidebarComponent,
    DeleteDialogueComponent,
    AttendanceDialogueComponent,
    NumberOnlyDirective,
  ],
})
export class SharedModule {}
