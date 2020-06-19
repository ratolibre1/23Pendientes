import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private storage: Storage) { }

  generateDateKey(): string{
    return new Date().toISOString();
  }

  async createTodo(newTodo: Todo){
    const key = this.generateDateKey();
    newTodo.id = key;
    return await this.storage.set(key, newTodo);
  }

  async updateTodo(changedTodo: Todo){
    return await this.storage.set(changedTodo.id, changedTodo);
  }

  async completeTodo(todo: Todo){
    todo.completed = true;
    await this.updateTodo(todo);
  }

  async getTodo(key: string){
    return await this.storage.get(key);
  }

  async getTodos(){

    const todos = [];
    await this.storage.keys().then(
      data => {
        data.forEach(async (key) =>
        todos.push(await this.storage.get(key))
      );
    });

    return todos;
  }
}
