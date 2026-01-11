import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { Task } from '../../shared/models/task.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tasks.component.html',
})

export class TasksComponent {
  // ! = “Vai ser inicializado depois, confia”
  // !	Definite Assignment
  // ?	Pode ser undefined
  // =	Inicialização imediata
  // tasks$!: Observable<Task[]>;

  searchControl = new FormControl('');

  tasks$ = this.searchControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(term => this.taskService.search(term ?? ''))
  );

  taskForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  editingTaskId: number | null = null;
  editedTitle = '';


  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }


  addTask() {
    if (this.taskForm.invalid) {
      return;
    }

    const title = this.taskForm.value.title!;
    this.taskService.addTask(title);
    this.taskForm.reset();
  }

  toggleTask(id: number) {
    this.taskService.toggleTask(id);
  }

  removeTask(id: number) {
    this.taskService.removeTask(id);
  }

  startEdit(task: Task) {
    this.editingTaskId = task.id;
    this.editedTitle = task.title;
  }

  saveEdit(taskId: number) {
    if (this.editedTitle.trim().length < 3) {
      return;
    }

    this.taskService.updateTask(taskId, this.editedTitle);
    this.cancelEdit();
  }

  cancelEdit() {
    this.editingTaskId = null;
    this.editedTitle = '';
  }
}