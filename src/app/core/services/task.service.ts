import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks';

  private tasksSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  private loadTasks() {
    this.http.get<Task[]>(this.apiUrl)
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks)),
        catchError(err => {
          console.error('Erro ao carregar tasks', err);
          return of([]);
        })
      )
      .subscribe();
  }

  addTask(title: string) {
    const newTask: Omit<Task, 'id'> = {
      title,
      completed: false,
    };

    this.http.post<Task>(this.apiUrl, newTask)
      .pipe(
        tap(task =>
          this.tasksSubject.next([...this.tasksSubject.value, task])
        )
      )
      .subscribe();
  }

  toggleTask(id: number) {
    const task = this.tasksSubject.value.find(t => t.id === id);
    if (!task) return;

    this.http.put<Task>(`${this.apiUrl}/${id}`, {
      ...task,
      completed: !task.completed,
    })
      .pipe(
        tap(updated =>
          this.tasksSubject.next(
            this.tasksSubject.value.map(t =>
              t.id === id ? updated : t
            )
          )
        )
      )
      .subscribe();
  }

  removeTask(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(
        tap(() =>
          this.tasksSubject.next(
            this.tasksSubject.value.filter(t => t.id !== id)
          )
        )
      )
      .subscribe();
  }

  updateTask(id: number, title: string) {
    const task = this.tasksSubject.value.find(t => t.id === id);
    if (!task) return;

    this.http.put<Task>(`${this.apiUrl}/${id}`, {
      ...task,
      title,
    })
      .pipe(
        tap(updated =>
          this.tasksSubject.next(
            this.tasksSubject.value.map(t =>
              t.id === id ? updated : t
            )
          )
        )
      )
      .subscribe();
  }


  /**
   * Obs.: Fonte -> Cano -> Torneira
   * 
   * Observable = água no cano
   * tap = você olha a água passando (sem mudar nada) **aqui entra no fluxo e pode executar qualquer alteração antes de subscribe.
   * subscribe = você abre a torneira (sem isso, nada acontece)
   * 
   * Observable criado
   *    ↓
   * pipe() → "Quando os dados passarem por aqui, faça essas coisas na ordem"
   *    ↓
   * tap() → "quando passar aqui, faça algo"
   *    ↓
   * subscribe() → "agora pode começar" 
   * 
   * 
   * 
   * Boas Praticas
   * 
   * manter código declarativo
   * 
   * separar efeito colateral da execução
   * 
   * encadear operadores
   * 
   * evitar lógica dentro do subscribe
  */
}