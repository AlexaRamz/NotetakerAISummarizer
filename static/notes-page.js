colors = [
  '#FF9797', '#FFC76D', '#FFFF81', '#A6FF7F', '#9DFFFF', '#9BDCFF', '#ADB4FF', '#EE99FF', '#FFB0F3', '#FF0000',
  '#FF9D00', '#FFFF00', '#4DFF00', '#00FFFF', '#00A6FF', '#1E00FF', '#D400FF', '#FF00D9', '#C60000', '#C37800',
  '#B9B900', '#33AA00', '#00A2A2', '#006DBB', '#1400AD', '#9200B0', '#A20089'
];

grayColors = [
  '#000000', '#6A6A6A', '#A09E9E', '#C7C7C7', '#E9E7E7', '#FFFFFF'
]

const colorsContainer = document.getElementById('colors-container');

for (let i = 0; i < colors.length; i++) {
  const button = document.createElement('button');
  button.style.backgroundColor = colors[i];
  button.addEventListener('mousedown', function() {
    colorText(colors[i]);
  });

  colorsContainer.appendChild(button);
}

const grayColorsContainer = document.getElementById('gray-colors-container');

for (let i = 0; i < grayColors.length; i++) {
  const button = document.createElement('button');
  button.style.backgroundColor = grayColors[i];
  button.addEventListener('mousedown', function() {
    colorText(grayColors[i]);
  });

  if (colors[i] == "#FFFFFF") {
    button.style.borderRadius = '1px';
    button.style.borderColor = '#C9C9C9';
  }
  grayColorsContainer.appendChild(button);
}

const highlightColorsContainer = document.getElementById('highlight-colors-container');

for (let i = 0; i < colors.length; i++) {
  const button = document.createElement('button');
  button.style.backgroundColor = colors[i];
  button.addEventListener('mousedown', function() {
    highlightText(colors[i]);
  });

  highlightColorsContainer.appendChild(button);
}

const textColorsMenu = document.getElementById("text-colors-menu");
const highlightColorsMenu = document.getElementById("highlight-colors-menu");
const textColorButton = document.getElementById('text-color-button');
const highlightColorButton = document.getElementById('highlight-color-button');

function closeAllColorMenus() 
{
  textColorsMenu.classList.remove("show");
  textColorsMenu.classList.add("hide");
  textColorButton.classList.remove("active");

  highlightColorsMenu.classList.remove("show");
  highlightColorsMenu.classList.add("hide");
  highlightColorButton.classList.remove("active");
}

textColorButton.addEventListener('click', () => {
  if (!textColorsMenu.classList.contains("show"))
  {
    closeAllColorMenus();
    textColorsMenu.classList.add("show");
    textColorsMenu.classList.remove("hide");

    let offsetY = 6;
    let offsetX = 0;
    const rect = textColorButton.getBoundingClientRect();

    textColorsMenu.style.top = `${rect.top + rect.height + offsetY}px`;
    textColorsMenu.style.left = `${rect.left + offsetX}px`;

    textColorButton.classList.add("active");
  }
  else
  {
    closeAllColorMenus();
  }
});

highlightColorButton.addEventListener('click', () => {
  if (!highlightColorsMenu.classList.contains("show"))
  {
    closeAllColorMenus();

    let offsetY = 6;
    let offsetX = 0;
    const rect = highlightColorButton.getBoundingClientRect();

    highlightColorsMenu.style.top = `${rect.top + rect.height + offsetY}px`;
    highlightColorsMenu.style.left = `${rect.left + offsetX}px`;

    highlightColorsMenu.classList.add("show");
    highlightColorsMenu.classList.remove("hide");

    highlightColorButton.classList.add("active");
  }
  else
  {
    closeAllColorMenus();
  }
});

textToSummarize = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
summaryText = "This is the summary of the text";

overlay = document.getElementById("overlay");

summarizePopup = document.getElementById("summarize-pop-up");
summarizeText = document.getElementById("summarize-text");

finalSummaryPopup = document.getElementById("final-summary-pop-up");
finalSummaryText = document.getElementById("final-summary-text");

function openSummarizePopup() {
  showSelectedText();
  overlay.style.display = "block";
  summarizePopup.style.display = "flex";
}

function closeSummarizePopup() {
  overlay.style.display = "none";
  summarizePopup.style.display = "none";
  finalSummaryPopup.style.display = "none";
}

const summarizePopupTabs = document.querySelectorAll('#summarize-pop-up .summarize-tab');
const finalSummaryPopupTabs = document.querySelectorAll('#final-summary-pop-up .summarize-tab');

summarizePopupTabs.forEach(button => {
  button.addEventListener('click', () => {
    summarizePopupTabs.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

finalSummaryPopupTabs.forEach(button => {
  button.addEventListener('click', () => {
    finalSummaryPopupTabs.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

function showSelectedText() {
  summarizeText.innerText = textToSummarize;
}

function showAllText() {
  summarizeText.innerText = textToSummarize;
}

function showPasteTextbox() {
  summarizeText.innerText = textToSummarize;
}

function goToFinalSummary() {
  // Send the request to the backend
  fetchSummary(textToSummarize);
}

function showSummary() {
  finalSummaryText.innerText = summaryText;
}

function showOriginalText() {
  finalSummaryText.innerText = textToSummarize;
}

// Function to fetch summary from the Python backend
function fetchSummary(text) {
  fetch('http://localhost:5000/summarize', {
    method: 'POST', // POST method to send data
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: text }), // Send the text to be summarized
  })
  .then(response => response.json())
  .then(data => {
    // When the response is received, update the final summary text
    finalSummaryText.innerText = data.summary;
    summarizePopup.style.display = "none"; // Close the summarize popup
    finalSummaryPopup.style.display = "flex"; // Show the final summary popup
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

function getSelectedText() {
  if (window.getSelection) {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    return selectedText;
  } else if (document.selection) {
    const selection = document.selection.createRange();
    return selection.text;
  }
  return '';
}

function colorText(color)
{
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = selection.toString();

  // Create a document fragment to hold the modified text
  const fragment = document.createDocumentFragment();

  // Split the text into characters and create spans
  for (const char of selectedText) {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.color = color; // Set text color
    fragment.appendChild(span);
  }

  // Replace the selected text with the modified fragment
  range.deleteContents();
  range.insertNode(fragment);
}

function highlightText(color)
{
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = selection.toString();

  // Create a document fragment to hold the modified text
  const fragment = document.createDocumentFragment();

  // Split the text into characters and create spans
  for (const char of selectedText) {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.backgroundColor = color; // Set text color
    fragment.appendChild(span);
    /*const parentNode = characterNode.parentNode;
    if (parentNode.tagName !== 'SPAN') {
      
    }*/
  }

  // Replace the selected text with the modified fragment
  range.deleteContents();
  range.insertNode(fragment);
}

function boldText()
{
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = selection.toString();

  // Create a document fragment to hold the modified text
  const fragment = document.createDocumentFragment();

  // Split the text into characters and create spans
  for (const char of selectedText) {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.fontWeight = "bold"; // Set bold text
    fragment.appendChild(span);
  }

  // Replace the selected text with the modified fragment
  range.deleteContents();
  range.insertNode(fragment);
}

function italicizeText()
{
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = selection.toString();

  // Create a document fragment to hold the modified text
  const fragment = document.createDocumentFragment();

  // Split the text into characters and create spans
  for (const char of selectedText) {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.fontStyle = "italic"; // Set bold text
    fragment.appendChild(span);
  }

  // Replace the selected text with the modified fragment
  range.deleteContents();
  range.insertNode(fragment);
}

function underlineText()
{
  const selection = window.getSelection();
  const range = selection.getRangeAt(0);
  const selectedText = selection.toString();

  // Create a document fragment to hold the modified text
  const fragment = document.createDocumentFragment();

  // Split the text into characters and create spans
  for (const char of selectedText) {
    const tagElement = document.createElement('u');
    tagElement.textContent = char;
    fragment.appendChild(tagElement);
  }

  // Replace the selected text with the modified fragment
  range.deleteContents();
  range.insertNode(fragment);
}
