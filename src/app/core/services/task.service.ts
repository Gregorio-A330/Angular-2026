import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, of, Observable, Subject, exhaustMap, concatMap, switchMap, shareReplay } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Task } from '../../shared/models/task.model';
import { API_URL } from '../constants/api.constants'

@Injectable({ providedIn: 'root' })
export class TaskService {
  // 🔹 Estado
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  readonly tasks$ = this.tasksSubject.asObservable();

  // 🔹 Cache
  private allTasks$?: Observable<Task[]>;

  // 🔹 Ações
  private addTask$ = new Subject<string>();
  private toggleTask$ = new Subject<number>();
  private updateTask$ = new Subject<{ id: number; title: string }>();
  private removeTask$ = new Subject<number>();
  private search$ = new Subject<string>();

  constructor(private http: HttpClient) {
    this.initLoad();
    this.initSearch();
    this.initAdd();
    this.initToggle();
    this.initUpdate();
    this.initRemove();
  }

  // =============================
  // 🔹 INIT STREAMS
  // =============================

  private initLoad() {
    this.getAll()
      .pipe(tap(tasks => this.tasksSubject.next(tasks)))
      .subscribe();
  }

  private initSearch() {
    this.search$
      .pipe(
        switchMap(term => this.searchRequest(term)),
        tap(tasks => this.tasksSubject.next(tasks))
      )
      .subscribe();
  }

  private initAdd() {
    this.addTask$
      .pipe(
        exhaustMap(title =>
          this.http.post<Task>(API_URL.TASKS, {
            title,
            completed: false
          })
        ),
        tap(task => {
          this.invalidateCache();
          this.tasksSubject.next([...this.tasksSubject.value, task]);
        })
      )
      .subscribe();
  }

  private initToggle() {
    this.toggleTask$
      .pipe(
        concatMap(id => {
          const task = this.tasksSubject.value.find(t => t.id === id);
          if (!task) return of(null);

          return this.http.put<Task>(`${API_URL.TASKS}/${id}`, {
            ...task,
            completed: !task.completed
          });
        }),
        tap(updated => {
          if (!updated) return;

          this.invalidateCache();
          this.tasksSubject.next(
            this.tasksSubject.value.map(t =>
              t.id === updated.id ? updated : t
            )
          );
        })
      )
      .subscribe();
  }

  private initUpdate() {
    this.updateTask$
      .pipe(
        concatMap(({ id, title }) => {
          const task = this.tasksSubject.value.find(t => t.id === id);
          if (!task) return of(null);

          return this.http.put<Task>(`${API_URL.TASKS}/${id}`, {
            ...task,
            title
          });
        }),
        tap(updated => {
          if (!updated) return;

          this.invalidateCache();
          this.tasksSubject.next(
            this.tasksSubject.value.map(t =>
              t.id === updated.id ? updated : t
            )
          );
        })
      )
      .subscribe();
  }

  private initRemove() {
    this.removeTask$
      .pipe(
        concatMap(id =>
          this.http.delete(`${API_URL.TASKS}/${id}`).pipe(
            tap(() => id)
          )
        ),
        tap(id => {
          this.invalidateCache();
          this.tasksSubject.next(
            this.tasksSubject.value.filter(t => t.id !== id)
          );
        })
      )
      .subscribe();
  }

  // =============================
  // 🔹 DATA SOURCES
  // =============================

  private getAll(): Observable<Task[]> {
    if (!this.allTasks$) {
      this.allTasks$ = this.http
        .get<Task[]>(API_URL.TASKS)
        .pipe(shareReplay(1));
    }
    return this.allTasks$;
  }

  private searchRequest(term: string): Observable<Task[]> {
    if (!term.trim()) return this.getAll();

    const params = new HttpParams().set('q', term);
    return this.http.get<Task[]>(API_URL.TASKS, { params });
  }

  private invalidateCache() {
    this.allTasks$ = undefined;
  }

  // =============================
  // 🔹 PUBLIC API
  // =============================

  search(term: string) {
    this.search$.next(term);
  }

  addTask(title: string) {
    this.addTask$.next(title);
  }

  toggleTask(id: number) {
    this.toggleTask$.next(id);
  }

  updateTask(id: number, title: string) {
    this.updateTask$.next({ id, title });
  }

  removeTask(id: number) {
    this.removeTask$.next(id);
  }
}
