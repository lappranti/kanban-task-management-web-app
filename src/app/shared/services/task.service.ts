import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { BoardModel } from 'src/app/models/Board';
import { ColumnMoel } from 'src/app/models/Column';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private boardList!: BoardModel[];
  private boarListChanged = new BehaviorSubject<BoardModel[]>(this.boardList);
  private PlatformLaunch!: BoardModel;
  private MarketingPlan!: BoardModel;
  private Roadmap!: BoardModel;
  private column1!: ColumnMoel;
  private column2!: ColumnMoel;
  private column3!: ColumnMoel;

  constructor() {
    this.column1 = {
      id: UUID.UUID(),
      name: 'todo',
      tasks: [
        {
          id: UUID.UUID(),
          name: 'Build UI for onboarding flow',
          description: '',
          status: 'todo',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: false
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Build UI for search',
          description: '',
          status: 'todo',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: false
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Create template structures',
          description: '',
          status: 'todo',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 4',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 5',
              isDone: false
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Create template structures',
          description: '',
          status: 'todo',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 4',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 5',
              isDone: false
            }
          ]
        }
      ]
    };

    this.column2 = {
      id: UUID.UUID(),
      name: 'doing',
      tasks: [
        {
          id: UUID.UUID(),
          name: 'Design settings and search pages',
          description: '',
          status: 'doing',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: false
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Add account management endpoints',
          description: '',
          status: 'doing',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: false
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Design onboarding flow',
          description: '',
          status: 'doing',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 4',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 5',
              isDone: false
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Add search enpoints',
          description: '',
          status: 'doing',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 4',
              isDone: false
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Add authentication endpoints',
          description: '',
          status: 'doing',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: false
            }
          ]
        },
        {
          id: UUID.UUID(),
          name:
            'Research pricing points of various competitors and trial different business models',
          description: '',
          status: 'doing',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: false
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: false
            }
          ]
        }
      ]
    };
    this.column3 = {
      id: UUID.UUID(),
      name: 'done',
      tasks: [
        {
          id: UUID.UUID(),
          name: 'Conduct 5 wireframe tests',
          description: '',
          status: 'done',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: true
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Create wireframe prototype',
          description: '',
          status: 'done',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Review results of usability tests and iterate',
          description: '',
          status: 'done',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 4',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 5',
              isDone: true
            }
          ]
        },
        {
          id: UUID.UUID(),
          name:
            'Create paper prototypes and conduct 10 usability tests with potential customers',
          description: '',
          status: 'done',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 4',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 5',
              isDone: true
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Market discovery',
          description: '',
          status: 'done',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Competitor analysis',
          description: '',
          status: 'done',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 4',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 5',
              isDone: true
            }
          ]
        },
        {
          id: UUID.UUID(),
          name: 'Research the market',
          description: '',
          status: 'done',
          subtasks: [
            {
              id: UUID.UUID(),
              name: 'Subtask 1',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 2',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 3',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 4',
              isDone: true
            },
            {
              id: UUID.UUID(),
              name: 'Subtask 5',
              isDone: true
            }
          ]
        }
      ]
    };

    this.PlatformLaunch = {
      isActive: true,
      id: UUID.UUID(),
      name: 'Platform Launch',
      columns: [this.column1, this.column2, this.column3]
    };
    this.MarketingPlan = {
      isActive: false,
      id: UUID.UUID(),
      name: 'Marketing Plan',
      columns: []
    };
    this.Roadmap = {
      isActive: false,
      id: UUID.UUID(),
      name: 'Roadmap',
      columns: []
    };
  }

  initilizationStoradge(): Observable<BoardModel[]> {
    const storadge = localStorage.getItem('boardStoradge');
    if (storadge == undefined && storadge == null) {
      this.boardList = [this.PlatformLaunch, this.MarketingPlan, this.Roadmap];
      localStorage.setItem('boardStoradge', JSON.stringify(this.boardList));
    } else {
      this.boardList = JSON.parse(storadge);
    }

    return of(this.boardList);
  }

  getBoardById(id: string): Observable<BoardModel> {
    const board = this.boardList.find(board => board.id === id);
    return of(board).pipe(
      map((board: BoardModel | undefined) => {
        if (board) {
          return board;
        } else {
          throw new Error(`Board with id ${id} not found.`);
        }
      })
    );
  }

  addBoard(board: BoardModel) {
    this.boardList.push(board);
    localStorage.setItem('boardStoradge', JSON.stringify(this.boardList));
    this.boarListChanged.next(this.boardList);
    return this.boarListChanged.asObservable();
  }

  editeBoard(editingBoard: BoardModel) {
    this.boardList.forEach(board => {
      if (board.id === editingBoard.id) {
        board = editingBoard;
      }
    });
    localStorage.setItem('boardStoradge', JSON.stringify(this.boardList));
    this.boarListChanged.next(this.boardList);
    return this.boarListChanged.asObservable();
  }

  deliteBoard(id: string) {
    this.boardList = this.boardList.filter(board => board.id !== id);
    if (this.boardList.length > 0) this.boardList[0].isActive = true;
    localStorage.setItem('boardStoradge', JSON.stringify(this.boardList));
    return of(this.boardList);
  }
}
