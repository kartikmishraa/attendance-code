import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DeleteDialogueComponent } from './components/delete-dialogue/delete-dialogue.component';
import { MaterialModule } from 'src/material/material.module';

@NgModule({
  declarations: [SidebarComponent, DeleteDialogueComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SidebarComponent, DeleteDialogueComponent],
})
export class SharedModule {}
