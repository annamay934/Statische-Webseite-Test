function toggleForm() {
  var formContainer = document.getElementById('formContainer');
  var openFormCheckbox = document.getElementsByName('Abholung')[0];

  if (openFormCheckbox.checked) {
    formContainer.style.display = 'block';
  } else {
    formContainer.style.display = 'none';
  }
}

function toggleForm2() {
  var formContainer = document.getElementById('formContainer1');
  var openFormCheckbox = document.getElementsByName('AbgabevorOrt')[0];

  if (openFormCheckbox.checked) {
    formContainer.style.display = 'block';
  } else {
    formContainer.style.display = 'none';
  }
}

// JavaScript-Code hier einfügen
function validateForm() {
  // Überprüfung der Abholadresse
  var abholadresseInput = document.getElementById('abholadresse');
  var abholadresse = abholadresseInput.value;

  if (abholadresse === '') {
    alert('Bitte geben Sie die Abholadresse ein.');
    return false; // Blockiert das Absenden des Formulars
  }

  // Weitere Validierungen für andere Formularfelder hier einfügen
  return true; // Erlaubt das Absenden des Formulars
}
