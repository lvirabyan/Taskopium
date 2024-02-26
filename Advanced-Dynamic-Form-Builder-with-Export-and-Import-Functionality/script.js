let formCount = 0;
function allowDrop(event) {
  event.preventDefault();
}
function drag(event) {
  event.stopPropagation(); // Prevents dragover from being triggered when dragging
  event.dataTransfer.setData('text/plain', event.target.id);
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text');
  const draggedElement = document.getElementById(data);
  const dropTarget = event.target;

  if (dropTarget.classList.contains('form-field')) {
    dropTarget.parentNode.insertBefore(draggedElement, dropTarget.nextSibling);
  }
}

function addField() {
  const fieldType = document.getElementById('field-type').value;
  const formContainer = document.getElementById('form-container');
  const formField = document.createElement('div');
  formField.className = 'form-field';
  formField.draggable = true;
  formField.id = `field-${formCount}`;
  formField.setAttribute('data-type', fieldType);

  let fieldContent = `<label for="field-${formCount}">${fieldType.slice(0, 1).toUpperCase() + fieldType.slice(1)}:</label>
                      <input type="${fieldType}" id="field-${formCount}" name="field-${formCount}">`;

  if (fieldType === 'dropdown' || fieldType === 'radio') {
    fieldContent += `<label for="options-${formCount}">Options:</label>
                     <input type="text" id="options-${formCount}" placeholder="Option 1, Option 2, ...">`;
  }

  formField.innerHTML = fieldContent +
    `<span class="delete-btn" onclick="removeField(${formCount})">Delete</span>`;

  formField.addEventListener('dragstart', drag);

  formCount++;
  formContainer.appendChild(formField);
}



function removeField(id) {
  const formContainer = document.getElementById('form-container');
  const formField = document.getElementById(`field-${id}`);
  formContainer.removeChild(formField);
}

function importForm() {
  const importInput = document.getElementById('import');
  const file = importInput.files[0];

  if (!file) {
    alert('No file selected.');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;

    try {
      const formConfig = JSON.parse(content);
      recreateForm(formConfig);
    } catch (error) {
      alert('Error parsing JSON file. Please make sure it is a valid JSON.');
    }
  };

  reader.readAsText(file);
}

function recreateForm(formConfig) {
  const formContainer = document.getElementById('form-container');
  formContainer.innerHTML = '';

  formConfig.forEach((fieldData, index) => {
    const formField = document.createElement('div');
    formField.className = 'form-field';
    formField.draggable = true;
    formField.id = `field-${formCount + index}`;
    formField.setAttribute('data-type', fieldData.type);
    formField.innerHTML = `<label for="${fieldData.label}">${fieldData.label}:</label>
                          <input type="${fieldData.type}" id="${fieldData.label}" name="${fieldData.label}">
                          <span class="delete-btn" onclick="removeField(${formCount + index})">Delete</span>`;

    if (fieldData.type === 'dropdown' || fieldData.type === 'radio') {
      formField.innerHTML += `<label for="options-${formCount + index}">Options:</label>
                            <input type="text" id="options-${formCount + index}" placeholder="Option 1, Option 2, ...">`;
    }

    formContainer.appendChild(formField);
  });

  formCount += formConfig.length;
}
function exportForm() {
  const formContainer = document.getElementById('form-container');
  const formFields = formContainer.getElementsByClassName('form-field');

  const formConfig = [];

  for (const formField of formFields) {
    const fieldType = formField.getAttribute('data-type');
    const label = formField.querySelector('label').innerText;

    const fieldData = {
      type: fieldType,
      label: label,
    };

    if (fieldType === 'dropdown' || fieldType === 'radio') {
      const optionsInput = formField.querySelector(`#options-${formField.id.split('-')[1]}`);
      const options = optionsInput ? optionsInput.value.split(',').map(option => option.trim()) : [];
      fieldData.options = options;
    } else {
      const inputValue = formField.querySelector(`#${formField.id}`).value;
      fieldData.value = inputValue;
    }

    formConfig.push(fieldData);
  }

  const blob = new Blob([JSON.stringify(formConfig, null, 2)], { type: 'application/json' });

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'form-config.json';
  a.click();
}
