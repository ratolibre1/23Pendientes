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

  newTodo: Todo = {title: '', desc: '', completed: false};

  constructor(private todoService: TodoService) {
  }

  async ngOnInit() {
    await this.showTodos();
  }

  async addTodo() {
    await this.todoService.createTodo(this.newTodo);
    this.clearNewTodo();
    await this.showTodos();
  }

  async showTodos() {
    this.todos = await this.todoService.getTodos();
  }

  async completeTodo(todo: Todo) {
    await this.todoService.completeTodo(todo);
  }

  async deleteTodo(todo: Todo){
    await this.todoService.deleteTodo(todo);
    await this.showTodos();
  }

  clearNewTodo(){
    this.newTodo = { title: '', desc: '', completed: false };
  }
}
