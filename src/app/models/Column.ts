import { TaskModel } from './Task';

export interface ColumnMoel {
  id: string;
  name: string;
  tasks: TaskModel[];
}
