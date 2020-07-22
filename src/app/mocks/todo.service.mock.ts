import { TodoService } from '../services/todo.service';

export const mockTodoService: TodoService = jasmine.createSpyObj(
  'TodoService',
  {
    createTodo: 0,
    updateTodo: 0,
    completeTodo: 0,
    deleteTodo: 0,
    getTodo: 0,
    getTodos: 0,
  }
);
