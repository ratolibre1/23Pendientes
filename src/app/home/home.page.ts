import { Component } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private todoService: TodoService) {}

  callTodo() {
    console.log('Agregar');
    this.todoService.createTodo({title: 'Test', desc: 'First tests', completed: false});
  }

  async showTodos() {
    console.log('Mostrar');
    const todos = await this.todoService.getTodos();
    console.log(todos);
  }
}
