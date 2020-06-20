import { TestBed, tick, fakeAsync } from '@angular/core/testing';

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

  it('should create different random keys', async () => {
    spyOn(service, 'generateDateKey').and.callThrough();

    const key1 = service.generateDateKey();
    await new Promise((resolve) => setTimeout(resolve, 100));
    const key2 = service.generateDateKey();

    expect(service.generateDateKey).toHaveBeenCalledTimes(2);
    expect(key1).not.toEqual(key2);
  });

  it('should store a todo', async () => {
    spyOn(service, 'generateDateKey').and.returnValue('testKey');
    spyOn(service, 'createTodo').and.callThrough();
    spyOn(service, 'getTodo').and.callThrough();

    const newTodo = {title: 'TestTodo', desc: 'TestDesc', completed: false};

    await service.createTodo(newTodo);

    const storedTodo = await service.getTodo('testKey');

    expect(service.generateDateKey).toHaveBeenCalledTimes(1);
    expect(service.createTodo).toHaveBeenCalledTimes(1);
    expect(service.getTodo).toHaveBeenCalledTimes(1);
    expect(storedTodo.title).toEqual('TestTodo');
    expect(storedTodo.desc).toEqual('TestDesc');
    expect(storedTodo.completed).toEqual(false);
  });

  it('should save a todo as completed', async () => {
    spyOn(service, 'generateDateKey').and.returnValue('testKey');
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

  it('should delete an existing todo', async () => {
    spyOn(service, 'generateDateKey').and.returnValue('testKey');
    spyOn(service, 'createTodo').and.callThrough();
    spyOn(service, 'getTodos').and.callThrough();
    spyOn(service, 'deleteTodo').and.callThrough();


    const newTodo = { title: 'TestTodo', desc: 'TestDesc', completed: false, id: 'testKey' };
    await service.createTodo(newTodo);

    const existingTodos = await service.getTodos();
    const existingLength = existingTodos.length;

    await service.deleteTodo(newTodo);

    const newExisting = await service.getTodos();
    const newLength = newExisting.length;

    expect(service.createTodo).toHaveBeenCalledTimes(1);
    expect(service.getTodos).toHaveBeenCalledTimes(2);
    expect(service.deleteTodo).toHaveBeenCalledTimes(1);
    // TODO: Fix this test
    // expect(newLength).not.toEqual(existingLength);
  });

  it('should list all existing todos', async () => {
    spyOn(service, 'getTodos').and.callThrough();
    spyOn(service, 'createTodo').and.callThrough();

    const newTodo = { title: 'TestTodo', desc: 'TestDesc', completed: false };

    for (let i = 0; i < 10; i++){
      await service.createTodo(newTodo);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const todos = await service.getTodos();

    expect(service.getTodos).toHaveBeenCalledTimes(1);
    // TODO: Fix this expect
    // expect(todos.length).toEqual(10);
  });
});
