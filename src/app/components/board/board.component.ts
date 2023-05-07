import { Component, Input, OnInit } from '@angular/core';
import { BoardModel } from 'src/app/models/Board';
import { TaskModel } from 'src/app/models/Task';
import { TaskService } from 'src/app/shared/services/task.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  @Input() board!: BoardModel;
  theme!: string;
  showModalAddColumn: boolean = false;
  showTaskDetail: boolean = false;
  currentSelectedTask!: TaskModel | undefined;

  showModaleConfirmationDelete: boolean = false;
  showModaleEditeTask: boolean = false;

  constructor(
    private themeService: ThemeService,
    private taskService: TaskService
  ) {}
  ngOnInit(): void {
    this.themeService.getCurrentTheme().subscribe(res => {
      this.theme = res;
    });
  }

  generateColor(num: number) {
    if (num === 0) {
      return '#49C4E5';
    } else if (num === 1) {
      return '#8471F2';
    } else if (num === 2) {
      return '#67E2AE';
    } else if (num === 3) {
      return '#FFA07A';
    } else if (num === 4) {
      return '#00FF7F';
    } else if (num === 5) {
      return '#FFC0CB';
    } else if (num === 6) {
      return '#D2691E';
    } else if (num === 7) {
      return '#FFFF00';
    } else if (num === 8) {
      return '#800000';
    } else if (num === 9) {
      return '#7FFFD4';
    } else {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
  }

  generateSubtaskStatus(task: TaskModel) {
    let done = 0;
    task.subtasks.forEach(sub => {
      sub.isDone ? done++ : '';
    });

    return `${done} of ${task.subtasks.length} substasks`;
  }

  toggleHandleModalAddColumn() {
    this.showModalAddColumn = !this.showModalAddColumn;
  }

  selectedTask(task?: TaskModel) {
    this.showTaskDetail = !this.showTaskDetail;
    this.currentSelectedTask = task;
  }

  deleteSelectedTask(confirm?: boolean) {
    this.showTaskDetail = false;
    this.showModaleConfirmationDelete = !this.showModaleConfirmationDelete;
    if (confirm && this.currentSelectedTask) {
      let column = this.board.columns.find(
        col => col.name === this.currentSelectedTask?.status
      );
      if (column) {
        const indexColumn = this.board.columns.indexOf(column);
        console.log(indexColumn);

        column.tasks = column.tasks.filter(
          task => task.id !== this.currentSelectedTask?.id
        );
        console.log(column.tasks);

        this.board.columns[indexColumn] = column;
        console.table(this.board.columns[indexColumn]);
        this.taskService.editeBoard(this.board).subscribe();
      }
    }
  }

  editeSelectedTask(confirm?: boolean) {
    this.showTaskDetail = false;
    this.showModaleEditeTask = !this.showModaleEditeTask;
  }

  closeEditeTaskModal() {
    this.showModaleEditeTask = false;
  }
}
