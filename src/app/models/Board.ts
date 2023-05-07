import { ColumnMoel } from './Column';

export interface BoardModel {
  isActive?: boolean;
  id: string;
  name: string;
  columns: ColumnMoel[];
}
