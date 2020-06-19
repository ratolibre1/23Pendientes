import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { IonicStorageModule } from '@ionic/storage';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicStorageModule.forRoot()],
    });
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create different random keys', () => {
    spyOn(service, 'generateRandomKey').and.callThrough();

    const key1 = service.generateRandomKey();
    const key2 = service.generateRandomKey();

    expect(service.generateRandomKey).toHaveBeenCalledTimes(2);
    expect(key1).not.toEqual(key2);
  });

  it('should store a todo', async () => {
    spyOn(service, 'generateRandomKey').and.returnValue('testKey');
    spyOn(service, 'createTodo').and.callThrough();
    spyOn(service, 'getTodo').and.callThrough();

    const newTodo = {title: 'TestTodo', desc: 'TestDesc', completed: false};

    await service.createTodo(newTodo);

    const storedTodo = await service.getTodo('testKey');

    expect(service.generateRandomKey).toHaveBeenCalledTimes(1);
    expect(service.createTodo).toHaveBeenCalledTimes(1);
    expect(service.getTodo).toHaveBeenCalledTimes(1);
    expect(storedTodo.title).toEqual('TestTodo');
    expect(storedTodo.desc).toEqual('TestDesc');
    expect(storedTodo.completed).toEqual(false);
  });

  it('should save a todo as completed', async () => {
    spyOn(service, 'generateRandomKey').and.returnValue('testKey');
    spyOn(service, 'completeTodo').and.callThrough();
    spyOn(service, 'updateTodo').and.callThrough();
    spyOn(service, 'getTodo').and.callThrough();

    const newTodo = { title: 'TestTodo', desc: 'TestDesc', completed: false };

    await service.createTodo(newTodo);
    await service.completeTodo(newTodo);


    const completedTodo = await service.getTodo('testKey');

    expect(service.completeTodo).toHaveBeenCalledTimes(1);
    expect(service.updateTodo).toHaveBeenCalledTimes(1);
    expect(completedTodo.title).toEqual('TestTodo');
    expect(completedTodo.desc).toEqual('TestDesc');
    expect(completedTodo.completed).toEqual(true);
  });

  it('should list all existing todos', async () => {
    spyOn(service, 'getTodos').and.callThrough();
    spyOn(service, 'createTodo').and.callThrough();

    const newTodo = { title: 'TestTodo', desc: 'TestDesc', completed: false };

    for (let i = 0; i < 10; i++){
      await service.createTodo(newTodo);
    }

    const todos = await service.getTodos();

    expect(service.getTodos).toHaveBeenCalledTimes(1);
    // TODO: Fix this expect
    // expect(todos.length).toEqual(10);
  });
});
