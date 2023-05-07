import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { BoardModel } from 'src/app/models/Board';
import { ColumnMoel } from 'src/app/models/Column';
import { TaskModel } from 'src/app/models/Task';
import { TaskService } from 'src/app/shared/services/task.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss']
})
export class ColumnFormComponent implements OnInit {
  @Output() hiddeModal = new EventEmitter<boolean>();
  @Input() currentBoard!: BoardModel;
  theme!: string;
  columnName: string = '';
  tasks: TaskModel[] = [
    {
      id: UUID.UUID(),
      name: 'Task1',
      status: this.columnName,
      description: '',
      subtasks: []
    },
    {
      id: UUID.UUID(),
      name: 'Task2',
      status: this.columnName,
      description: '',
      subtasks: []
    }
  ];
  constructor(
    private themeService: ThemeService,
    private taskService: TaskService
  ) {}
  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe(res => {
      this.theme = res;
    });
  }

  onCloseModal() {
    this.hiddeModal.emit(true);
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter(task => task.id != id);
  }

  addTask() {
    this.tasks.push({
      id: UUID.UUID(),
      name: '',
      status: this.columnName,
      description: '',
      subtasks: []
    });
  }

  onSubmit(formValue: any) {
    this.onCloseModal();
    //On verifie que le column n'existe pas dans le board
    if (
      this.currentBoard.columns.find(col => col.name === this.columnName) ==
      undefined
    ) {
      if (this.tasks) {
        this.tasks.forEach(task => {
          task.status = this.columnName.toLocaleLowerCase();
        });
      }
      let newColumn: ColumnMoel = {
        id: UUID.UUID(),
        name: this.columnName.toLocaleLowerCase(),
        tasks: this.tasks
      };
      this.currentBoard.columns.push(newColumn);
      this.taskService.editeBoard(this.currentBoard).subscribe();
    }
  }
}
