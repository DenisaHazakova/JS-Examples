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

document.addEventListener("DOMContentLoaded", (event) => {
  renderPeople();
  renderEmployeeState();
});

const uniqueEmploymentStates = [
  ...new Set(people.map((person) => person.employmentState)),
];

function renderEmployeeState() {
  const select = document.getElementById("employmentStateList");

  for (let state of uniqueEmploymentStates) {
    const option = document.createElement("option");
    option.innerHTML = state;
    select.appendChild(option);
  }
}

function renderPeople() {
  const ul = document.getElementById("personList");

  for (let person of people) {
    const li = document.createElement("li");

    li.innerHTML = `${person.id} ${person.firstname} ${person.surname} ${person.gender} ${person.employmentState}`;
    ul.appendChild(li);
  }
}

function isFormValueValid(formFieldValue, personValue) {
  // ak je hodnota vo formulari prazdna, nemusime kontrolovat - vraciame true
  // "ageFrom" === "" || "ageTo" === "" , ....
  if (formFieldValue.length === 0) {
    return true;
  }

  // hodnotu vyplnenu mame, kontrolujeme ci je zhodna s pouzivatelom
  return formFieldValue == personValue;
}

// kontrolujeme, ci vek cloveka splna vek vo filtri

function checkAge(ageFrom, ageTo, age) {
  let isAgeFromFilled = ageFrom.length > 0;
  let isAgeToFilled = ageTo.length > 0;
  //   if (isAgeFromFilled && isAgeToFilled) {
  //     return ageFrom <= age && ageTo >= age;
  //   } else {
  //     return ageFrom <= age || ageTo >= age;
  //   }
  if (!isAgeFromFilled && !isAgeToFilled) {
    return true;
  } else if (isAgeFromFilled && isAgeToFilled) {
    return ageFrom <= age && ageTo >= age;
  } else if (isAgeFromFilled) {
    return ageFrom <= age;
  } else if (isAgeToFilled) {
    return ageTo >= age;
  }
}

/**
 * 1. v HTML zobraz zoznam osob v ul liste (vsetky zaznamy)
 * 2. Vytvor vyhladavaci filter, ktory bude filtrovat podla jedneho/viacerych atributov:
 *    - vek (od, do input)
 *    - meno (input)
 *    - priezvisko (input)
 *    - pohlavie (radio button)
 *    - status zamestnania (dropdown) - pozor, musi byt automaticky vygenerovany podla dostupnych statusov
 *
 *    - filter sa spusti stlacenim buttonu
 *
 */

function onSubmit() {
  const firstName = document.getElementById("firstName").value;
  const surname = document.getElementById("surname").value;
  const ageFrom = document.getElementById("ageFrom").value;
  const ageTo = document.getElementById("ageTo").value;
  const employeeState = document.getElementById("dropdown").value;
  // vrati bud oznaceny radio input element ALEBO null
  const selectedGenderEl = document.querySelector(
    'input[name = "gender"]:checked'
  );

  // 1. filter funkcia na people
  // 2. nove ul
  // 3. nove li s vysledkami (loop cez vysledky filtru)
  const filteredPeople = people.filter((person) => {
    // zisti, ci je firstName z filtru vyplneny
    const firstnameCheckPassed = isFormValueValid(firstName, person.firstname);

    // zisti, ci je surname z filtru vyplneny
    const surnameCheckPassed = isFormValueValid(surname, person.surname);

    // zisti, ci je gender z filtru vyplneny
    let genderCheckPassed = true;
    // mam null alebo element ?
    if (selectedGenderEl) {
      // mam element
      // idem porovnavat hodnotu

      genderCheckPassed = selectedGenderEl.value === person.gender;
    }

    //check pre age validaciu
    const agePassed = checkAge(ageFrom, ageTo, person.age);

    //check pre employeeState
    const employeePassed = employeeState === person.employmentState;

    return (
      firstnameCheckPassed &&
      surnameCheckPassed &&
      genderCheckPassed &&
      agePassed &&
      employeePassed
    );
  });

  const ul = document.getElementById("filteredList");

  for (const person of filteredPeople) {
    const li = document.createElement("li");
    li.innerHTML = `${person.id} ${person.firstname} ${person.surname} ${person.gender} ${person.employmentState} ${person.age}`;
    ul.appendChild(li);
  }
}
