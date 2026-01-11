import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errorSubject = new Subject<string>();
  error$ = this.errorSubject.asObservable();

  show(message: string) {
    this.errorSubject.next(message);
  }

  clear() {
    this.errorSubject.next('');
  }

  //Erro é evento
  //Não é persistente
  //Não reaparece ao trocar de tela
  //por isso subject 
}