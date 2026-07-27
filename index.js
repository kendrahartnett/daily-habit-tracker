// Load saved habits from localStorage when the app starts.
let habitData = JSON.parse(localStorage.getItem("habits")) || [];
console.log(habitData);

window.addEventListener("load", () => {
  handleListBuild();
});

const addHabitButton = document.getElementById("add-habit-button");
const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitContainer = document.getElementById("habit-container");
const completedContainer = document.getElementById("completed-container");
const garden = document.getElementById("garden");
const deleteAllCompletedButton = document.getElementById("delete-all-completed");
const deleteConfirmationModal = document.getElementById("delete-confirmation-modal");
const cancelDeleteButton = document.getElementById("cancel-delete");
const confirmDeleteButton = document.getElementById("confirm-delete");
const toastNotification = document.getElementById("toast-notification");


const buildHabitCard = (habit) => {
  if (habit.completed) {
    completedClass = "text-gray-400 manrope text-xs line-through";
  }
  return `
   <div class="box" id="${habit.id}">
    <div class="card-client">
          <p id="habitId-${habit.id}" class="name-client manrope">${habit.name}</p>
          <div class="social-media">
            <button id="complete-${habit.id}" class="mr-2" onclick="onCompleteClick('${habit.id}')">${checkIcon}</button>
            <button id="delete-${habit.id}" onclick="onDeleteClick('${habit.id}')">${trashIcon}</button>
          </div>
        </div>
        </div>
    `;
};

// Habit Icons
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z"/></svg>`;
const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z"/></svg>`;

//Add habit button click event listener
addHabitButton.addEventListener("click", () => {
  // Create habit record
  const newHabit = {
    id: crypto.randomUUID(),
    name: habitInput.value,
    completed: false,
    createdAt: new Date().toISOString(),

    // Future enhancements for habit tracking could include additional properties such as:
    // completedToday: false, // to track if the habit was completed today
    // streak: 0, // to track the number of consecutive days the habit has been completed
  };

  habitData.push(newHabit);

  const newHabitHTML = `
   <div class="box" id="${newHabit.id}">
    <div class="card-client">
          <p id="habitId-${newHabit.id}" class="name-client manrope">${newHabit.name}</p>
          <div class="social-media">
            <button id="complete-${newHabit.id}" class="mr-2" onclick="onCompleteClick('${newHabit.id}')">${checkIcon}</button>
            <button id="delete-${newHabit.id}" onclick="onDeleteClick('${newHabit.id}')">${trashIcon}</button>
          </div>
        </div>
        </div>`;

  // Append new habit to the habit container
  habitContainer.insertAdjacentHTML("beforeend", newHabitHTML);

  // Add habit data to localStorage
  localStorage.setItem("habits", JSON.stringify(habitData));

  habitInput.value = "";
});

// Rebuild the UI from the current application state.
const handleListBuild = () => {
  habitContainer.innerHTML = "";
  completedContainer.innerHTML = "";

  habitData.forEach((habit) => {
    let completedClass = "";
    const habitHTML = buildHabitCard(habit);

    if (habit.completed === true) {
      completedClass = "text-gray-400 line-through";
      const completedHabitHTML = `      
             <div class="box ml-4" id="${habit.id}">
                 <div class="w-full max-w-sm shadow-lg rounded p-2 bg-white mt-4 ml-2">
                <div class="mb-2">
                 <span class="">🌱</span>
                 <span id="habitId-${habit.id}" class="edu-font ${completedClass}">${habit.name}</span>
             </div>
             </div>
             </div>
        `;
      //   const reversedHabits = [...habitData].reverse();

      completedContainer.insertAdjacentHTML("beforeend", completedHabitHTML);
    } else {
      habitContainer.insertAdjacentHTML("beforeend", habitHTML);
    }
  });
};
handleListBuild();

// Flower bloom animation when habit is completed
const bloomFlower = () => {
  const flower = document.createElement("div");
  flower.classList.add("flower-bloom");
  document.getElementById("garden").appendChild(flower);
};

let doneHabit = "";

// Habit completion function
const onCompleteClick = (habitId) => {
  console.log(`Complete button clicked for habit ID: ${habitId}`);
  const habitIndex = habitData.findIndex((habit) => habit.id === habitId);

  const habit = habitData[habitIndex];

  if (!habit.completed) {
    habit.completed = true;
    bloomFlower();
    doneHabit = habitData[habitIndex];
    localStorage.setItem("habits", JSON.stringify(habitData));
    habitContainer.innerHTML = "";
    handleListBuild();
  }
};

// Habit deletion function
const onDeleteClick = (habitId) => {
  console.log(`Delete button clicked for habit ID: ${habitId}`);

  const habitToRemoveIndex = habitData.findIndex(
    (habit) => habit.id === habitId,
  );
  habitData.splice(habitToRemoveIndex, 1);
  localStorage.setItem("habits", JSON.stringify(habitData));
  habitContainer.innerHTML = "";
  handleListBuild();
  showToast("Habit deleted successfully!");
};

// Delete All Completed open modal
const onDeleteAllCompletedClick = () => {
  deleteConfirmationModal.classList.remove("hidden");
};

// Cancel delete hide modal
cancelDeleteButton.addEventListener("click", () => {
  deleteConfirmationModal.classList.add("hidden");
});

// Delete All habits confirmed function
confirmDeleteButton.addEventListener("click", () => {
  habitData = habitData.filter((habit) => !habit.completed);

  localStorage.setItem("habits", JSON.stringify(habitData));

  deleteConfirmationModal.classList.add("hidden");

  handleListBuild();

  showDeleteCompletedToast("Completed habits deleted.");
});

const showDeleteCompletedToast = (message) => {
  toastNotification.textContent = message;

  toastNotification.classList.remove("hidden");

  setTimeout(() => {
    toastNotification.classList.add("hidden");
  }, 3000);
};


// Function to show toast notification
const showToast = (message) => {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.remove("opacity-0");
  toast.classList.add("opacity-100");

  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
  }, 2500);
};
