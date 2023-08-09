function toggleForm() {
  var formContainer = document.getElementById('formContainer');
  var openFormCheckbox = document.getElementsByName('Abholung')[0];

  if (openFormCheckbox.checked) {
    formContainer.style.display = 'block';

    // Deaktiviere das andere Formular
    var formContainer1 = document.getElementById('formContainer1');
    var formCheckbox = document.getElementsByName('AbgabevorOrt')[0];

    formCheckbox.checked = false;
    formContainer1.style.display = 'none';
  } else {
    formContainer.style.display = 'none';
  }
}

function toggleForm2() {
  var formContainer1 = document.getElementById('formContainer1');
  var openFormCheckbox = document.getElementsByName('AbgabevorOrt')[0];

  if (openFormCheckbox.checked) {
    formContainer1.style.display = 'block';

    // Deaktiviere das andere Formular
    var formContainer = document.getElementById('formContainer');
    var formCheckbox = document.getElementsByName('Abholung')[0];

    formCheckbox.checked = false;
    formContainer.style.display = 'none';
  } else {
    formContainer1.style.display = 'none';
  }
}

function getQueryParameter(parameterName) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(parameterName);
}

function setQueryParameter(parameterName, value) {
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set(parameterName, value);

  const newUrl = window.location.pathname + '?' + urlParams.toString();
  window.history.replaceState({}, '', newUrl);
}

function validateForm1() {
  var abgabevorOrtCheckbox = document.getElementsByName('AbgabevorOrt')[0];

  if (abgabevorOrtCheckbox.checked) {
    // Überprüfung für Übergabe an der Geschäftsstelle
    var kleiderartInput1 = document.getElementById('clothes1');
    var locationSelect1 = document.getElementById('location1');

    var kleiderart1 = kleiderartInput1.value;
    var location1 = locationSelect1.options[locationSelect1.selectedIndex].text;

    if (kleiderart1 === '' || location1 === 'Bitte auswählen') {
      alert(
        'Bitte füllen Sie die erforderlichen Felder aus. Kleiderart & Krisengebiet'
      );
      return false; // Blockiert das Absenden des Formulars
    }

    // Setze die Werte für die in der output.html
    setQueryParameter('Vorname', '');
    setQueryParameter('Nachname', '');
    setQueryParameter('Straße', '');
    setQueryParameter('Postleitzahl', '');
    setQueryParameter('Wohnort', '');
    setQueryParameter('Kleiderart1', kleiderart1);
    setQueryParameter('Krisengebiet1', location1);
  } else {
    // Keine Option ausgewählt
    alert(
      'Bitte wählen Sie eine Option aus. Abholung oder Übergabe an der Geschäftsstelle'
    );
    return false; // Blockiert das Absenden des Formulars
  }
  return true; // Erlaubt das Absenden des Formulars
}

function validateForm2() {
  var abholungCheckbox = document.getElementsByName('Abholung')[0];

  if (abholungCheckbox.checked) {
    // Überprüfung für Abholung
    var firstNameInput = document.getElementById('firstName');
    var lastNameInput = document.getElementById('lastName');
    var streetInput = document.getElementById('street');
    var zipInput = document.getElementById('zip');
    var cityInput = document.getElementById('city');
    var kleiderartInput2 = document.getElementById('clothes2');
    var locationSelect2 = document.getElementById('location2');

    var firstName = firstNameInput.value;
    var lastName = lastNameInput.value;
    var street = streetInput.value;
    var zip = zipInput.value;
    var city = cityInput.value;
    var kleiderart2 = kleiderartInput2.value;
    var location2 = locationSelect2.options[locationSelect2.selectedIndex].text;

    if (
      firstName === '' ||
      lastName === '' ||
      street === '' ||
      zip === '' ||
      city === '' ||
      kleiderart2 === '' ||
      location2 === 'Bitte auswählen'
    ) {
      alert(
        'Bitte füllen Sie alle erforderlichen Felder aus. Vorname,  Nachname, Straße, Wohnort, Kleiderart und Krisengebiet.'
      );
      return false; // Blockiert das Absenden des Formulars
    }

    // Überprüfung, ob die Abholadresse in der Nähe der Geschäftsstelle liegt
    var businessZip = '12345'; // Postleitzahl der Geschäftsstelle
    var enteredZip = zip.substring(0, 2); // Erste beiden Stellen der eingegebenen Postleitzahl
    var businessZipReduced = businessZip.substring(0, 2); // Erste beiden Stellen der Geschäftsstellen-Postleitzahl

    if (businessZipReduced !== enteredZip) {
      alert(
        'Achtung. Wir können Ihre Klamotten nicht mit dem Sammelfahrzeug abholen kommen. Die Abholadresse liegt nicht in der Nähe der Geschäftsstelle.'
      );
      return false; // Blockiert das Absenden des Formulars
    }

    // Setze die Werte für die Ausgabe in der output.html
    setQueryParameter('Vorname', firstName);
    setQueryParameter('Nachname', lastName);
    setQueryParameter('Straße', street);
    setQueryParameter('Postleitzahl', zip);
    setQueryParameter('Wohnort', city);
    setQueryParameter('Kleiderart2', kleiderart2);
    setQueryParameter('Krisengebiet2', location2);
  } else {
    // Keine Option ausgewählt
    alert(
      'Bitte wählen Sie eine Option aus. Abholung oder Übergabe an der Geschäftsstelle'
    );
    return false; // Blockiert das Absenden des Formulars
  }
  return true; // Erlaubt das Absenden des Formulars
}

function populateLocationSelect(selectElement, selectedLocation) {
  const locations = [
    'Bitte auswählen',
    'Libyen',
    'Somalia',
    'Süd Sudan',
    'Zentralafrika',
    'Guinea',
    'Liberia',
    'Sierra Leone',
    'Afghanistan',
    'Irak',
    'Jemen',
    'Syrien',
    'Pakistan',
  ];

  for (let i = 0; i < locations.length; i++) {
    const location = locations[i];
    const option = document.createElement('option');
    option.value = location;
    option.textContent = location;
    selectElement.appendChild(option);
  }

  if (selectedLocation === null) {
    selectElement.value = 'Bitte auswählen';
  } else {
    selectElement.value = selectedLocation;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const kleiderart1 = urlParams.get('Kleiderart1');
  const kleiderart2 = urlParams.get('Kleiderart2');
  const krisengebiet1 = urlParams.get('Krisengebiet1');
  const krisengebiet2 = urlParams.get('Krisengebiet2');

  document.getElementById('clothes1').textContent = kleiderart1;
  document.getElementById('clothes2').textContent = kleiderart2;

  const locationSelect1 = document.getElementById('location1');
  const locationSelect2 = document.getElementById('location2');

  populateLocationSelect(locationSelect1, krisengebiet1);
  populateLocationSelect(locationSelect2, krisengebiet2);
});

function generateOutput() {
  const urlParams = new URLSearchParams(window.location.search);

  const form1Used =
    urlParams.get('Kleiderart1') !== null &&
    urlParams.get('Krisengebiet1') !== null;
  const form2Used =
    urlParams.get('Kleiderart2') !== null &&
    urlParams.get('Krisengebiet2') !== null;

  let outputHTML = '';

  if (form1Used) {
    outputHTML += '<p>Kleiderart: ' + urlParams.get('Kleiderart1') + '</p>';
    outputHTML += '<p>Krisengebiet: ' + urlParams.get('Krisengebiet1') + '</p>';
  }

  if (form2Used) {
    outputHTML += '<p>Vorname: ' + urlParams.get('Vorname') + '</p>';
    outputHTML += '<p>Nachname: ' + urlParams.get('Nachname') + '</p>';
    outputHTML += '<p>Straße: ' + urlParams.get('Straße') + '</p>';
    outputHTML += '<p>Postleitzahl: ' + urlParams.get('Postleitzahl') + '</p>';
    outputHTML += '<p>Wohnort: ' + urlParams.get('Wohnort') + '</p>';
    outputHTML += '<p>Kleiderart: ' + urlParams.get('Kleiderart2') + '</p>';
    outputHTML += '<p>Krisengebiet: ' + urlParams.get('Krisengebiet2') + '</p>';
  }

  // Fügen Sie das generierte HTML zur Ausgabe-Div hinzu
  document.getElementById('output').innerHTML = outputHTML;
}

window.addEventListener('DOMContentLoaded', generateOutput);
