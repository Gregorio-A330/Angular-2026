import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Observable } from 'rxjs';
import { TaskService } from '../../core/services/task.service';
import { Task } from '../../shared/models/task.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

// @Component({
//   selector: 'app-tasks',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './tasks.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class TasksComponent {
//   // ! = “Vai ser inicializado depois, confia”
//   // !	Definite Assignment
//   // ?	Pode ser undefined
//   // =	Inicialização imediata
//   tasks$!: Observable<Task[]>;

//   // SEARCH
//   readonly searchControl = new FormControl('', { nonNullable: true });

//   // ADD TASK FORM
//   readonly addTaskForm = new FormGroup({
//     title: new FormControl('', {
//       nonNullable: true,
//       validators: [Validators.required, Validators.minLength(3)]
//     })
//   });

//   constructor(private taskService: TaskService) {

//       // Fonte única de verdade (estado)
//    this.tasks$ = this.taskService.tasks$;

//     // Search reativo
//     this.searchControl.valueChanges
//       .pipe(
//         debounceTime(300),
//         distinctUntilChanged(),
//         takeUntilDestroyed()
//       )
//       .subscribe(term => {
//         this.taskService.search(term);
//       });
//   }

//   addTask() {
//     if (this.addTaskForm.invalid) return;

//     const title = this.addTaskForm.controls.title.value;
//     this.taskService.addTask(title);
//     this.addTaskForm.reset();
//   }

//   toggle(task: Task) {
//     this.taskService.toggleTask(task.id);
//   }

//   remove(task: Task) {
//     this.taskService.removeTask(task.id);
//   }

//   trackById(_: number, task: Task) {
//     return task.id;
//   }
// }


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tasks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TasksComponent {
  tasks$!: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  add(title: string) {
    this.taskService.addTask(title);
  }

  toggle(id: number) {
    this.taskService.toggleTask(id);
  }

  remove(id: number) {
    this.taskService.removeTask(id);
  }

  trackById(_: number, task: Task) {
    return task.id;
  }
}