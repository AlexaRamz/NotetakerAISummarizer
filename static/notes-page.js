colors = [
  '#FF9797', '#FFC76D', '#FFFF81', '#A6FF7F', '#9DFFFF', '#9BDCFF', '#ADB4FF', '#EE99FF', '#FFB0F3', '#FF0000',
  '#FF9D00', '#FFFF00', '#4DFF00', '#00FFFF', '#00A6FF', '#1E00FF', '#D400FF', '#FF00D9', '#C60000', '#C37800',
  '#B9B900', '#33AA00', '#00A2A2', '#006DBB', '#1400AD', '#9200B0', '#A20089'
];

grayColors = [
  '#000000', '#6A6A6A', '#A09E9E', '#C7C7C7', '#E9E7E7', '#FFFFFF'
];

// Populating the color options for the color menus
const colorsContainers = document.getElementsByClassName('colors-container');
for (let container of colorsContainers) {
  for (let i = 0; i < colors.length; i++) {
    const button = document.createElement('button');
    button.style.backgroundColor = colors[i];
    container.appendChild(button);
  }
}

const grayColorsContainers = document.getElementsByClassName('gray-colors-container');
for (let container of grayColorsContainers) {
  for (let i = 0; i < grayColors.length; i++) {
    const button = document.createElement('button');
    button.style.backgroundColor = grayColors[i];
    if (colors[i] == "#FFFFFF") {
      button.style.borderRadius = '1px';
      button.style.borderColor = '#C9C9C9';
    }
    container.appendChild(button);
  }
}

// Handling the Color Menu Popups
const textColorsMenu = document.getElementById("text-colors-menu");
const highlightColorsMenu = document.getElementById("highlight-colors-menu");
const textColorButton = document.getElementById('text-color-button');
const highlightColorButton = document.getElementById('highlight-color-button');

textColorButton.addEventListener('click', () => {
  if (textColorsMenu.style.display == 'block') {
    textColorsMenu.style.display = 'none';
    textColorButton.classList.remove('active');
  } else {
    textColorsMenu.style.display = 'block';
    textColorButton.classList.add('active');
  }
});

highlightColorButton.addEventListener('click', () => {
  if (highlightColorsMenu.style.display == 'block') {
    highlightColorsMenu.style.display = 'none';
    highlightColorButton.classList.remove('active');
  } else {
    highlightColorsMenu.style.display = 'block';
    highlightColorButton.classList.add('active');
  }
});

// Global Variables for Summarize Popup
const summarizeText = document.getElementById("summarize-text");
const overlay = document.getElementById("overlay");
const summarizePopup = document.getElementById("summarize-pop-up");
const finalSummaryPopup = document.getElementById("final-summary-pop-up");
const finalSummaryText = document.getElementById("final-summary-text");

// Function to open the Summarize popup
function openSummarizePopup() {
  console.log("Summarize Button Clicked");
  // Show the summarize popup and overlay
  overlay.style.display = "block";
  summarizePopup.style.display = "flex";
  
  // Clear any previous summary content and show the loading message
  summarizeText.innerText = "Summarizing... Please wait.";

  // Get the notes text from the contenteditable area (note-text-container)
  const notesText = document.getElementById('note-text-container').innerText.trim();

  // If there's no text to summarize, show an error message
  if (notesText === '') {
    summarizeText.innerText = "Please enter some text to summarize.";
    return; // Exit the function if there's no text
  }

  // Display the text that needs to be summarized in the popup
  summarizeText.innerText = notesText;

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
}

// Function to close the Summarize popup
function closeSummarizePopup() {
  overlay.style.display = "none";
  summarizePopup.style.display = "none";
  finalSummaryPopup.style.display = "none";
}

// Event listeners for tab switching in the pop-up (to switch between different views)
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
