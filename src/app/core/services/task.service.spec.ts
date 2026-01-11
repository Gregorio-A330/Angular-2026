import { TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';

import { TaskService } from './task.service';
import { Task } from '../../shared/models/task.model';
import { API_URL } from '../constants/api.constants';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,

        // HttpClient moderno (Standalone)
        provideHttpClient(withInterceptorsFromDi()),

        // HttpClient Testing (substitui HttpClientTestingModule)
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Garante que não ficou nenhuma request pendente
    httpMock.verify();
  });

  // =============================
  // 🔹 LOAD INITIAL TASKS
  // =============================
  it('should load tasks on service initialization', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];

    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(2);
      expect(tasks).toEqual(mockTasks);
    });

    const req = httpMock.expectOne(API_URL.TASKS);
    expect(req.request.method).toBe('GET');

    req.flush(mockTasks);
  });

  // =============================
  // 🔹 ADD TASK
  // =============================
  it('should add a new task', () => {
    const newTaskTitle = 'New Task';

    service.addTask(newTaskTitle);

    const postReq = httpMock.expectOne(API_URL.TASKS);
    expect(postReq.request.method).toBe('POST');
    expect(postReq.request.body).toEqual({
      title: newTaskTitle,
      completed: false,
    });

    const createdTask: Task = {
      id: 3,
      title: newTaskTitle,
      completed: false,
    };

    postReq.flush(createdTask);

    service.tasks$.subscribe(tasks => {
      expect(tasks.some(t => t.id === 3)).toBe(true);
    });
  });

  // =============================
  // 🔹 TOGGLE TASK
  // =============================
  it('should toggle task completed status', () => {
    const initialTasks: Task[] = [
      { id: 1, title: 'Task', completed: false },
    ];

    // Simula estado inicial
    (service as any).tasksSubject.next(initialTasks);

    service.toggleTask(1);

    const putReq = httpMock.expectOne(`${API_URL.TASKS}/1`);
    expect(putReq.request.method).toBe('PUT');
    expect(putReq.request.body.completed).toBe(true);

    putReq.flush({
      id: 1,
      title: 'Task',
      completed: true,
    });

    service.tasks$.subscribe(tasks => {
      expect(tasks[0].completed).toBe(true);
    });
  });

  // =============================
  // 🔹 REMOVE TASK
  // =============================
  it('should remove a task', () => {
    const initialTasks: Task[] = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
    ];

    (service as any).tasksSubject.next(initialTasks);

    service.removeTask(1);

    const deleteReq = httpMock.expectOne(`${API_URL.TASKS}/1`);
    expect(deleteReq.request.method).toBe('DELETE');

    deleteReq.flush({});

    service.tasks$.subscribe(tasks => {
      expect(tasks.length).toBe(1);
      expect(tasks[0].id).toBe(2);
    });
  });

  // =============================
  // 🔹 SEARCH TASKS
  // =============================
  it('should search tasks by term', () => {
    service.search('angular');

    const req = httpMock.expectOne(req =>
      req.url === API_URL.TASKS && req.params.has('q')
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('q')).toBe('angular');

    req.flush([
      { id: 1, title: 'Angular Task', completed: false },
    ]);
  });

  // =============================
  // 🔹 GET ALL (CACHE)
  // =============================
  it('should NOT perform multiple GET requests when loading tasks multiple times', () => {
    const mockTasks: Task[] = [
      { id: 1, title: 'Task', completed: false },
    ];

    // subscribe múltiplas vezes no estado público
    service.tasks$.subscribe();
    service.tasks$.subscribe();

    const requests = httpMock.match(API_URL.TASKS);
    expect(requests.length).toBe(1);

    requests[0].flush(mockTasks);
  });

});