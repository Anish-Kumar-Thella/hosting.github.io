// ==== Main Sections ====
const heroSection = document.getElementById("heroSection");
const toolsGrid = document.getElementById("toolsGrid");

// Tool Containers
const todoContainer = document.getElementById("todoContainer");
const calcContainer = document.getElementById("calcContainer");
const convContainer = document.getElementById("convContainer");
const timerContainer = document.getElementById("timerContainer");
const strategyContainer = document.getElementById("strategyContainer");
const notesContainer = document.getElementById("notesContainer");
const quoteContainer = document.getElementById("quoteContainer");
const calendarContainer = document.getElementById("calendarContainer");

// Menu Buttons
const menuTodo = document.getElementById("menuTodo");
const menuCalc = document.getElementById("menuCalc");
const menuConv = document.getElementById("menuConv");
const menuTimer = document.getElementById("menuTimer");
const menuStrategy = document.getElementById("menuStrategy");
const menuNotes = document.getElementById("menuNotes");
const menuQuote = document.getElementById("menuQuote");
const menuCalendar = document.getElementById("menuCalendar");

// Tool Cards
const cardTodo = document.getElementById("cardTodo");
const cardCalc = document.getElementById("cardCalc");
const cardConv = document.getElementById("cardConv");
const cardTimer = document.getElementById("cardTimer");
const cardStrategy = document.getElementById("cardStrategy");
const cardNotes = document.getElementById("cardNotes");
const cardQuote = document.getElementById("cardQuote");
const cardCalendar = document.getElementById("cardCalendar");

// Switch function
function showSection(section) {
  // Hide all sections
  heroSection.style.display = "none";
  toolsGrid.style.display = "none";
  todoContainer.style.display = "none";
  calcContainer.style.display = "none";
  convContainer.style.display = "none";
  timerContainer.style.display = "none";
  strategyContainer.style.display = "none";
  notesContainer.style.display = "none";
  quoteContainer.style.display = "none";
  calendarContainer.style.display = "none";

  // Show selected section
  if (section) {
    section.style.display = "block";
  } else {
    heroSection.style.display = "block";
    toolsGrid.style.display = "grid";
  }
  
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==== NAVIGATION ====
menuTodo.addEventListener("click", () => showSection(todoContainer));
cardTodo.addEventListener("click", () => showSection(todoContainer));
menuCalc.addEventListener("click", () => showSection(calcContainer));
cardCalc.addEventListener("click", () => showSection(calcContainer));
menuConv.addEventListener("click", () => showSection(convContainer));
cardConv.addEventListener("click", () => showSection(convContainer));
menuTimer.addEventListener("click", () => showSection(timerContainer));
cardTimer.addEventListener("click", () => showSection(timerContainer));
menuStrategy.addEventListener("click", () => showSection(strategyContainer));
cardStrategy.addEventListener("click", () => showSection(strategyContainer));
menuNotes.addEventListener("click", () => showSection(notesContainer));
cardNotes.addEventListener("click", () => showSection(notesContainer));
menuQuote.addEventListener("click", () => showSection(quoteContainer));
cardQuote.addEventListener("click", () => showSection(quoteContainer));
menuCalendar.addEventListener("click", () => showSection(calendarContainer));
cardCalendar.addEventListener("click", () => showSection(calendarContainer));

// Home navigation (clicking logo)
document.querySelector('.logo').addEventListener('click', () => showSection());

/* ===========================================================
   TO-DO LIST
=========================================================== */
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const todoList = document.getElementById("todoList");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");

addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task !== "") {
    tasks.push({ text: task, completed: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTaskBtn.click();
  }
});

function renderTasks() {
  todoList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    const span = document.createElement("span");
    span.textContent = task.text;

    const btnGroup = document.createElement("div");
    btnGroup.className = "btn-group";

    const doneBtn = document.createElement("button");
    doneBtn.textContent = task.completed ? "Undo" : "Done";
    doneBtn.className = "done-btn";
    doneBtn.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    };

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete-btn";
    delBtn.onclick = () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    btnGroup.appendChild(doneBtn);
    btnGroup.appendChild(delBtn);
    li.appendChild(span);
    li.appendChild(btnGroup);
    todoList.appendChild(li);
  });
  updateProgress();
}

function updateProgress() {
  if (tasks.length === 0) {
    progressFill.style.width = "0%";
    progressText.textContent = "0% completed";
    return;
  }
  const completedTasks = tasks.filter(t => t.completed).length;
  const percent = Math.round((completedTasks / tasks.length) * 100);
  progressFill.style.width = percent + "%";
  progressText.textContent = `${percent}% completed (${completedTasks}/${tasks.length} tasks)`;
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial render
renderTasks();

/* ===========================================================
   CALCULATOR
=========================================================== */
const display = document.getElementById("calcDisplay");
const buttons = document.querySelectorAll(".calculator-buttons button");

let currentInput = "0";
let previousInput = null;
let operation = null;
let shouldResetScreen = false;

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;

    if (btn.classList.contains("clear")) {
      currentInput = "0";
      previousInput = null;
      operation = null;
    } else if (btn.classList.contains("operator")) {
      if (previousInput !== null) {
        calculate();
      }
      previousInput = currentInput;
      operation = value;
      shouldResetScreen = true;
    } else if (btn.classList.contains("equals")) {
      if (previousInput !== null && operation !== null) {
        calculate();
        operation = null;
      }
    } else {
      if (currentInput === "0" || shouldResetScreen) {
        currentInput = value;
        shouldResetScreen = false;
      } else {
        currentInput += value;
      }
    }

    display.textContent = currentInput;
  });
});

function calculate() {
  let result;
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);

  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      result = prev + current;
      break;
    case '-':
      result = prev - current;
      break;
    case '*':
      result = prev * current;
      break;
    case '/':
      result = prev / current;
      break;
    default:
      return;
  }

  currentInput = result.toString();
  previousInput = null;
}

/* ===========================================================
   CONVERSION TOOL
=========================================================== */
const convCategory = document.getElementById("convCategory");
const convFrom = document.getElementById("convFrom");
const convTo = document.getElementById("convTo");
const convInput = document.getElementById("convInput");
const convertBtn = document.getElementById("convertBtn");
const convResult = document.getElementById("convResult");

const units = {
  length: ["m", "cm", "mm", "km", "in", "ft", "yd", "mi"],
  temperature: ["°C", "°F", "K"],
  weight: ["kg", "g", "mg", "lb", "oz"]
};

function updateUnitOptions(category) {
  convFrom.innerHTML = "";
  convTo.innerHTML = "";
  units[category].forEach((u) => {
    const opt1 = document.createElement("option");
    opt1.value = u;
    opt1.textContent = u;
    convFrom.appendChild(opt1);
    
    const opt2 = document.createElement("option");
    opt2.value = u;
    opt2.textContent = u;
    convTo.appendChild(opt2);
  });
  convFrom.selectedIndex = 0;
  convTo.selectedIndex = 1;
}

updateUnitOptions(convCategory.value);
convCategory.addEventListener("change", () => updateUnitOptions(convCategory.value));

function convert(value, from, to, category) {
  let result = value;
  
  if (category === "length") {
    // Convert to meters first
    const toMeters = {
      m: 1,
      cm: 0.01,
      mm: 0.001,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      yd: 0.9144,
      mi: 1609.34
    };
    
    result = value * toMeters[from];
    result = result / toMeters[to];
  } else if (category === "temperature") {
    // Convert to Celsius first
    if (from === "°C") {
      if (to === "°F") result = (value * 9/5) + 32;
      else if (to === "K") result = value + 273.15;
    } else if (from === "°F") {
      result = (value - 32) * 5/9;
      if (to === "K") result += 273.15;
    } else if (from === "K") {
      result = value - 273.15;
      if (to === "°F") result = (result * 9/5) + 32;
    }
  } else if (category === "weight") {
    // Convert to grams first
    const toGrams = {
      kg: 1000,
      g: 1,
      mg: 0.001,
      lb: 453.592,
      oz: 28.3495
    };
    
    result = value * toGrams[from];
    result = result / toGrams[to];
  }
  
  return result;
}

convertBtn.addEventListener("click", () => {
  const value = parseFloat(convInput.value);
  if (isNaN(value)) {
    convResult.textContent = "Please enter a valid number.";
    return;
  }
  
  const category = convCategory.value;
  const from = convFrom.value;
  const to = convTo.value;
  
  const result = convert(value, from, to, category);
  convResult.textContent = `${value} ${from} = ${result.toFixed(6)} ${to}`;
});

/* ===========================================================
   TIMER
=========================================================== */
const timeDisplay = document.getElementById("timeDisplay");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const minutesInput = document.getElementById("minutesInput");
const secondsInput = document.getElementById("secondsInput");
const presets = document.querySelectorAll(".presets button");
const timerProgress = document.getElementById("timerProgress");
const tabTimer = document.getElementById("tabTimer");
const tabStopwatch = document.getElementById("tabStopwatch");

let timerInterval;
let totalTime = 1500; // 25 minutes in seconds
let remainingTime = totalTime;
let isRunning = false;
let mode = "timer";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(remainingTime);
  
  if (mode === "timer") {
    const progress = ((totalTime - remainingTime) / totalTime) * 100;
    timerProgress.style.width = progress + "%";
  } else {
    timerProgress.style.width = "0%";
  }
}

function startTimer() {
  if (isRunning) return;
  
  isRunning = true;
  timerInterval = setInterval(() => {
    if (mode === "timer") {
      if (remainingTime > 0) {
        remainingTime--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        alert("⏰ Time's up!");
      }
    } else { // Stopwatch mode
      remainingTime++;
      updateDisplay();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  
  if (mode === "timer") {
    remainingTime = totalTime;
  } else {
    remainingTime = 0;
  }
  
  updateDisplay();
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

presets.forEach(btn => {
  btn.addEventListener("click", () => {
    const minutes = parseInt(btn.dataset.min);
    totalTime = minutes * 60;
    remainingTime = totalTime;
    updateDisplay();
  });
});

minutesInput.addEventListener("change", () => {
  totalTime = (parseInt(minutesInput.value) * 60) + parseInt(secondsInput.value);
  remainingTime = totalTime;
  updateDisplay();
});

secondsInput.addEventListener("change", () => {
  totalTime = (parseInt(minutesInput.value) * 60) + parseInt(secondsInput.value);
  remainingTime = totalTime;
  updateDisplay();
});

tabTimer.addEventListener("click", () => {
  tabTimer.classList.add("active");
  tabStopwatch.classList.remove("active");
  mode = "timer";
  totalTime = 1500;
  remainingTime = totalTime;
  updateDisplay();
});

tabStopwatch.addEventListener("click", () => {
  tabStopwatch.classList.add("active");
  tabTimer.classList.remove("active");
  mode = "stopwatch";
  totalTime = 0;
  remainingTime = 0;
  updateDisplay();
});

// Initial display
updateDisplay();

/* ===========================================================
   STRATEGY TIMER
=========================================================== */
const pomodoroBtn = document.getElementById("pomodoroBtn");
const triangleBtn = document.getElementById("triangleBtn");
const strategyTime = document.getElementById("strategyTime");
const strategyProgress = document.getElementById("strategyProgress");
const strategyStartBtn = document.getElementById("strategyStartBtn");
const strategyResetBtn = document.getElementById("strategyResetBtn");
const strategyDetails = document.getElementById("strategyDetails");
const phaseLabel = document.getElementById("phaseLabel");
const completedCyclesEl = document.getElementById("completedCycles");
const workSessionsEl = document.getElementById("workSessions");

let workDuration, shortBreak, longBreak, cyclesUntilLong;
let currentPhase = "work";
let strategyTimeLeft = 0;
let cycleCount = 0;
let workSessions = 0;
let strategyInterval;
let strategyRunning = false;

function formatMMSS(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, "0");
  const s = (sec % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function updateStrategyDisplay() {
  strategyTime.textContent = formatMMSS(strategyTimeLeft);
  
  let total = currentPhase === "work" ? workDuration :
             currentPhase === "shortBreak" ? shortBreak : longBreak;
  
  strategyProgress.style.width = ((total - strategyTimeLeft) / total) * 100 + "%";
  completedCyclesEl.textContent = cycleCount;
  workSessionsEl.textContent = workSessions;
}

function setStrategy(type) {
  if (type === "pomodoro") {
    workDuration = 25 * 60;
    shortBreak = 5 * 60;
    longBreak = 15 * 60;
    cyclesUntilLong = 4;
    strategyDetails.textContent = "Work sessions: 25 minutes | Short breaks: 5 minutes | Long breaks: 15 minutes | Cycles until long break: 4";
  } else {
    workDuration = 45 * 60;
    shortBreak = 15 * 60;
    longBreak = 30 * 60;
    cyclesUntilLong = 3;
    strategyDetails.textContent = "Work sessions: 45 minutes | Short breaks: 15 minutes | Long breaks: 30 minutes | Cycles until long break: 3";
  }

  pomodoroBtn.classList.toggle("active", type === "pomodoro");
  triangleBtn.classList.toggle("active", type === "triangle");

  clearInterval(strategyInterval);
  strategyRunning = false;
  cycleCount = 0;
  workSessions = 0;
  currentPhase = "work";
  strategyTimeLeft = workDuration;
  phaseLabel.textContent = "🎯 Focus Time";
  updateStrategyDisplay();
}

strategyStartBtn.addEventListener("click", () => {
  if (strategyRunning) {
    clearInterval(strategyInterval);
    strategyRunning = false;
    strategyStartBtn.textContent = "▶ Start";
    return;
  }
  
  strategyRunning = true;
  strategyStartBtn.textContent = "⏸ Pause";
  
  strategyInterval = setInterval(() => {
    if (strategyTimeLeft > 0) {
      strategyTimeLeft--;
      updateStrategyDisplay();
    } else {
      clearInterval(strategyInterval);
      strategyRunning = false;
      strategyStartBtn.textContent = "▶ Start";

      if (currentPhase === "work") {
        workSessions++;
        
        if (workSessions % cyclesUntilLong === 0) {
          currentPhase = "longBreak";
          strategyTimeLeft = longBreak;
          phaseLabel.textContent = "🌴 Long Break";
        } else {
          currentPhase = "shortBreak";
          strategyTimeLeft = shortBreak;
          phaseLabel.textContent = "☕ Short Break";
        }
      } else {
        cycleCount++;
        currentPhase = "work";
        strategyTimeLeft = workDuration;
        phaseLabel.textContent = "🎯 Focus Time";
      }
      
      updateStrategyDisplay();
      
      if (strategyRunning) {
        strategyStartBtn.click();
      }
    }
  }, 1000);
});

strategyResetBtn.addEventListener("click", () => {
  clearInterval(strategyInterval);
  strategyRunning = false;
  strategyStartBtn.textContent = "▶ Start";
  
  currentPhase = "work";
  strategyTimeLeft = workDuration;
  phaseLabel.textContent = "🎯 Focus Time";
  updateStrategyDisplay();
});

pomodoroBtn.addEventListener("click", () => setStrategy("pomodoro"));
triangleBtn.addEventListener("click", () => setStrategy("triangle"));

// Init default strategy
setStrategy("pomodoro");

/* ===========================================================
   NOTES
=========================================================== */
const pdfUpload = document.getElementById("pdfUpload");
const downloadPdfBtn = document.getElementById("downloadPdfBtn");
const pdfViewer = document.getElementById("pdfViewer");

let uploadedPdfBlob = null;

pdfUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file && file.type === "application/pdf") {
    uploadedPdfBlob = file;
    const fileURL = URL.createObjectURL(file);
    pdfViewer.innerHTML = `<embed src="${fileURL}" type="application/pdf" width="100%" height="500px" />`;
  } else {
    pdfViewer.innerHTML = "<p>Please upload a valid PDF file.</p>";
  }
});

downloadPdfBtn.addEventListener("click", () => {
  if (!uploadedPdfBlob) {
    alert("⚠️ Please upload a PDF first.");
    return;
  }
  
  const link = document.createElement("a");
  link.href = URL.createObjectURL(uploadedPdfBlob);
  link.download = uploadedPdfBlob.name || "notes.pdf";
  link.click();
});

/* ===========================================================
   QUOTE GENERATOR
=========================================================== */
const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuoteBtn");
const addFavoriteBtn = document.getElementById("addFavoriteBtn");
const totalQuotesEl = document.getElementById("totalQuotes");
const favoriteQuotesEl = document.getElementById("favoriteQuotes");

const quotes = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" }
];

let totalQuotes = 0;
let favoriteQuotes = 0;
let currentQuote = null;

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  currentQuote = quotes[randomIndex];
  quoteText.textContent = `"${currentQuote.text}"`;
  quoteAuthor.textContent = `- ${currentQuote.author}`;
  totalQuotes++;
  totalQuotesEl.textContent = totalQuotes;
}

newQuoteBtn.addEventListener("click", generateQuote);
addFavoriteBtn.addEventListener("click", () => {
  if (currentQuote) {
    favoriteQuotes++;
    favoriteQuotesEl.textContent = favoriteQuotes;
    alert("Quote added to favorites!");
  }
});

// Initial quote
generateQuote();

/* ===========================================================
   CALENDAR
=========================================================== */
const currentMonthEl = document.getElementById("currentMonth");
const calendarGrid = document.getElementById("calendarGrid");
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
const todayBtn = document.getElementById("todayBtn");
const selectedDateEl = document.getElementById("selectedDate");
const reminderTitle = document.getElementById("reminderTitle");
const reminderDescription = document.getElementById("reminderDescription");
const addReminderBtn = document.getElementById("addReminderBtn");
const reminderList = document.getElementById("reminderList");

let currentDate = new Date();
let selectedDate = new Date();
let reminders = JSON.parse(localStorage.getItem('reminders')) || {};

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  currentMonthEl.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
  
  // Clear previous calendar
  calendarGrid.innerHTML = '';
  
  // Add day headers
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  daysOfWeek.forEach(day => {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell header';
    cell.textContent = day;
    calendarGrid.appendChild(cell);
  });
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Add empty cells for days before the first day
  for (let i = 0; i < firstDay; i++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell';
    calendarGrid.appendChild(cell);
  }
  
  // Add cells for each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('div');
    cell.className = 'calendar-cell';
    
    const dateNumber = document.createElement('div');
    dateNumber.className = 'date-number';
    dateNumber.textContent = day;
    cell.appendChild(dateNumber);
    
    const cellDate = new Date(year, month, day);
    const dateString = cellDate.toDateString();
    
    // Highlight today
    const today = new Date();
    if (cellDate.getDate() === today.getDate() && 
        cellDate.getMonth() === today.getMonth() && 
        cellDate.getFullYear() === today.getFullYear()) {
      cell.classList.add('today');
    }
    
    // Highlight selected date
    if (cellDate.getDate() === selectedDate.getDate() && 
        cellDate.getMonth() === selectedDate.getMonth() && 
        cellDate.getFullYear() === selectedDate.getFullYear()) {
      cell.classList.add('selected');
    }
    
    // Add reminder indicator
    if (reminders[dateString] && reminders[dateString].length > 0) {
      const reminderCount = document.createElement('div');
      reminderCount.className = 'reminder-indicator';
      reminderCount.textContent = reminders[dateString].length;
      cell.appendChild(reminderCount);
    }
    
    cell.addEventListener('click', () => {
      selectedDate = cellDate;
      selectedDateEl.textContent = cellDate.toLocaleDateString();
      renderCalendar();
      renderReminders();
    });
    
    calendarGrid.appendChild(cell);
  }
}

function renderReminders() {
  const dateString = selectedDate.toDateString();
  reminderList.innerHTML = '';
  
  if (reminders[dateString] && reminders[dateString].length > 0) {
    reminders[dateString].forEach((reminder, index) => {
      const item = document.createElement('div');
      item.className = 'reminder-item';
      item.innerHTML = `
        <h4>${reminder.title}</h4>
        <p>${reminder.description}</p>
        <button class="delete-reminder" data-date="${dateString}" data-index="${index}">
          <i class="fas fa-times"></i>
        </button>
      `;
      reminderList.appendChild(item);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-reminder').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const date = e.target.closest('.delete-reminder').dataset.date;
        const index = parseInt(e.target.closest('.delete-reminder').dataset.index);
        
        reminders[date].splice(index, 1);
        if (reminders[date].length === 0) {
          delete reminders[date];
        }
        
        localStorage.setItem('reminders', JSON.stringify(reminders));
        renderCalendar();
        renderReminders();
      });
    });
  } else {
    reminderList.innerHTML = '<div class="empty-state">No reminders for this date.</div>';
  }
}

prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

todayBtn.addEventListener('click', () => {
  currentDate = new Date();
  selectedDate = new Date();
  selectedDateEl.textContent = selectedDate.toLocaleDateString();
  renderCalendar();
  renderReminders();
});

addReminderBtn.addEventListener('click', () => {
  const title = reminderTitle.value.trim();
  const description = reminderDescription.value.trim();
  
  if (!title) {
    alert('Please enter a title for your reminder.');
    return;
  }
  
  const dateString = selectedDate.toDateString();
  
  if (!reminders[dateString]) {
    reminders[dateString] = [];
  }
  
  reminders[dateString].push({
    title,
    description
  });
  
  localStorage.setItem('reminders', JSON.stringify(reminders));
  
  reminderTitle.value = '';
  reminderDescription.value = '';
  
  renderCalendar();
  renderReminders();
});

// Initial render
selectedDateEl.textContent = selectedDate.toLocaleDateString();
renderCalendar();
renderReminders();

// Initialize the page
showSection();