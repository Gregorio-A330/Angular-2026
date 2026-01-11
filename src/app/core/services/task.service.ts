import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly initialState: Task[] = [
    { id: 1, title: 'Aprender Angular', completed: false },
    { id: 2, title: 'Estudar RxJS', completed: false },
  ];

  private tasksSubject = new BehaviorSubject<Task[]>(this.initialState);
  tasks$ = this.tasksSubject.asObservable();

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false,
    };

    this.tasksSubject.next([
      ...this.tasksSubject.value,
      newTask,
    ]);
  }

  toggleTask(id: number) {
    this.tasksSubject.next(
      this.tasksSubject.value.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  removeTask(id: number) {
    this.tasksSubject.next(
      this.tasksSubject.value.filter(task => task.id !== id)
    );
  }

  updateTask(id: number, title: string) {
    this.tasksSubject.next(
      this.tasksSubject.value.map(task =>
        task.id === id
          ? { ...task, title }
          : task
      )
    );
  }
}