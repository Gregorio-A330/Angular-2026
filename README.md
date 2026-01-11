# AngularTaskManager

This project aims to update me on new concepts and correct ways of using Angular. (Check Additional Informations to see the topics)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.19.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

& 

To start your local backend (fakeApi with json-server) server, run:

```bash
npm run backend
```

Once the server is running, open your browser and navigate to `http://localhost:3000/tasks` to check if is working correctly.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Information

1. Fundamentos do Angular
•	Angular CLI
•	Estrutura de projeto Angular
•	main.ts
•	index.html
•	angular.json
•	tsconfig.json
•	TypeScript (essencial)
•	Decorators (@Component, @NgModule, etc.)
________________________________________
2. Arquitetura
•	Módulos (NgModule)
•	Componentes
•	Templates
•	Metadados
•	Separação de responsabilidades
•	Smart vs Dumb Components
•	Feature Modules
•	CoreModule e SharedModule
________________________________________
3. Componentes
•	@Component
•	Template HTML
•	CSS / SCSS
•	Encapsulamento de estilos
•	ViewEncapsulation
•	Ciclo de vida (Lifecycle Hooks):
o	ngOnInit
o	ngOnChanges
o	ngDoCheck
o	ngAfterViewInit
o	ngAfterContentInit
o	ngOnDestroy
•	Comunicação entre componentes
o	@Input
o	@Output
o	EventEmitter
o	ViewChild
o	ContentChild
________________________________________
4. Templates
•	Interpolação {{ }}
•	Property Binding [property]
•	Event Binding (event)
•	Two-way Data Binding [(ngModel)]
•	Template Reference Variables #var
•	Pipes (|)
•	Pipes customizados
•	Safe Navigation Operator ?.
________________________________________
5. Diretivas
Diretivas Estruturais
•	*ngIf
•	*ngFor
•	*ngSwitch
•	ng-template
•	ng-container
Diretivas de Atributo
•	ngClass
•	ngStyle
•	Diretivas customizadas
________________________________________
6. Serviços e Injeção de Dependência
•	Services
•	Dependency Injection (DI)
•	@Injectable
•	Providers
•	Escopo de serviços
o	providedIn: 'root'
o	módulo
o	componente
•	Tokens de injeção
________________________________________
7. RxJS (Muito importante)
•	Observables
•	Observers
•	Subjects
o	Subject
o	BehaviorSubject
o	ReplaySubject
o	AsyncSubject
•	Operators
o	map
o	filter
o	tap
o	switchMap
o	mergeMap
o	concatMap
o	exhaustMap
o	debounceTime
o	distinctUntilChanged
o	catchError
•	subscribe
•	async pipe
•	Unsubscribe (takeUntil, Subscription)
________________________________________
8. HTTP
•	HttpClient
•	GET / POST / PUT / PATCH / DELETE
•	Interceptors
•	Headers
•	Params
•	Error handling
•	Retry
•	Caching
________________________________________
9. Forms
Template-driven Forms
•	FormsModule
•	ngModel
•	Validações
•	ngForm
Reactive Forms
•	ReactiveFormsModule
•	FormGroup
•	FormControl
•	FormArray
•	Validators
•	Custom Validators
•	FormBuilder
________________________________________
10. Roteamento (Router)
•	RouterModule
•	Rotas
•	Lazy Loading
•	Guards
o	CanActivate
o	CanDeactivate
o	CanLoad
o	Resolve
•	routerLink
•	router-outlet
•	Parâmetros de rota
•	Query Params
•	Redirects
•	Wildcard routes
________________________________________
11. State Management
•	Serviços + RxJS
•	BehaviorSubject como store
•	NgRx
o	Store
o	Actions
o	Reducers
o	Effects
o	Selectors
•	Component Store
•	Signals (Angular moderno)
________________________________________
12. Angular Signals (Angular 16+)
•	signal()
•	computed()
•	effect()
•	Integração com RxJS
•	Change Detection com Signals
________________________________________
13. Change Detection
•	Change Detection Strategy
o	Default
o	OnPush
•	Zone.js
•	Detecção manual
o	ChangeDetectorRef
•	Performance
________________________________________
14. Performance e Boas Práticas
•	Lazy Loading
•	OnPush
•	TrackBy
•	Async Pipe
•	Bundle optimization
•	Standalone Components
•	Tree-shaking
________________________________________
15. Standalone APIs (Angular moderno)
•	Standalone Components
•	Standalone Pipes
•	Standalone Directives
•	bootstrapApplication
•	Remoção de NgModule
________________________________________
16. Testes
•	Jasmine
•	Karma
•	TestBed
•	Unit Tests
•	Component Tests
•	Service Tests
•	E2E (Cypress / Playwright)
________________________________________
17. Internacionalização (i18n)
•	i18n nativo
•	Pipes de tradução
•	Bibliotecas externas (ngx-translate)
________________________________________
18. Segurança
•	Sanitização
•	XSS
•	CSRF
•	Guards de rota
•	Interceptors de autenticação
________________________________________
19. Build e Deploy
•	Build de produção
•	Environments
•	Variáveis de ambiente
•	Deploy (Firebase, Vercel, Netlify, etc.)
•	SSR (Angular Universal)
________________________________________
20. Recursos Avançados
•	Angular Universal (SSR)
•	PWA
•	Web Workers
•	Micro Frontends
•	Module Federation
•	Custom Schematics


