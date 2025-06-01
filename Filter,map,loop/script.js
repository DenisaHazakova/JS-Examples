// Creation of array of objects with parameters id, age, firstname, surname, gender, employmentState
const people = [
  {
    id: 1,
    age: 20,
    firstname: "Alice",
    surname: "Smith",
    gender: "female",
    employmentState: "student",
  },
  {
    id: 2,
    age: 22,
    firstname: "Liam",
    surname: "Bennett",
    gender: "male",
    employmentState: "student",
  },
  {
    id: 3,
    age: 30,
    firstname: "Emily",
    surname: "Johnson",
    gender: "female",
    employmentState: "employed",
  },
  {
    id: 4,
    age: 45,
    firstname: "Michael",
    surname: "Brown",
    gender: "male",
    employmentState: "employed",
  },
  {
    id: 5,
    age: 38,
    firstname: "Laura",
    surname: "Garcia",
    gender: "female",
    employmentState: "employed",
  },
  {
    id: 6,
    age: 29,
    firstname: "Sarah",
    surname: "Davis",
    gender: "female",
    employmentState: "unemployed",
  },
  {
    id: 7,
    age: 33,
    firstname: "David",
    surname: "Wilson",
    gender: "male",
    employmentState: "unemployed",
  },
  {
    id: 8,
    age: 68,
    firstname: "James",
    surname: "Martinez",
    gender: "male",
    employmentState: "retired",
  },
  {
    id: 9,
    age: 72,
    firstname: "Olivia",
    surname: "Anderson",
    gender: "female",
    employmentState: "retired",
  },
  {
    id: 10,
    age: 40,
    firstname: "Robert",
    surname: "Taylor",
    gender: "male",
    employmentState: "employed",
  },
];

// To secure that functions will be invoked only when DOM will be fully loaded, we can use DOMContentLoaded
// and call them here
document.addEventListener("DOMContentLoaded", (event) => {
  renderPeople();
  renderEmployeeState();
});

// To secure that each employee status will be available only once 
// we need to remove the duplicates.
// With new Set() method we secure that duplicates will be removed. However, it gives an object
// with "..." we return only inside values
// with "[]" and the start we return array so we can use map
const uniqueEmploymentStates = [
  ...new Set(people.map((person) => person.employmentState)),
];

// Function return states of employees with dropdown
function renderEmployeeState() {
  // First we need to declare element select, creator of dropdown
  // It is parrent element of later created element option
  const select = document.getElementById("employmentStateList");

  // We loop through uniqueEmploymentStates (the result of map)
  // In this time we have array with only unique state values
  for (let state of uniqueEmploymentStates) {
    // We need to create child element "option" of select where we add the value of state
    const option = document.createElement("option");
    // Insertion of value state to element option
    option.innerHTML = state;
    // We need to append the created element option to its parent element select
    select.appendChild(option);
  }
}

// Function for rendering all persons from array of objects named people
function renderPeople() {
  // Firstly, we need to declare element unordered list into which will be the people values inserted
  const ul = document.getElementById("personList");

  // Looping through each object of people
  for (let person of people) {
    // Creating element li where the value of person will be inserted
    const li = document.createElement("li");

    // Into li element we are inserting the following values of person:
    // id, firstname, surname, gender and employmentState
    li.innerHTML = `${person.id} ${person.firstname} ${person.surname} ${person.gender} ${person.employmentState}`;
    // We need to append the filled child element li into its parent element ul
    ul.appendChild(li);
  }
}

// To ensure filter function will work even any input is empty
function isFormValueValid(formFieldValue, personValue) {
  // If form value is empty, return true
  // It is not necessary to check the form value
  if (formFieldValue.length === 0) {
    return true;
  }

  // Here we know that return is false which means that form value is not empty,
  // then we compare if its value is same as value from object person
  return formFieldValue == personValue;
}

// Function for check of age for each case
function checkAge(ageFrom, ageTo, age) {
  // Declaration of inputs of age if they are not empty
  let isAgeFromFilled = ageFrom.length > 0;
  let isAgeToFilled = ageTo.length > 0;

  // First condition: both inputs are empty
  if (!isAgeFromFilled && !isAgeToFilled) {
    // Do not check the values and filter other fields
    return true;
    // Second condition: both inputs are filled
  } else if (isAgeFromFilled && isAgeToFilled) {
    // Check if it meets the following condition
    return ageFrom <= age && ageTo >= age;
    // Third condition: only age from is filled
  } else if (isAgeFromFilled) {
    // Then only check if age from is less than age from object
    return ageFrom <= age;
    // Fourth condition: only age to is filled
  } else if (isAgeToFilled) {
    // Then only check if age to is greater than age from object
    return ageTo >= age;
  }
}

// After clicking the filer button
function onSubmit() {
  // Basic declaration of all inputs
  const firstName = document.getElementById("firstName").value;
  const surname = document.getElementById("surname").value;
  const ageFrom = document.getElementById("ageFrom").value;
  const ageTo = document.getElementById("ageTo").value;
  const employeeState = document.getElementById("dropdown").value;
  // vrati bud oznaceny radio input element ALEBO null
  const selectedGenderEl = document.querySelector(
    'input[name = "gender"]:checked'
  );

  // Using filter method to loop through whole array of objects - people where person is the object
  const filteredPeople = people.filter((person) => {
    
    // Check with function isFormValueValid (defined above) if input firstname is filled 
    const firstnameCheckPassed = isFormValueValid(firstName, person.firstname);
    // Check if input surname is filled
    const surnameCheckPassed = isFormValueValid(surname, person.surname);

    // Check if input gender is filled because it can return null or element
    let genderCheckPassed = true;
    // Below I know that it return an element
    if (selectedGenderEl) {
      // Compare if gender selected in form is the same as current gender of looped object person
      genderCheckPassed = selectedGenderEl.value === person.gender;
    }

    // Check if age inputs are filled
    const agePassed = checkAge(ageFrom, ageTo, person.age);

    // Check if selected status from form dropdown is the same as current state of looped object
    const employeePassed = employeeState === person.employmentState;

    return (
      // Return all matched values from looped array people
      firstnameCheckPassed &&
      surnameCheckPassed &&
      genderCheckPassed &&
      agePassed &&
      employeePassed
    );
  });

  
  const ul = document.getElementById("filteredList");

  for (const person of filteredPeople) {
    // All returned values from above return needs to be inserted into newly created li and then 
    // created li needs to be appended into its parent element ul
    const li = document.createElement("li");
    li.innerHTML = `${person.id} ${person.firstname} ${person.surname} ${person.gender} ${person.employmentState} ${person.age}`;
    ul.appendChild(li);
  }
}
