import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { BoardComponent } from './components/board/board.component';
import { ColumnFormComponent } from './components/column-form/column-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailTaskComponent } from './components/detail-task/detail-task.component';
import { DeleteThingComponent } from './components/delete-thing/delete-thing.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    BoardFormComponent,
    TaskFormComponent,
    BoardComponent,
    ColumnFormComponent,
    DetailTaskComponent,
    DeleteThingComponent
  ],
  imports: [BrowserModule, ReactiveFormsModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
