import { v4 as uuidv4 } from 'uuid';
import { IKanbanItem } from './interface';

export class KanbanUtils {
  static generateItems(count: number): IKanbanItem[] {
    const arr = Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k}`,
      content: `item ${k}`,
      uuid: uuidv4(),
    }));

    return arr;
  }

  // a little function to help us with reordering the result
  static reorder(
    list: IKanbanItem[],
    startIndex: number,
    endIndex: number
  ): IKanbanItem[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }
}