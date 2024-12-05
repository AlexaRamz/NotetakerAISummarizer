colors = [
  '#FF9797',
  '#FFC76D',
  '#FFFF81',
  '#A6FF7F',
  '#9DFFFF',
  '#9BDCFF',
  '#ADB4FF',
  '#EE99FF',
  '#FFB0F3',
  '#FF0000',
  '#FF9D00',
  '#FFFF00',
  '#4DFF00',
  '#00FFFF',
  '#00A6FF',
  '#1E00FF',
  '#D400FF',
  '#FF00D9',
  '#C60000',
  '#C37800',
  '#B9B900',
  '#33AA00',
  '#00A2A2',
  '#006DBB',
  '#1400AD',
  '#9200B0',
  '#A20089'
];

grayColors = [
  '#000000',
  '#6A6A6A',
  '#A09E9E',
  '#C7C7C7',
  '#E9E7E7',
  '#FFFFFF',
]

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

textToSummarize = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
summaryText = "This is the summary of the text";

overlay = document.getElementById("overlay");

summarizePopup = document.getElementById("summarize-pop-up");
summarizeText = document.getElementById("summarize-text")

finalSummaryPopup = document.getElementById("final-summary-pop-up");
finalSummaryText = document.getElementById("final-summary-text");

function openSummarizePopup()
{
  showSelectedText();
  overlay.style.display = "block";
  summarizePopup.style.display = "flex";
}

function closeSummarizePopup()
{
  overlay.style.display = "none";
  summarizePopup.style.display = "none";
  finalSummaryPopup.style.display = "none";
}

const summarizePopupTabs = document.querySelectorAll('#summarize-pop-up .summarize-tab');
const finalSummaryPopupTabs = document.querySelectorAll('#final-summary-pop-up .summarize-tab');

summarizePopupTabs.forEach(button => {
  button.addEventListener('click', () => {
    // Remove the 'active' class from all buttons
    summarizePopupTabs.forEach(btn => btn.classList.remove('active'));

    // Add the 'active' class to the clicked button
    button.classList.add('active');
  });
});

finalSummaryPopupTabs.forEach(button => {
  button.addEventListener('click', () => {
    // Remove the 'active' class from all buttons
    finalSummaryPopupTabs.forEach(btn => btn.classList.remove('active'));

    // Add the 'active' class to the clicked button
    button.classList.add('active');
  });
});

function showSelectedText() 
{
  summarizeText.innerText = textToSummarize;
}

function showAllText() 
{
  summarizeText.innerText = textToSummarize;
}

function showPasteTextbox() 
{
  summarizeText.innerText = textToSummarize;
}

function goToFinalSummary()
{
  summarizePopup.style.display = "none";
  finalSummaryPopup.style.display = "flex";
  showSummary();
}

function showSummary()
{
  finalSummaryText.innerText = summaryText;
}

function showOriginalText()
{
  finalSummaryText.innerText = textToSummarize;
}
