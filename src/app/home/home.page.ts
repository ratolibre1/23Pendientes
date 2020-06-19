import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  todos = [];

  constructor(private todoService: TodoService) {
  }

  async ngOnInit() {
    await this.showTodos();
  }

  async addTodo() {
    console.log('Agregar');
    await this.todoService.createTodo({title: 'Test', desc: 'First tests', completed: false});
    await this.showTodos();
  }

  async showTodos() {
    console.log('Mostrar');
    this.todos = await this.todoService.getTodos();
    console.log(this.todos);
  }

  async completeTodo(todo: Todo) {
    console.log(`Completar todo ${todo.id}`);
    await this.todoService.completeTodo(todo);
  }
}
