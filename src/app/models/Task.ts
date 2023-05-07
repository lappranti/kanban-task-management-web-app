import { SubtaskModel } from './Subtask';

export interface TaskModel {
  id: string;
  name: string;
  description: string;
  status: string;
  subtasks: SubtaskModel[];
}
