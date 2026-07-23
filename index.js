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
const selectedFrequency = document.querySelector(
    'input[name="frequency"]:checked'
);


// Habit Icons
const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
</svg>`;

const trashIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>`;

//Add habit button click event listener
addHabitButton.addEventListener("click", () => {
//   console.log("Add Habit button clicked");
const selectedFrequency = document.querySelector(
    'input[name="frequency"]:checked'
);


console.log("selectedFrequency:", selectedFrequency);
console.log("selectedFrequency.value:", selectedFrequency.value);

  // Create habit record
  const newHabit = {
    id: crypto.randomUUID(),
    name: habitInput.value,
    completed: false,
    frequency: selectedFrequency, 
    createdAt: new Date().toISOString(),

    // Future enhancements for habit tracking could include additional properties such as:
    // completedToday: false, // to track if the habit was completed today
    // streak: 0, // to track the number of consecutive days the habit has been completed
  };
  habitData.push(newHabit);

  const newHabitHTML = `
    <div class="box" id="${newHabit.id}">

    <div class="w-full max-w-sm shadow-xl rounded-lg p-6 bg-white mt-6 ml-6">
    <div class="mb-2">
   <span id="habitId-${newHabit.id}" class="edu-font">${newHabit.name}</span>
   </div>

   <p class="text-sm text-gray-500">
    Frequency: ${newHabit.frequency}
</p>
        <button id="complete-${newHabit.id}" class="complete-habit-button bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-200" onclick="onCompleteClick('${newHabit.id}')">${checkIcon}</button>
      
      
        <button id="delete-${newHabit.id}" class="delete-habit-button bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-200" onclick="onDeleteClick('${newHabit.id}')">${trashIcon}</button>
    </div>
     
    </div>
`;
  // Append new habit to the habit container
  habitContainer.insertAdjacentHTML("beforeend", newHabitHTML);

  //   console.log(habitContainer);

  // Add habit data to localStorage
  localStorage.setItem("habits", JSON.stringify(habitData));
  // Clear input field
  habitInput.value = "";
});

// Rebuild the UI from the current application state.
const handleListBuild = () => {
  habitContainer.innerHTML = "";
  completedContainer.innerHTML = "";

  const reversedHabits = [...habitData].reverse();

  reversedHabits.forEach((habit) => {
    let completedClass = "";

    if (habit.completed) {
      completedClass = "text-gray-400";
      const completedHabitHTML = `
      
             <div class="box" id="${habit.id}">
             
        <div class="w-full max-w-sm shadow-xl rounded-lg p-6 bg-white mt-6 ml-6">
        
        <div class="mb-2">
       <span id="habitId-${habit.id}" class="edu-font ${completedClass}">${habit.name}</span>
       </div>
        `;

      completedContainer.insertAdjacentHTML("beforeend", completedHabitHTML);
    } else {
      const listHabits = `
        <div class="box" id="${habit.id}">
        <div class="w-full max-w-sm shadow-xl rounded-lg p-6 bg-white mt-6 ml-6">
        <div class="mb-2">
       <span id="habitId-${habit.id}" class="edu-font ${completedClass}">${habit.name}</span>
       </div>
            <button id="complete-${habit.id}" class="complete-habit-button bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-200" onclick="onCompleteClick('${habit.id}')">${checkIcon}</button>
            
            <button id="delete-${habit.id}" class="delete-habit-button bg-green-400 text-white py-2 px-4 rounded hover:bg-green-500 transition duration-200" onclick="onDeleteClick('${habit.id}')">${trashIcon}</button>`;

      habitContainer.insertAdjacentHTML("beforeend", listHabits);
    }
  });
};
handleListBuild();

// Flower bloom animation when habit is completed
const bloomFlower = () => {
  const flower = document.createElement("div");
  flower.classList.add("flower-bloom");
  document.getElementById("garden").appendChild(flower);
  setTimeout(() => {
    flower.remove();
  }, 4000); 
};

let doneHabit = "";

// Habit completion handler
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

// Habit deletion handler
const onDeleteClick = (habitId) => {
  console.log(`Delete button clicked for habit ID: ${habitId}`);

  const habitToRemoveIndex = habitData.findIndex((habit) => habit.id === habitId);
  habitData.splice(habitToRemoveIndex, 1);
  localStorage.setItem("habits", JSON.stringify(habitData));
  habitContainer.innerHTML = "";
  handleListBuild();
  showToast("Habit deleted successfully!");
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
}

