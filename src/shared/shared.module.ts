import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PopupDialogueComponent } from './components/popup-dialogue/popup-dialogue.component';
import { MaterialModule } from 'src/material/material.module';

@NgModule({
  declarations: [SidebarComponent, PopupDialogueComponent],
  imports: [CommonModule, MaterialModule],
  exports: [SidebarComponent, PopupDialogueComponent],
})
export class SharedModule {}
