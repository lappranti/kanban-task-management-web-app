import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { BoardModel } from 'src/app/models/Board';
import { ColumnMoel } from 'src/app/models/Column';
import { TaskService } from 'src/app/shared/services/task.service';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss']
})
export class BoardFormComponent implements OnInit {
  @Input() editingBoard!: BoardModel | undefined;
  @Output() hiddeModal = new EventEmitter<boolean>();
  theme!: string;
  boardName: string = '';
  columns!: ColumnMoel[];

  formTitle!: string;
  btnSubmitText!: string;

  constructor(
    private themeService: ThemeService,
    private taskService: TaskService
  ) {}
  ngOnInit(): void {
    if (this.editingBoard) {
      this.formTitle = 'Edit Board';

      this.btnSubmitText = 'Save Changes';
      this.boardName = this.editingBoard.name;
      this.columns = this.editingBoard.columns;
    } else {
      this.formTitle = 'Add New Board';
      this.btnSubmitText = 'Create New Board';
      this.columns = [
        {
          id: UUID.UUID(),
          name: 'todo',
          tasks: []
        },
        {
          id: UUID.UUID(),
          name: 'Doing',
          tasks: []
        }
      ];
    }
    this.themeService.getCurrentTheme().subscribe(res => {
      this.theme = res;
    });
  }

  onCloseModal() {
    this.hiddeModal.emit(true);
  }

  removeColumn(id: string) {
    this.columns = this.columns.filter(col => col.id != id);
  }

  addColumn() {
    this.columns.push({ id: UUID.UUID(), name: '', tasks: [] });
  }

  onSubmit(formData: any) {
    this.onCloseModal();
    if (this.editingBoard) {
      this.editingBoard.name = this.toTitleCase(this.boardName);
      this.editingBoard.columns = this.columns;
      this.taskService.editeBoard(this.editingBoard).subscribe();
    } else {
      let newBoard: BoardModel = {
        isActive: false,
        id: UUID.UUID(),
        name: this.toTitleCase(this.boardName),
        columns: [...this.columns]
      };
      this.taskService.addBoard(newBoard).subscribe();
    }
  }

  toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}
