import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from './home.page';
import { TodoService } from '../services/todo.service';
import { mockTodoService } from '../mocks/todo.service.mock';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
      providers: [{provide: TodoService, useValue: mockTodoService}]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo after clicking the button', async () => {
    spyOn(component, 'clearNewTodo').and.callThrough();
    spyOn(component, 'showTodos').and.callThrough();

    component.newTodo = { title: 'newTitle', desc: 'newDesc', completed: false };

    await component.addTodo();

    expect(component.todoService.createTodo).toHaveBeenCalledTimes(1);
    expect(component.clearNewTodo).toHaveBeenCalledTimes(1);
    expect(component.showTodos).toHaveBeenCalledTimes(1);
  });

  it('should clear the new todo fields', () => {
    component.newTodo = {
      title: 'newTitle',
      desc: 'newDesc',
      completed: false,
    };

    component.clearNewTodo();

    const expected = { title: '', desc: '', completed: false };

    expect(component.newTodo).toEqual(expected);
  });

  it('should sort pending todos', () => {
    const input = [
      { title: 'testA', desc: 'A', completed: false },
      { title: 'testB', desc: 'B', completed: true },
      { title: 'testC', desc: 'C', completed: false },
      { title: 'testD', desc: 'D', completed: true },
      { title: 'testE', desc: 'E', completed: true },
      { title: 'testF', desc: 'F', completed: false }
    ];

    const expected = [
      { title: 'testA', desc: 'A', completed: false },
      { title: 'testC', desc: 'C', completed: false },
      { title: 'testF', desc: 'F', completed: false }
    ];

    component.todos = input;
    const actual = component.getPendingTodos();

    expect(actual).toEqual(expected);
  });

  it('should sort completed todos', () => {
    const input = [
      { title: 'testA', desc: 'A', completed: false },
      { title: 'testB', desc: 'B', completed: true },
      { title: 'testC', desc: 'C', completed: false },
      { title: 'testD', desc: 'D', completed: true },
      { title: 'testE', desc: 'E', completed: true },
      { title: 'testF', desc: 'F', completed: false },
    ];

    const expected = [
      { title: 'testB', desc: 'B', completed: true },
      { title: 'testD', desc: 'D', completed: true },
      { title: 'testE', desc: 'E', completed: true },
    ];

    component.todos = input;
    const actual = component.getCompletedTodos();

    expect(actual).toEqual(expected);
  });
});
