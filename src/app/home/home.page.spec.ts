import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { IonicStorageModule } from '@ionic/storage';
import { TodoService } from '../services/todo.service';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot(), IonicStorageModule.forRoot()],
      providers: [TodoService]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo', async () => {
    spyOn(component, 'addTodo').and.callThrough();
    spyOn(component, 'showTodos').and.callThrough();

    const initialTodos = component.todos.length;
    await component.addTodo();

    const newTotalTodos = component.todos.length;

    expect(component.addTodo).toHaveBeenCalledTimes(1);
    expect(component.showTodos).toHaveBeenCalledTimes(1);

    // TODO: Fix this test
    // expect(newTotalTodos).toEqual(initialTodos + 1);
  });
});
