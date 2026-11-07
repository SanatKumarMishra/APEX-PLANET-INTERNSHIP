const contactForm = document.querySelector("#contactForm");
const formStatus = document.querySelector("#formStatus");
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = contactForm.elements.name.value.trim();
  const email = contactForm.elements.email.value.trim();
  const message = contactForm.elements.message.value.trim();
  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    formStatus.textContent = "Please enter a name, a valid email, and a message of at least 10 characters.";
    return;
  }
  formStatus.textContent = `Thanks, ${name}. The form passed validation (demo only; no message was sent).`;
  contactForm.reset();
});

const todoForm = document.querySelector("#todoForm");
const taskInput = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");
const todoEmpty = document.querySelector("#todoEmpty");
let tasks = [];
function renderTasks() {
  taskList.innerHTML = "";
  todoEmpty.hidden = tasks.length > 0;
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `item-row ${task.done ? "task-done" : ""}`;
    const label = document.createElement("span");
    label.textContent = task.text;
    const actions = document.createElement("div");
    actions.className = "task-actions";
    const toggle = document.createElement("button");
    toggle.type = "button"; toggle.textContent = task.done ? "Undo" : "Done";
    toggle.addEventListener("click", () => { task.done = !task.done; renderTasks(); });
    const remove = document.createElement("button");
    remove.type = "button"; remove.className = "danger"; remove.textContent = "Remove";
    remove.addEventListener("click", () => { tasks = tasks.filter((item) => item.id !== task.id); renderTasks(); });
    actions.append(toggle, remove); li.append(label, actions); taskList.append(li);
  });
}
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.push({ id: crypto.randomUUID(), text, done: false });
  taskInput.value = ""; renderTasks(); taskInput.focus();
});
renderTasks();
