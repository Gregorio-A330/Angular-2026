import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingService } from './core/services/loading.service';
import { Observable } from 'rxjs';
import { ErrorService } from './core/services/error.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-task-manager';
  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  constructor(
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.errorService.error$;
  }

  // readonly loading$ = this.loadingService.loading$; -> aqui não funciona como variavel
  /**
   * class fields são inicializados antes do constructor
   * o TS não conseguiu garantir a ordem 
   * depende de useDefineForClassFields
   * standalone + config moderna deixam isso sensível e da problema
   */
}
