// On page load get habits from local storage and display them

console.log("habittrackersetup");

let habitData = JSON.parse(localStorage.getItem("habits")) || [];
console.log(habitData);

window.addEventListener("load", () => {});

const addHabitButton = document.getElementById("add-habit-button");
const habitForm = document.getElementById("habit-form");
const habitInput = document.getElementById("habit-input");
const habitContainer = document.getElementById("habit-container");

//Add habit button click event listener

addHabitButton.addEventListener("click", () => {
  console.log("Add Habit button clicked");
  // Create habit record
  const newHabit = {
    id: crypto.randomUUID(),
    name: habitInput.value,
    completed: false,
  };
  habitData.push(newHabit);

  const newHabitHTML = `
    <div class="habit box" id="${newHabit.id}">

    <div class="w-full max-w-sm shadow-xl rounded-lg p-6 bg-white mt-6 ml-6">
   <span id="habitId-${newHabit.id}">${newHabit.name}</span>
        <button id="complete-${newHabit.id}" class="complete-habit-button" onclick="onCompleteClick('${newHabit.id}')">Complete</button>
        <button id="delete-${newHabit.id}" class="delete-habit-button" onclick="onDeleteClick('${newHabit.id}')">Delete</button>
    </div>
     
    </div>
`
// Append new habit to the habit container
habitContainer.insertAdjacentHTML("beforeend", newHabitHTML);

// Add habit data to localStorage
localStorage.setItem("habits", JSON.stringify(habitData));
// Clear input field
habitInput.value = ""
});



// Funtion to repopulate habit list on page load
