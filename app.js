'use strict';

const TOPICS = [
  { id: 'basics', title: 'MVC Basics', desc: 'Routing, `Program.cs`, `IActionResult`, and request flow.' },
  { id: 'models', title: 'Models & Annotations', desc: 'Validation rules and metadata from `EmployeeDemo`.' },
  { id: 'crud', title: 'CRUD Operations', desc: 'The full `EmployeesController` pattern using an in-memory list.' },
  { id: 'taghelpers', title: 'Tag Helpers', desc: 'How `asp-for`, `asp-action`, and validation helpers reduce boilerplate.' },
  { id: 'razor', title: 'Razor Views', desc: 'Typed views, loops, conditionals, layout files, and script sections.' },
  { id: 'efcore', title: 'EF Core', desc: 'DbContext, DbSet, migrations, connection strings, and SQL Server wiring.' },
  { id: 'relations', title: 'Relationships', desc: 'Department to employees one-to-many modeling and eager loading.' },
  { id: 'compare', title: 'In-Memory vs DB', desc: 'When a static list is enough and when persistence matters.' },
  { id: 'demo', title: 'Interactive Demo', desc: 'A browser-only employee CRUD simulator with validation.' },
  { id: 'routinglab', title: 'Routing Lab', desc: 'Type URLs and see which controller, action, and id MVC would select.' },
  { id: 'migrationlab', title: 'Migration Lab', desc: 'Build a model change and see the migration command flow.' },
  { id: 'validationlab', title: 'Validation Trainer', desc: 'Practice Data Annotation rules with instant model-state feedback.' },
  { id: 'efquerylab', title: 'EF Query Builder', desc: 'Compose common EF Core Include, Where, OrderBy, and Select patterns.' },
  { id: 'quiz', title: 'Quiz & Glossary', desc: 'Knowledge checks and quick definitions for recurring ASP.NET terms.' }
];

const QUIZ = [
  { topic: 'basics', q: 'What does the default MVC route usually look like?', opts: ['{page}/{handler?}', '{controller}/{action}/{id?}', '{api}/{version}/{id}', '{view}/{model}'], ans: 1, exp: 'The standard MVC route maps URL segments to controller, action, and an optional id.' },
  { topic: 'basics', q: 'Which service registration enables MVC controllers with Razor views?', opts: ['AddRazorComponents()', 'AddControllersWithViews()', 'AddSignalR()', 'AddOpenApi()'], ans: 1, exp: '`AddControllersWithViews()` registers MVC controllers and view support.' },
  { topic: 'basics', q: 'Why would an action return `NotFound()`?', opts: ['To render a layout', 'To create a record', 'To indicate the requested item does not exist', 'To restart the app'], ans: 2, exp: '`NotFound()` is appropriate when an id lookup fails.' },
  { topic: 'basics', q: 'What is `IActionResult` used for?', opts: ['Only JSON', 'Only Razor views', 'A flexible return type for different HTTP responses', 'A database connection'], ans: 2, exp: '`IActionResult` allows one action to return views, redirects, 404 responses, and more.' },

  { topic: 'models', q: 'Which attribute makes a field mandatory?', opts: ['Display', 'Required', 'Range', 'Compare'], ans: 1, exp: '`[Required]` rejects missing input.' },
  { topic: 'models', q: 'Which attribute checks whether two properties match?', opts: ['Compare', 'DataType', 'Key', 'EmailAddress'], ans: 0, exp: '`[Compare("Password")]` is used for confirm-password scenarios.' },
  { topic: 'models', q: 'What does `[StringLength(20, MinimumLength = 2)]` enforce?', opts: ['Exactly 20 characters', '2 to 20 characters', 'Numbers only', 'Two words only'], ans: 1, exp: '`[StringLength]` can define both maximum and minimum lengths.' },
  { topic: 'models', q: 'Which attribute helps render a date picker or password field correctly?', opts: ['DisplayFormat', 'DataType', 'Range', 'Key'], ans: 1, exp: '`[DataType]` gives UI hints like Date or Password.' },
  { topic: 'models', q: 'Which attribute validates a numeric interval like salary 10000 to 50000?', opts: ['Required', 'Range', 'EmailAddress', 'Display'], ans: 1, exp: '`[Range]` constrains numeric values.' },
  { topic: 'models', q: 'What can `[Display(Name = "First Name")]` change?', opts: ['Database schema', 'Label text shown to the user', 'Route template', 'Controller name'], ans: 1, exp: '`[Display]` affects UI metadata like field labels.' },

  { topic: 'crud', q: 'Which action normally displays the full list of records?', opts: ['Delete', 'Index', 'Edit', 'Details'], ans: 1, exp: '`Index()` typically renders the list view.' },
  { topic: 'crud', q: 'Why is `RedirectToAction(nameof(Index))` used after a successful POST?', opts: ['To clear CSS', 'To avoid duplicate form submission on refresh', 'To skip validation', 'To create a migration'], ans: 1, exp: 'This follows the Post/Redirect/Get pattern.' },
  { topic: 'crud', q: 'What should happen if `ModelState.IsValid` is false?', opts: ['Save anyway', 'Throw away the model and redirect', 'Return the same view with validation errors', 'Delete the record'], ans: 2, exp: 'Invalid models should return to the form so the user can fix them.' },
  { topic: 'crud', q: 'Which attribute appears on POST Create/Edit/Delete actions in the sample?', opts: ['Authorize', 'Obsolete', 'ValidateAntiForgeryToken', 'BindNever'], ans: 2, exp: '`[ValidateAntiForgeryToken]` protects form POSTs.' },
  { topic: 'crud', q: 'Which action is used to show one item without editing it?', opts: ['Details', 'Index', 'Create', 'Delete'], ans: 0, exp: '`Details(id)` usually displays a single read-only record.' },
  { topic: 'crud', q: 'In the sample controller, where is data stored?', opts: ['SQL Server', 'Redis', 'A private static list', 'Session state'], ans: 2, exp: 'The controller uses an in-memory static `List<Employee>`.' },
  { topic: 'crud', q: 'Which pair of actions usually exists for Create and Edit?', opts: ['Only GET versions', 'Only POST versions', 'A GET action and a POST action', 'A Razor file and a migration'], ans: 2, exp: 'MVC commonly uses GET to show the form and POST to process the submitted values.' },

  { topic: 'taghelpers', q: 'What does `asp-for="FirstName"` do on an input?', opts: ['Creates a route', 'Binds the input to a model property', 'Creates a migration', 'Adds JavaScript automatically'], ans: 1, exp: '`asp-for` connects form elements to model properties.' },
  { topic: 'taghelpers', q: 'What does `asp-route-id="@employee.Id"` supply?', opts: ['CSS classes', 'A query plan', 'A route value named id', 'A model error'], ans: 2, exp: 'It passes an id route value into the generated URL.' },
  { topic: 'taghelpers', q: 'Which helper displays field-specific validation messages?', opts: ['asp-layout', 'asp-validation-for', 'asp-model', 'asp-fragment'], ans: 1, exp: '`asp-validation-for` renders the validation message for one property.' },
  { topic: 'taghelpers', q: 'Where are MVC tag helpers commonly enabled?', opts: ['appsettings.json', '_ViewImports.cshtml', 'Program.cs', '_Layout.cshtml.css'], ans: 1, exp: '`_ViewImports.cshtml` usually contains `@addTagHelper`.' },
  { topic: 'taghelpers', q: 'Which helper is used on a form to point submission at the Create action?', opts: ['asp-validation-summary', 'asp-action="Create"', 'asp-route-id', 'asp-for="Create"'], ans: 1, exp: '`asp-action="Create"` tells MVC to generate the form action URL for the Create endpoint.' },

  { topic: 'razor', q: 'What does `@model IEnumerable<Student>` declare?', opts: ['A database table', 'The type the view expects', 'A JavaScript array', 'A CSS class'], ans: 1, exp: '`@model` makes the view strongly typed.' },
  { topic: 'razor', q: 'What is `@foreach` used for in a view?', opts: ['Redirecting actions', 'Registering services', 'Looping over model data', 'Creating migrations'], ans: 2, exp: '`@foreach` is commonly used to render table rows from a list.' },
  { topic: 'razor', q: 'What does `_Layout.cshtml` provide?', opts: ['Shared page shell', 'Database schema', 'A controller action', 'API versioning'], ans: 0, exp: '`_Layout.cshtml` defines shared structure like header, footer, and body placeholders.' },
  { topic: 'razor', q: 'Why use `@section Scripts`?', opts: ['To rename models', 'To add page-specific scripts into the layout', 'To add SQL queries', 'To create route constraints'], ans: 1, exp: '`@section Scripts` lets a view inject scripts where the layout expects them.' },
  { topic: 'razor', q: 'What does `@Model` refer to inside a strongly typed view?', opts: ['The current controller name', 'The object passed from the action to the view', 'The layout file only', 'The route template'], ans: 1, exp: '`@Model` gives access to the model instance sent from the controller.' },

  { topic: 'efcore', q: 'What class represents the EF Core session with the database?', opts: ['DbContext', 'ControllerBase', 'MigrationBuilder', 'RouteBuilder'], ans: 0, exp: '`DbContext` tracks entities and coordinates queries and saves.' },
  { topic: 'efcore', q: 'What does `DbSet<Student>` represent?', opts: ['A route table', 'A table-like collection of entities', 'A validation rule', 'A Razor section'], ans: 1, exp: '`DbSet<T>` is the EF Core entry point for querying and saving that entity type.' },
  { topic: 'efcore', q: 'Which command creates migration files from model changes?', opts: ['Update-Database', 'Add-Migration', 'dotnet publish', 'MapControllerRoute'], ans: 1, exp: '`Add-Migration` scaffolds migration code.' },
  { topic: 'efcore', q: 'Which command applies migrations to the database?', opts: ['Add-Migration', 'Update-Database', 'dotnet clean', 'UseSqlServer'], ans: 1, exp: '`Update-Database` runs the pending migrations.' },
  { topic: 'efcore', q: 'What does `UseSqlServer(...)` configure?', opts: ['The CSS framework', 'The MVC layout', 'The EF Core provider and connection', 'The Razor compiler'], ans: 2, exp: '`UseSqlServer` connects EF Core to SQL Server.' },
  { topic: 'efcore', q: 'Where is the connection string name `SQLCON` used in the sample?', opts: ['In `_ViewImports.cshtml`', 'Inside `UseSqlServer(builder.Configuration.GetConnectionString("SQLCON"))`', 'In `Details(id)`', 'In `@section Scripts`'], ans: 1, exp: 'The sample reads the SQL Server connection string from configuration.' },

  { topic: 'relations', q: 'In the Company sample, which property acts as the foreign key by convention?', opts: ['Department', 'DeptName', 'DeptId in Employee', 'employees'], ans: 2, exp: '`DeptId` is the scalar foreign key on `Employee`.' },
  { topic: 'relations', q: 'What kind of relationship is Department to Employee?', opts: ['One-to-one', 'One-to-many', 'Many-to-many', 'No relationship'], ans: 1, exp: 'One department can have many employees.' },
  { topic: 'relations', q: 'What does `Include(d => d.employees)` do?', opts: ['Deletes related rows', 'Loads related employees together with departments', 'Validates the foreign key', 'Adds a route'], ans: 1, exp: '`Include()` eagerly loads related data.' },
  { topic: 'relations', q: 'Which attribute explicitly marks a primary key?', opts: ['Compare', 'Required', 'Key', 'Display'], ans: 2, exp: '`[Key]` marks the PK property.' },
  { topic: 'relations', q: 'Which property on `Department` represents the many side of the relationship?', opts: ['DeptName', 'DeptId', 'IEnumerable<Employee>? employees', 'Department? Department'], ans: 2, exp: 'The collection navigation property on `Department` represents the many employees linked to that one department.' },

  { topic: 'compare', q: 'What is the main downside of an in-memory list approach?', opts: ['It requires SQL Server', 'Data disappears when the app restarts', 'Views cannot use Razor', 'Controllers are not allowed'], ans: 1, exp: 'In-memory data is temporary and not persisted.' },
  { topic: 'compare', q: 'What is the main advantage of EF Core over a static list?', opts: ['No setup at all', 'Persistent storage and richer querying', 'Fewer files', 'No models needed'], ans: 1, exp: 'EF Core gives persistence, migrations, and relational querying.' },
  { topic: 'compare', q: 'Which approach is better for first CRUD practice without database setup?', opts: ['In-memory list', 'SQL Server first', 'Microservices', 'SignalR'], ans: 0, exp: 'The static list approach is simpler for early learning.' },
  { topic: 'compare', q: 'Which approach is closer to a real production data layer?', opts: ['Hardcoded list in controller', 'EF Core with a database', 'Inline JavaScript only', 'Static HTML table'], ans: 1, exp: 'Persistent storage and ORM mapping are more production-like.' }
];

const GLOSSARY = [
  ['Action', 'A public controller method that handles a request and returns a response.', 'MVC'],
  ['AddControllersWithViews', 'Service registration that enables MVC controllers plus Razor view rendering.', 'MVC'],
  ['AddDbContext', 'Registers an EF Core DbContext in dependency injection.', 'EF Core'],
  ['Annotation', 'An attribute placed on a model property to control validation or metadata.', 'Models'],
  ['Anti-forgery token', 'A hidden token used to protect form submissions against CSRF.', 'Security'],
  ['asp-action', 'Tag Helper attribute that generates a URL to a controller action.', 'Tag Helper'],
  ['asp-controller', 'Tag Helper attribute that targets a specific controller.', 'Tag Helper'],
  ['asp-for', 'Tag Helper attribute that binds an element to a model property.', 'Tag Helper'],
  ['asp-route-id', 'Tag Helper attribute that adds an `id` route value.', 'Tag Helper'],
  ['asp-validation-for', 'Tag Helper used to display validation errors for one field.', 'Tag Helper'],
  ['asp-validation-summary', 'Tag Helper used to show overall validation errors.', 'Tag Helper'],
  ['Compare', 'Validation attribute that checks whether two property values match.', 'Models'],
  ['Connection string', 'Configuration value that tells the app how to connect to a database.', 'EF Core'],
  ['Controller', 'The MVC component that receives requests and coordinates logic.', 'MVC'],
  ['Create action', 'The part of CRUD that adds a new record.', 'CRUD'],
  ['CRUD', 'Create, Read, Update, Delete.', 'CRUD'],
  ['Data annotations', 'Attributes like `[Required]`, `[Range]`, and `[EmailAddress]` used on models.', 'Models'],
  ['DataType', 'Attribute that hints how a property should be rendered, such as Date or Password.', 'Models'],
  ['DbContext', 'Central EF Core class that manages entity queries and changes.', 'EF Core'],
  ['DbSet', 'A table-like EF Core property for one entity type.', 'EF Core'],
  ['Delete action', 'The part of CRUD that removes a record.', 'CRUD'],
  ['Details action', 'Action that shows one specific record.', 'CRUD'],
  ['Display', 'Attribute used to customize labels and prompts in the UI.', 'Models'],
  ['DisplayFormat', 'Attribute used to format output values such as currency.', 'Models'],
  ['Edit action', 'The part of CRUD that updates an existing record.', 'CRUD'],
  ['EmailAddress', 'Validation attribute that checks email format.', 'Models'],
  ['Entity', 'A class that maps to data stored in a database.', 'EF Core'],
  ['Entity Framework Core', 'Microsoft ORM for .NET applications.', 'EF Core'],
  ['Eager loading', 'Loading related data immediately using `Include()`.', 'Relations'],
  ['Foreign key', 'A property that links one entity to another, such as `DeptId`.', 'Relations'],
  ['IActionResult', 'A flexible action return type that can represent multiple HTTP responses.', 'MVC'],
  ['Include', 'EF Core method used to load related entities with the main query.', 'Relations'],
  ['Index action', 'The CRUD action that usually lists all records.', 'CRUD'],
  ['In-memory list', 'A temporary collection stored in application memory instead of a database.', 'CRUD'],
  ['Key', 'Attribute that marks a property as the primary key.', 'Relations'],
  ['Layout', 'Shared Razor shell defined in `_Layout.cshtml`.', 'Razor'],
  ['MapControllerRoute', 'Configures conventional MVC routing in `Program.cs`.', 'MVC'],
  ['Migration', 'A generated class that describes schema changes for a database.', 'EF Core'],
  ['Model', 'The MVC component that represents data and rules.', 'MVC'],
  ['ModelState', 'Holds validation results during model binding.', 'MVC'],
  ['NotFound', 'A result indicating the requested resource does not exist.', 'MVC'],
  ['Post/Redirect/Get', 'Pattern where a successful POST redirects to another action.', 'CRUD'],
  ['Program.cs', 'The application startup file in modern ASP.NET Core apps.', 'MVC'],
  ['Range', 'Validation attribute that constrains numeric values.', 'Models'],
  ['Razor', 'View syntax that mixes HTML with C#.', 'Razor'],
  ['RedirectToAction', 'Returns a redirect response to another action.', 'MVC'],
  ['Required', 'Validation attribute that rejects empty input.', 'Models'],
  ['Route', 'URL pattern used to map requests to controllers and actions.', 'MVC'],
  ['Section Scripts', 'Razor section used to inject page-specific scripts.', 'Razor'],
  ['StringLength', 'Validation attribute that limits text length.', 'Models'],
  ['View', 'The MVC component that renders the UI.', 'MVC'],
  ['ViewData', 'A dictionary used to pass simple values from controller or view to the layout.', 'Razor'],
  ['ViewImports', 'Razor file used for shared namespaces and tag helper imports.', 'Razor']
];

const appState = {
  current: 'home',
  visited: new Set(['home']),
  quizItems: [],
  quizIndex: 0,
  quizScore: 0,
  quizAnswered: false,
  employees: [
    { id: 1, firstName: 'Faris', lastName: 'Taweel', email: 'f@company.com', department: 'IT', salary: 32000, hireDate: '2024-02-10', mode: 'Permanent', password: 'Pass123', confirmPassword: 'Pass123' },
    { id: 2, firstName: 'Ahmad', lastName: 'Salameh', email: 'a@company.com', department: 'HR', salary: 26000, hireDate: '2023-09-01', mode: 'Contract', password: 'Pass456', confirmPassword: 'Pass456' }
  ],
  editId: null
};

function goTo(id) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));

  const page = document.getElementById(id);
  const link = document.querySelector(`.nav-item[data-page="${id}"]`);
  if (page) page.classList.add('active');
  if (link) link.classList.add('active');

  appState.current = id;
  appState.visited.add(id);
  updateProgress();
  closeSidebar();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (id === 'quiz') renderQuizLanding();
  if (id === 'glossary') renderGlossary();
}

function updateProgress() {
  const total = TOPICS.length;
  const done = [...appState.visited].filter(id => id !== 'home').length;
  const pct = Math.round((done / total) * 100);
  document.getElementById('progress-fill').style.width = `${pct}%`;
  document.getElementById('progress-pct').textContent = `${pct}%`;
}

function renderTopicCards() {
  const host = document.getElementById('topic-cards');
  host.innerHTML = TOPICS.map(topic => `
    <article class="topic-card" onclick="goTo('${topic.id}')">
      <h3>${topic.title}</h3>
      <p>${topic.desc.replace(/`/g, '')}</p>
    </article>
  `).join('');
}

function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebar-overlay').classList.add('visible');
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebar-overlay').classList.remove('visible');
}

function validateEmployee(formData) {
  const errors = [];
  if (!formData.firstName || formData.firstName.trim().length < 2 || formData.firstName.trim().length > 20) {
    errors.push('First Name must be between 2 and 20 characters.');
  }
  if (!formData.lastName || formData.lastName.trim().length < 2 || formData.lastName.trim().length > 20) {
    errors.push('Last Name must be between 2 and 20 characters.');
  }
  if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Email must be in a valid format.');
  }
  const salary = Number(formData.salary);
  if (Number.isNaN(salary) || salary < 10000 || salary > 50000) {
    errors.push('Salary must be between 10000 and 50000.');
  }
  if (!formData.hireDate) {
    errors.push('Hire Date is required.');
  }
  if (!formData.password) {
    errors.push('Password is required.');
  }
  if (formData.password !== formData.confirmPassword) {
    errors.push('Password and Confirm Password must match.');
  }
  return errors;
}

function renderEmployees() {
  const body = document.getElementById('employee-table-body');
  body.innerHTML = appState.employees.map(employee => `
    <tr>
      <td>${employee.firstName} ${employee.lastName}</td>
      <td>${employee.email}</td>
      <td>${employee.department}</td>
      <td>$${Number(employee.salary).toLocaleString()}</td>
      <td>${employee.mode}</td>
      <td>
        <div class="action-row">
          <button class="mini-btn" data-edit="${employee.id}">Edit</button>
          <button class="mini-btn delete" data-delete="${employee.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  body.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => startEdit(Number(btn.dataset.edit)));
  });
  body.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => removeEmployee(Number(btn.dataset.delete)));
  });
}

function resetForm() {
  document.getElementById('employee-form').reset();
  document.getElementById('employee-id').value = '';
  document.getElementById('form-title').textContent = 'Create Employee';
  appState.editId = null;
  showFormErrors([]);
}

function showFormErrors(errors) {
  const box = document.getElementById('form-errors');
  if (!errors.length) {
    box.classList.remove('visible');
    box.innerHTML = '';
    return;
  }
  box.classList.add('visible');
  box.innerHTML = errors.map(error => `<div>${error}</div>`).join('');
}

function startEdit(id) {
  const employee = appState.employees.find(item => item.id === id);
  if (!employee) return;
  appState.editId = id;
  document.getElementById('form-title').textContent = `Edit Employee #${id}`;
  document.getElementById('employee-id').value = employee.id;
  document.getElementById('first-name').value = employee.firstName;
  document.getElementById('last-name').value = employee.lastName;
  document.getElementById('email').value = employee.email;
  document.getElementById('department').value = employee.department;
  document.getElementById('salary').value = employee.salary;
  document.getElementById('hire-date').value = employee.hireDate;
  document.getElementById('password').value = employee.password;
  document.getElementById('confirm-password').value = employee.confirmPassword;
  document.getElementById('mode').value = employee.mode;
  showFormErrors([]);
  goTo('demo');
}

function removeEmployee(id) {
  const employee = appState.employees.find(item => item.id === id);
  if (!employee) return;
  const ok = window.confirm(`Delete ${employee.firstName} ${employee.lastName}?`);
  if (!ok) return;
  appState.employees = appState.employees.filter(item => item.id !== id);
  renderEmployees();
  if (appState.editId === id) resetForm();
}

function initEmployeeForm() {
  const form = document.getElementById('employee-form');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const formData = {
      firstName: document.getElementById('first-name').value.trim(),
      lastName: document.getElementById('last-name').value.trim(),
      email: document.getElementById('email').value.trim(),
      department: document.getElementById('department').value.trim(),
      salary: document.getElementById('salary').value,
      hireDate: document.getElementById('hire-date').value,
      password: document.getElementById('password').value,
      confirmPassword: document.getElementById('confirm-password').value,
      mode: document.getElementById('mode').value
    };

    const errors = validateEmployee(formData);
    showFormErrors(errors);
    if (errors.length) return;

    if (appState.editId) {
      const employee = appState.employees.find(item => item.id === appState.editId);
      Object.assign(employee, formData, { salary: Number(formData.salary) });
    } else {
      const nextId = appState.employees.length ? Math.max(...appState.employees.map(item => item.id)) + 1 : 1;
      appState.employees.push({ id: nextId, ...formData, salary: Number(formData.salary) });
    }

    renderEmployees();
    resetForm();
  });

  document.getElementById('cancel-edit').addEventListener('click', resetForm);
}

function getFilteredQuizItems() {
  const filter = document.getElementById('quiz-filter').value;
  return filter === 'all' ? [...QUIZ] : QUIZ.filter(item => item.topic === filter);
}

function renderQuizLanding() {
  const area = document.getElementById('quiz-area');
  area.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-question">Choose a topic filter and start when ready.</div>
      <p class="muted">The quiz uses ${QUIZ.length} questions across MVC basics, models, CRUD, Razor, EF Core, and relationships.</p>
    </div>
  `;
}

function startQuiz() {
  appState.quizItems = getFilteredQuizItems();
  appState.quizIndex = 0;
  appState.quizScore = 0;
  appState.quizAnswered = false;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const area = document.getElementById('quiz-area');
  const total = appState.quizItems.length;
  if (!total) {
    area.innerHTML = '<div class="quiz-card">No questions found for this topic filter.</div>';
    return;
  }

  if (appState.quizIndex >= total) {
    area.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-question">Quiz complete.</div>
        <p class="quiz-explanation">Score: ${appState.quizScore} / ${total}</p>
        <button class="btn-primary" id="restart-quiz">Try Again</button>
      </div>
    `;
    document.getElementById('restart-quiz').addEventListener('click', startQuiz);
    return;
  }

  const item = appState.quizItems[appState.quizIndex];
  area.innerHTML = `
    <div class="quiz-card">
      <div class="quiz-meta">Question ${appState.quizIndex + 1} of ${total} · ${item.topic}</div>
      <div class="quiz-question">${item.q}</div>
      <div class="quiz-options">
        ${item.opts.map((opt, index) => `<button class="quiz-option" data-index="${index}">${opt}</button>`).join('')}
      </div>
      <div id="quiz-feedback"></div>
    </div>
  `;

  area.querySelectorAll('.quiz-option').forEach(button => {
    button.addEventListener('click', () => answerQuizQuestion(Number(button.dataset.index)));
  });
}

function answerQuizQuestion(choice) {
  if (appState.quizAnswered) return;
  appState.quizAnswered = true;
  const item = appState.quizItems[appState.quizIndex];
  const buttons = [...document.querySelectorAll('.quiz-option')];
  buttons.forEach(button => {
    const index = Number(button.dataset.index);
    if (index === item.ans) button.classList.add('correct');
    if (index === choice && index !== item.ans) button.classList.add('wrong');
    button.disabled = true;
  });

  if (choice === item.ans) appState.quizScore += 1;

  const feedback = document.getElementById('quiz-feedback');
  feedback.innerHTML = `
    <div class="quiz-explanation">${item.exp}</div>
    <button class="btn-primary" id="next-question">${appState.quizIndex === appState.quizItems.length - 1 ? 'Finish Quiz' : 'Next Question'}</button>
  `;
  document.getElementById('next-question').addEventListener('click', () => {
    appState.quizIndex += 1;
    appState.quizAnswered = false;
    renderQuizQuestion();
  });
}

function renderGlossary() {
  const query = document.getElementById('glossary-search').value.trim().toLowerCase();
  const host = document.getElementById('glossary-grid');
  const filtered = GLOSSARY.filter(([term, def, tag]) =>
    [term, def, tag].some(part => part.toLowerCase().includes(query))
  );

  host.innerHTML = filtered.map(([term, def, tag]) => `
    <article class="glossary-card">
      <h3>${term}</h3>
      <p>${def}</p>
      <span class="tag">${tag}</span>
    </article>
  `).join('');
}

function initTheme() {
  const saved = localStorage.getItem('aspnet-study-theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('aspnet-study-theme', next);
  });
}

function initParticles() {
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(143, 220, 240, 0.7)';
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

function initEvents() {
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      goTo(link.dataset.page);
    });
  });

  document.getElementById('hamburger').addEventListener('click', openSidebar);
  document.getElementById('sidebar-overlay').addEventListener('click', closeSidebar);
  document.getElementById('start-quiz').addEventListener('click', startQuiz);
  document.getElementById('quiz-filter').addEventListener('change', renderQuizLanding);
  document.getElementById('glossary-search').addEventListener('input', renderGlossary);
}

function injectPracticeLabs() {
  const nav = document.querySelector('.sidebar-nav');
  const quizLink = document.querySelector('[data-page="quiz"]');
  ['routinglab', 'migrationlab', 'validationlab', 'efquerylab'].forEach(id => {
    if (!document.querySelector(`[data-page="${id}"]`)) {
      const topic = TOPICS.find(t => t.id === id);
      const link = document.createElement('a');
      link.href = `#${id}`;
      link.className = 'nav-item';
      link.dataset.page = id;
      link.textContent = topic.title;
      nav.insertBefore(link, quizLink);
    }
  });

  const main = document.getElementById('main');
  const quiz = document.getElementById('quiz');
  if (document.getElementById('routinglab')) return;

  main.insertBefore(htmlToElement(`<section class="page" id="routinglab"><div class="section-pad"><div class="chapter-hero"><span class="eyebrow">10</span><h1>Routing Lab</h1><p>Type an MVC URL and inspect the controller, action, and optional id that conventional routing would infer.</p></div><div class="content-grid two"><article class="panel"><h3>Try A Route</h3><label class="form-label">URL path<input id="route-input" type="text" value="/Employees/Edit/5"></label><button class="btn-primary" onclick="parseMvcRoute()">Parse Route</button></article><article class="panel"><h3>Route Result</h3><div id="route-result" class="result-box"></div></article></div></div></section>`), quiz);
  main.insertBefore(htmlToElement(`<section class="page" id="migrationlab"><div class="section-pad"><div class="chapter-hero"><span class="eyebrow">11</span><h1>Migration Lab</h1><p>Select a model change and see the EF Core commands and migration effect.</p></div><div class="content-grid two"><article class="panel"><h3>Model Change</h3><label class="check-row"><input type="radio" name="migration-choice" value="add" checked> Add Student.Email</label><label class="check-row"><input type="radio" name="migration-choice" value="rename"> Rename Program to Major</label><label class="check-row"><input type="radio" name="migration-choice" value="relation"> Add Department relationship</label><button class="btn-primary" onclick="renderMigrationPlan()">Build Migration Plan</button></article><article class="panel"><h3>Generated Plan</h3><pre><code id="migration-result"></code></pre></article></div></div></section>`), quiz);
  main.insertBefore(htmlToElement(`<section class="page" id="validationlab"><div class="section-pad"><div class="chapter-hero"><span class="eyebrow">12</span><h1>Validation Trainer</h1><p>Practice the same Data Annotation rules used by the Employee model.</p></div><div class="content-grid two"><article class="panel"><h3>Employee Input</h3><label class="form-label">First name<input id="val-first" value="A"></label><label class="form-label">Email<input id="val-email" value="bad-email"></label><label class="form-label">Salary<input id="val-salary" type="number" value="9000"></label><label class="form-label">Password<input id="val-pass" type="password" value="Pass123"></label><label class="form-label">Confirm password<input id="val-confirm" type="password" value="Pass321"></label><button class="btn-primary" onclick="runValidationTrainer()">Run ModelState</button></article><article class="panel"><h3>ModelState Output</h3><div id="validation-result" class="result-box"></div></article></div></div></section>`), quiz);
  main.insertBefore(htmlToElement(`<section class="page" id="efquerylab"><div class="section-pad"><div class="chapter-hero"><span class="eyebrow">13</span><h1>EF Query Builder</h1><p>Compose common EF Core query shapes from the Company and TestDB examples.</p></div><div class="content-grid two"><article class="panel"><h3>Query Options</h3><label class="check-row"><input type="checkbox" id="q-include" checked> Include employees</label><label class="check-row"><input type="checkbox" id="q-filter"> Filter active departments</label><label class="check-row"><input type="checkbox" id="q-order" checked> Order by name</label><label class="check-row"><input type="checkbox" id="q-project"> Project DTO</label><button class="btn-primary" onclick="buildEfQuery()">Build Query</button></article><article class="panel"><h3>Generated EF Core</h3><pre><code id="query-result"></code></pre></article></div></div></section>`), quiz);

  parseMvcRoute();
  renderMigrationPlan();
  runValidationTrainer();
  buildEfQuery();
}

function htmlToElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

function parseMvcRoute() {
  const raw = document.getElementById('route-input')?.value || '/Home/Index';
  const parts = raw.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  const controller = parts[0] || 'Home';
  const action = parts[1] || 'Index';
  const id = parts[2] || '(none)';
  document.getElementById('route-result').innerHTML = `
    <div class="metric"><span>${controller}Controller</span><small>Controller</small></div>
    <div class="metric"><span>${action}()</span><small>Action</small></div>
    <div class="metric"><span>${id}</span><small>Optional id</small></div>
    <p class="muted">Matched pattern: {controller=Home}/{action=Index}/{id?}</p>
  `;
}

function renderMigrationPlan() {
  const choice = document.querySelector('input[name="migration-choice"]:checked')?.value || 'add';
  const snippets = {
    add: `// 1. Update model\npublic string? Email { get; set; }\n\n// 2. Create migration\nAdd-Migration AddStudentEmail\n\n// 3. Apply database change\nUpdate-Database`,
    rename: `// 1. Rename property carefully\npublic string? Major { get; set; }\n\n// 2. Create migration\nAdd-Migration RenameProgramToMajor\n\n// 3. Check generated migration for RenameColumn\nUpdate-Database`,
    relation: `// 1. Add navigation properties\npublic int DeptId { get; set; }\npublic Department? Department { get; set; }\n\n// 2. Create migration\nAdd-Migration AddDepartmentRelationship\n\n// 3. Apply foreign key\nUpdate-Database`,
  };
  document.getElementById('migration-result').textContent = snippets[choice];
}

function runValidationTrainer() {
  const errors = [];
  const first = document.getElementById('val-first').value.trim();
  const email = document.getElementById('val-email').value.trim();
  const salary = Number(document.getElementById('val-salary').value);
  const pass = document.getElementById('val-pass').value;
  const confirm = document.getElementById('val-confirm').value;
  if (first.length < 2 || first.length > 20) errors.push('[StringLength] First name must be 2 to 20 characters.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('[EmailAddress] Email format is invalid.');
  if (Number.isNaN(salary) || salary < 10000 || salary > 50000) errors.push('[Range] Salary must be between 10000 and 50000.');
  if (pass !== confirm) errors.push('[Compare] Password and confirmation must match.');
  document.getElementById('validation-result').innerHTML = errors.length
    ? errors.map(error => `<div class="error-line">${error}</div>`).join('')
    : '<div class="success-line">ModelState.IsValid == true</div>';
}

function buildEfQuery() {
  const lines = ['var query = context.Departments'];
  if (document.getElementById('q-include').checked) lines.push('    .Include(d => d.employees)');
  if (document.getElementById('q-filter').checked) lines.push('    .Where(d => d.employees.Any())');
  if (document.getElementById('q-order').checked) lines.push('    .OrderBy(d => d.DeptName)');
  if (document.getElementById('q-project').checked) lines.push('    .Select(d => new { d.DeptId, d.DeptName, Count = d.employees.Count() })');
  lines.push('    .ToList();');
  document.getElementById('query-result').textContent = lines.join('\n');
}

injectPracticeLabs();
renderTopicCards();
renderEmployees();
initEmployeeForm();
initTheme();
initParticles();
initEvents();
updateProgress();
