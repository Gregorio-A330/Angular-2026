import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TasksComponent {
  // ! = “Vai ser inicializado depois, confia”
  // !	Definite Assignment
  // ?	Pode ser undefined
  // =	Inicialização imediata
  tasks$!: Observable<Task[]>;

  searchControl = new FormControl('');


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


  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term =>
      this.taskService.search(term ?? '')
    );
  }

  // addTask() {
  //   if (this.taskForm.invalid) {
  //     return;
  //   }

  //   const title = this.taskForm.value.title!;
  //   this.taskService.addTask(title);
  //   this.taskForm.reset();
  // }

  addTask(title: string) {
    if (!title.trim()) return;
    this.taskService.addTask(title);
  }

  toggle(task: Task) {
    this.taskService.toggleTask(task.id);
  }

  remove(task: Task) {
    this.taskService.removeTask(task.id);
  }

  trackById(_: number, task: Task) {
    return task.id;
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