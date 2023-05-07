import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskModel } from 'src/app/models/Task';
import { SubtaskModel } from 'src/app//models/Subtask';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { BoardModel } from 'src/app/models/Board';
import { ColumnMoel } from 'src/app/models/Column';
import { TaskService } from 'src/app/shared/services/task.service';

@Component({
  selector: 'app-detail-task',
  templateUrl: './detail-task.component.html',
  styleUrls: ['./detail-task.component.scss']
})
export class DetailTaskComponent implements OnInit {
  theme!: string;
  @Input() data!: { board: BoardModel; task: TaskModel };
  @Output() toggleModal = new EventEmitter<boolean>();
  @Output() deleteConfirm = new EventEmitter<boolean>();
  @Output() editeConfirm = new EventEmitter<boolean>();
  showOptionMenu: boolean = false;
  isModalVisible: boolean = false;

  task!: TaskModel;
  currentStatus!: string;
  currentBoard!: BoardModel;
  columns!: ColumnMoel[];

  showModalDeliteBoard: boolean = false;

  constructor(
    private themeService: ThemeService,
    private taskServie: TaskService
  ) {}

  ngOnInit(): void {
    this.task = this.data.task;
    this.currentBoard = this.data.board;
    this.currentStatus = this.task.status;
    this.columns = this.currentBoard.columns;

    this.themeService.getCurrentTheme().subscribe(res => {
      this.theme = res;
    });
    window.addEventListener('mouseup', this.closeModalListener);
  }

  ngOnDestroy() {
    window.removeEventListener('mouseup', this.closeModalListener);
  }

  toggleOptionMenu() {
    this.showOptionMenu = !this.showOptionMenu;
  }

  closeModalListener = (event: MouseEvent) => {
    let modal = document.querySelector('.content');
    // Votre code de gestion d'événements ici
    if (event.target instanceof Node)
      if (
        event.target &&
        event.target != modal &&
        event.target.parentNode != modal &&
        event.target.parentNode?.parentNode != modal &&
        event.target.parentNode?.parentNode?.parentNode != modal &&
        event.target.parentNode?.parentNode?.parentNode?.parentNode != modal
      ) {
        this.taskServie.editeBoard(this.currentBoard).subscribe();
        this.toggleModal.emit(true);
      }
  };

  onCloseModal() {
    window.addEventListener('mouseup', this.closeModalListener);
  }

  subTaskStatus() {
    let subtasksDone = this.task.subtasks.filter(sub => sub.isDone).length;
    return `Subtasks(${subtasksDone} / ${this.task.subtasks.length})`;
  }

  changeStatusSubtask(sub: SubtaskModel) {
    let indexCurrentSub = this.task.subtasks.indexOf(sub);
    sub.isDone = !sub.isDone;
    this.task.subtasks[indexCurrentSub] = sub;
  }

  deleteTask() {
    this.deleteConfirm.emit(true);
  }

  editeTask() {
    this.editeConfirm.emit(true);
  }
}
