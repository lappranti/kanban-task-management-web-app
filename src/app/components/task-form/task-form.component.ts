import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { BoardModel } from 'src/app/models/Board';
import { ColumnMoel } from 'src/app/models/Column';
import { SubtaskModel } from 'src/app/models/Subtask';
import { TaskModel } from 'src/app/models/Task';
import { TaskService } from 'src/app/shared/services/task.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  theme!: string;

  taskTitle: string = '';
  description: string = '';
  selectedColumn!: any;
  subtasks!: SubtaskModel[];

  @Input() editingData!: { board: BoardModel; task: TaskModel };
  @Input() currentBoard!: BoardModel;

  columns!: ColumnMoel[];
  isEdition!: boolean;
  editingTask!: TaskModel;
  textTitle!: string;
  textBtn!: string;

  @Output() hiddeModal = new EventEmitter<boolean>();

  constructor(
    private themeService: ThemeService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe(res => {
      this.theme = res;
    });

    //Add Task
    if (this.currentBoard) {
      this.columns = this.currentBoard.columns;
      this.isEdition = false;
      this.textTitle = 'Add New Task';
      this.textBtn = 'Create Task';
      this.subtasks = [
        {
          id: UUID.UUID(),
          name: '',
          isDone: false
        },
        {
          id: UUID.UUID(),
          name: '',
          isDone: false
        }
      ];
    } //Edite Task
    else {
      this.textTitle = 'Edit Task';
      this.isEdition = true;
      this.columns = this.editingData.board.columns;
      this.editingTask = this.editingData.task;
      this.subtasks = this.editingTask.subtasks;
      this.taskTitle = this.editingTask.name;
      this.description = this.editingTask.description;
      this.selectedColumn = this.editingTask.status;
      this.textBtn = 'Save Changes';
    }
  }

  onCloseModal() {
    this.hiddeModal.emit(true);
  }

  addSubtask() {
    const newSubtask: SubtaskModel = {
      id: UUID.UUID(),
      name: '',
      isDone: false
    };

    this.subtasks.push(newSubtask);
  }

  deleteSubtask(id: string) {
    this.subtasks = this.subtasks.filter(sub => sub.id !== id);
  }

  onSubmit(formValue: any) {
    this.onCloseModal();

    if (this.isEdition) {
      console.log(this.editingTask);
      if (formValue.status !== this.editingData.task.status) {
        let indexOldColumn = this.editingData.board.columns.findIndex(
          col => col.name === this.editingData.task.status
        );
        let inddexNewColumn = this.editingData.board.columns.findIndex(
          col => col.name === formValue.status
        );
        this.editingData.board.columns[
          indexOldColumn
        ].tasks = this.editingData.board.columns[indexOldColumn].tasks.filter(
          task => task.id !== this.editingData.task.id
        );

        this.editingTask.description = formValue.description;
        this.editingTask.name = formValue.name;
        this.editingTask.status = formValue.status;
        this.editingTask.subtasks = this.subtasks;
        console.log(this.editingTask);
        this.editingData.board.columns[inddexNewColumn].tasks.push(
          this.editingTask
        );

        console.log(this.editingData.board.columns[indexOldColumn]);
        console.log(this.editingData.board.columns[inddexNewColumn]);
      } else {
        let indexColumn = this.editingData.board.columns.findIndex(
          col => col.name === this.editingData.task.status
        );

        this.editingTask.description = formValue.description;
        this.editingTask.name = formValue.name;
        this.editingTask.status = formValue.status;
        this.editingTask.subtasks = this.subtasks;
        console.log(this.editingTask);
        this.editingData.board.columns[indexColumn].tasks.forEach(task => {
          if (task.id === this.editingTask.id) task = this.editingTask;
        });
      }
      this.taskService.editeBoard(this.editingData.board).subscribe();
    } else {
      console.log('Adding task');
      console.log(formValue);

      const newTask: TaskModel = {
        id: UUID.UUID(),
        name: this.taskTitle,
        description: this.description,
        subtasks: this.subtasks,
        status: formValue.status
      };

      let indexColumn = this.currentBoard.columns.findIndex(
        col => col.name === formValue.status
      );
      this.currentBoard.columns[indexColumn].tasks.push(newTask);

      this.taskService.editeBoard(this.currentBoard).subscribe();
    }
  }
}
