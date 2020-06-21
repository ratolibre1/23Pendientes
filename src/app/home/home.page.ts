import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  todos = [];

  newTodo: Todo = { title: '', desc: '', completed: false };

  constructor(private alertController: AlertController, private todoService: TodoService) {}

  getPendingTodos() {
    const pendingTodos = [];
    this.todos.forEach((todo) => {
      if (!todo.completed) {
        pendingTodos.push(todo);
      }
    });
    return pendingTodos;
  }
  getCompletedTodos() {
    const completedTodos = [];
    this.todos.forEach((todo) => {
      if (todo.completed) {
        completedTodos.push(todo);
      }
    });
    return completedTodos;
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

  async presentDeleteConfirm(todo: Todo) {
    const alert = await this.alertController.create({
      cssClass: 'alertCss',
      header: 'Confirmar borrado',
      message: `Confirmas que quieres borrar la tarea "${todo.title}"?`,
      buttons: [
        {
          cssClass: 'dangerButton',
          text: 'Borrar',
          handler: () => {
            this.deleteTodo(todo);
          },
        },
        'Cancelar',
      ],
    });

    await alert.present();
  }

  async deleteTodo(todo: Todo) {
    await this.todoService.deleteTodo(todo);
    await this.showTodos();
  }

  clearNewTodo() {
    this.newTodo = { title: '', desc: '', completed: false };
  }
}
