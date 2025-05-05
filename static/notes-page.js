colors = [
  '#FF9797', '#FFC76D', '#FFFF81', '#A6FF7F', '#9DFFFF', '#9BDCFF', '#ADB4FF', '#EE99FF', '#FFB0F3', '#FF0000',
  '#FF9D00', '#FFFF00', '#4DFF00', '#00FFFF', '#00A6FF', '#1E00FF', '#D400FF', '#FF00D9', '#C60000', '#C37800',
  '#B9B900', '#33AA00', '#00A2A2', '#006DBB', '#1400AD', '#9200B0', '#A20089'
];

grayColors = [
  '#000000', '#6A6A6A', '#A09E9E', '#C7C7C7', '#E9E7E7', '#FFFFFF'
];

// Populating the color options for the color menus
const colorsContainer = document.getElementById('colors-container');
const highlightColorsContainer = document.getElementById('highlight-colors-container');
const grayColorsContainer = document.getElementById('gray-colors-container');

function addColorButton(color, container) {
  const button = document.createElement('button');
  button.style.backgroundColor = color;
  if (color === "#FFFFFF") {
    button.style.border = 'solid 2px';
    button.style.borderColor = '#C9C9C9';
  }
  container.appendChild(button);
}

for (let i = 0; i < colors.length; i++) {
  addColorButton(colors[i], colorsContainer);
  addColorButton(colors[i], highlightColorsContainer);
}

for (let i = 0; i < grayColors.length; i++) {
  addColorButton(grayColors[i], grayColorsContainer);
}

// Handling the Color Menu pop-ups
const textColorsMenu = document.getElementById("text-colors-menu");
const highlightColorsMenu = document.getElementById("highlight-colors-menu");
const textColorButton = document.getElementById('text-color-button');
const highlightColorButton = document.getElementById('highlight-color-button');

function hideAllToolMenus() {
  textColorsMenu.style.display = 'none';
  highlightColorsMenu.style.display = 'none';
  textColorButton.classList.remove('active');
  highlightColorButton.classList.remove('active');
}

textColorButton.addEventListener('click', () => {
  if (window.getComputedStyle(textColorsMenu).display === 'none') {
    hideAllToolMenus();
    textColorsMenu.style.display = 'block';
    textColorButton.classList.add('active');

    // Position correctly relative to button
    let offsetY = 6;
    let offsetX = 0;
    const rect = textColorButton.getBoundingClientRect();
    textColorsMenu.style.top = `${rect.top + rect.height + offsetY}px`;
    textColorsMenu.style.left = `${rect.left + offsetX}px`;
  } else {
    hideAllToolMenus();
    textColorsMenu.style.display = 'none';
    textColorButton.classList.remove('active');
  }
});

highlightColorButton.addEventListener('click', () => {
  if (window.getComputedStyle(highlightColorsMenu).display === 'none') {
    hideAllToolMenus();
    highlightColorsMenu.style.display = 'block';
    highlightColorButton.classList.add('active');

    // Position correctly relative to button
    let offsetY = 6;
    let offsetX = 0;
    const rect = highlightColorButton.getBoundingClientRect();
    highlightColorsMenu.style.top = `${rect.top + rect.height + offsetY}px`;
    highlightColorsMenu.style.left = `${rect.left + offsetX}px`;
  } else {
    hideAllToolMenus();
    highlightColorsMenu.style.display = 'none';
    highlightColorButton.classList.remove('active');
  }
});

// Global Variables for Summarize Pop-up
const summarizeText = document.getElementById("summarize-text");
const overlay = document.getElementById("overlay");
const summarizePopup = document.getElementById("summarize-popup");

const summarizePopupTabs = document.querySelectorAll('#summarize-popup .summarize-tab');
const selectedTextTab = document.getElementById('selected-text-tab');

// Global Variables for Final Summary Pop-up
const finalSummaryPopup = document.getElementById("final-summary-popup");
const finalSummaryText = document.getElementById("final-summary-text");

const finalSummaryPopupTabs = document.querySelectorAll('#final-summary-popup .summarize-tab');
const summaryTextTab = document.getElementById('summary-text-tab');

let notesText = "";
let summaryText = "";

// Function to open the Summarize Pop-up
function openSummarizePopup() {
  // Show the summarize popup and overlay
  overlay.style.display = "block";
  summarizePopup.style.display = "flex";

  // Get the notes text from the contenteditable area
  notesText = document.getElementById('note-text-container').innerText.trim();

  // Switch to the Selected Text tab
  summarizePopupTabs.forEach(btn => btn.classList.remove('active'));
  selectedTextTab.classList.add('active')

  // Display the selected text to preview before summarizing
  showSelectedText();
}

// Function to close the Summarize pop-up
function closeSummarizePopup() {
  overlay.style.display = "none";
  summarizePopup.style.display = "none";
  finalSummaryPopup.style.display = "none";
}

// Function to begin summarizing. If successful, leads to a pop-up with the final summary
function goToSummary() {
  // Show the loading message
  summarizeText.innerText = "Summarizing... Please wait.";

  /*
  // Send the text to the backend for summarization
  fetch('/notes-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ notes: notesText, ratio: 0.2 }) // Send the notes text to be summarized
  })
  .then(response => response.json())
  .then(data => {
    console.log('Received Data: ', data);
    // Check if the backend returned a summary
    if (data.summary) {
      const formattedSummary = data.summary.replace(/\n/g, '<br>');
      
      // Populate the summary in the final summary pop-up
      finalSummaryText.innerText = formattedSummary;
      
      // Hide the summarize pop-up and show the final summary pop-up
      summarizePopup.style.display = "none";
      finalSummaryPopup.style.display = "flex";
    } else {
      // Handle case when no summary is returned
      summarizeText.innerText = "Error summarizing the text.";
    }
  })
  .catch(error => {
    // Handle network or other errors
    console.error('Error:', error);
    summarizeText.innerText = "An error occurred while summarizing.";
  });
  */

  // Switch to the Summary Text tab
  finalSummaryPopupTabs.forEach(btn => btn.classList.remove('active'));
  summaryTextTab.classList.add('active')

  // Populate the summary in the final summary pop-up
  summaryText = finalSummaryText.innerText = "This would show the final summary";
      
  // Hide the summarize pop-up and show the final summary pop-up
  summarizePopup.style.display = "none";
  finalSummaryPopup.style.display = "flex";
}

// Event listeners for tab switching in the pop-ups (indicate the currently selected tab)
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

// Functions for showing different tabs in the Summarize pop-up
function showSelectedText() {
  // Show all text for now. TODO
  showAllText();
}

function showAllText() {
  // If there's no text to summarize, show an error message
  if (notesText === '') {
    summarizeText.innerText = "Please enter some text to summarize.";
    // TODO: Disable Summarize button

  }
  else {
    // Display the text that needs to be summarized in the pop-up
    summarizeText.innerText = notesText;
  }
}

function showPasteTextbox() {
  
}

// Functions for showing different tabs in the Final Summary pop-up
function showOriginalText() {
  finalSummaryText.innerText = notesText;
}

function showFinalSummary() {
  finalSummaryText.innerText = summaryText;
}