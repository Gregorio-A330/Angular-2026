import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, of, Observable, Subject, exhaustMap, concatMap, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from '../../shared/models/task.model';
import { API_URL } from '../constants/api.constants'

@Injectable({ providedIn: 'root' })
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  private addTask$ = new Subject<string>();
  private toggleTask$ = new Subject<number>();
  private search$ = new Subject<string>();


  constructor(private http: HttpClient) {
    this.loadAll();

    this.search$
      .pipe(
        switchMap(term => this.searchRequest(term)),
        tap(tasks => this.tasksSubject.next(tasks))
      )
      .subscribe();

    this.addTask$
      .pipe(
        exhaustMap(title => {
          const newTask: Omit<Task, 'id'> = {
            title,
            completed: false,
          };

          return this.http.post<Task>(API_URL.TASKS, newTask);
        }),
        tap(task => {
          this.tasksSubject.next([...this.tasksSubject.value, task]);
        })
      )
      .subscribe();

    this.toggleTask$
      .pipe(
        concatMap(id => {
          const task = this.tasksSubject.value.find(t => t.id === id);
          if (!task) return of(null);

          return this.http.put<Task>(`${API_URL}/${id}`, {
            ...task,
            completed: !task.completed,
          });
        }),
        tap(updated => {
          if (!updated) return;

          this.tasksSubject.next(
            this.tasksSubject.value.map(t =>
              t.id === updated.id ? updated : t
            )
          );
        })
      )
      .subscribe();
  }
  private searchRequest(term: string): Observable<Task[]> {
    if (!term.trim()) {
      return this.getAll();
    }

    const params = new HttpParams().set('q', term);
    return this.http.get<Task[]>(API_URL.TASKS, { params });
  }

  search(term: string) {
    this.search$.next(term);
  }

  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(API_URL.TASKS);
  }

  // 🔹 Fonte única
  private loadAll(): void {
    this.http.get<Task[]>(API_URL.TASKS).pipe(
      tap(tasks => this.tasksSubject.next(tasks)),
      catchError(err => {
        console.error('Erro ao carregar tasks', err);
        this.tasksSubject.next([]);
        return of([]);
      })
    ).subscribe();
  }

  // addTask(title: string): void {
  //   const newTask: Omit<Task, 'id'> = {
  //     title,
  //     completed: false,
  //   };

  //   this.http.post<Task>(API_URL.TASKS, newTask).pipe(
  //     tap(task =>
  //       this.tasksSubject.next([...this.tasksSubject.value, task])
  //     )
  //   ).subscribe();
  // }

  addTask(title: string) {
    this.addTask$.next(title);
  }



  updateTask(id: number, title: string): void {
    const task = this.tasksSubject.value.find(t => t.id === id);
    if (!task) return;

    this.http.put<Task>(`${API_URL.TASKS}/${id}`, {
      ...task,
      title
    }).pipe(
      tap(updated =>
        this.tasksSubject.next(
          this.tasksSubject.value.map(t =>
            t.id === id ? updated : t
          )
        )
      )
    ).subscribe();
  }

  // toggleTask(id: number): void {
  //   const task = this.tasksSubject.value.find(t => t.id === id);
  //   if (!task) return;

  //   this.http.put<Task>(`${API_URL.TASKS}/${id}`, {
  //     ...task,
  //     completed: !task.completed,
  //   }).pipe(
  //     tap(updated =>
  //       this.tasksSubject.next(
  //         this.tasksSubject.value.map(t =>
  //           t.id === id ? updated : t
  //         )
  //       )
  //     )
  //   ).subscribe();
  // }

  toggleTask(id: number) {
    this.toggleTask$.next(id);
  }

  removeTask(id: number): void {
    this.http.delete(`${API_URL.TASKS}/${id}`).pipe(
      tap(() =>
        this.tasksSubject.next(
          this.tasksSubject.value.filter(t => t.id !== id)
        )
      )
    ).subscribe();
  }

  // 🔹 SEARCH integrado ao estado
  // search(term: string): void {
  //   const params = term.trim()
  //     ? new HttpParams().set('q', term)
  //     : undefined;

  //   this.http.get<Task[]>(API_URL.TASKS, { params }).pipe(
  //     tap(tasks => this.tasksSubject.next(tasks))
  //   ).subscribe();
  // }
}