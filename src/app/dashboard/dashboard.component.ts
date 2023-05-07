import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../shared/services/theme.service';
import { TaskService } from '../shared/services/task.service';
import { BoardModel } from '../models/Board';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  theme!: string;
  showMenuEditeBoard: boolean = false;
  sideBar: boolean = true;
  showModalFormBoard: boolean = false;
  showModalDeliteBoard: boolean = false;
  showModalFormTask: boolean = false;

  data!: BoardModel[];
  currentBoard!: BoardModel;

  actionTypeFormBoard: string = '';

  constructor(
    private themeService: ThemeService,
    private taskService: TaskService
  ) {}
  ngOnInit(): void {
    //Initialization theme and storadge
    this.themeService.getCurrentTheme().subscribe(res => {
      this.theme = res;
    });
    this.initialisationLocalStoradge();
  }

  peuplateApp() {
    localStorage.removeItem('boardStoradge');
    this.initialisationLocalStoradge();
  }

  initialisationLocalStoradge() {
    this.taskService.initilizationStoradge().subscribe(res => {
      this.data = res;
      let index = this.data.indexOf(this.data.find(b => b.isActive)!);
      this.selectBoard(this.data[index]);
    });
  }

  toggleTheme(position?: string) {
    if (position == 'left') {
      this.theme = 'light';
      this.themeService.setTheme(this.theme);
      return;
    } else if (position == 'right') {
      this.theme = 'dark';
      this.themeService.setTheme(this.theme);
      return;
    } else {
      this.theme = this.theme == 'light' ? 'dark' : 'light';
      this.themeService.setTheme(this.theme);
    }
  }

  selectBoard(board: BoardModel) {
    if (board) {
      let selectedBoard = document.getElementById(board.id);
      if (selectedBoard?.classList.contains('active')) {
        return;
      } else {
        let currentActivedBoard = document.querySelector('.active');
        currentActivedBoard?.classList.remove('active');
        selectedBoard?.classList.add('active');
        this.currentBoard = board;
        this.data.forEach(board => {
          board.isActive = false;
        });
        this.currentBoard.isActive = true;
      }
    }
  }

  toggleMenuEditBoard() {
    this.showMenuEditeBoard = !this.showMenuEditeBoard;
  }

  toggleSideBar() {
    this.sideBar = !this.sideBar;
  }

  toggleHandleModalFormBoard(action?: string) {
    this.actionTypeFormBoard = action || '';
    this.showModalFormBoard = !this.showModalFormBoard;
  }

  handleDeleteBoard(confirm?: boolean) {
    this.showModalDeliteBoard = !this.showModalDeliteBoard;
    if (confirm == true) {
      const id: string = this.currentBoard.id;
      this.taskService.deliteBoard(this.currentBoard.id).subscribe(res => {
        this.data = res;
        if (this.data.length > 0) {
          let index = this.data.indexOf(this.data.find(b => b.isActive)!);
          this.selectBoard(this.data[index]);
        }
      });
      this.showModalDeliteBoard = false;
    } else if (confirm == false) {
      this.showModalDeliteBoard = false;
    }
  }

  handleToggleTaskForm() {
    this.showModalFormTask = !this.showModalFormTask;
  }
}
