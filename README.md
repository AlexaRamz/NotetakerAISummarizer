# EasyNote
This note-taking web application made for students integrates an AI Natural Language Processing (NLP) API, allowing users to generate concise summaries of their notes to any length. We created this as our final project for UCI's Informatics 133 course (User Interaction Software).

[![Video Thumbnail](demo/easynote_thumbnail.png)](https://drive.google.com/file/d/1VdJdoWqIDnCrCPNyQ7ba6TvEcUaJH7H2/view?usp=sharing)

## Features
Our note-taking page currently allows users to type out notes and customize selected text by
* Applying bold, italics, and underline
* Changing text color with 31 different colors
* Highlighting text with 27 different colors

Users can also press the "Summarize" button to begin generating a summary of their notes. A pop-up allows them to specify which text to summarize (selected, all, or pasted text) as well as how long the summary should be.

You can view the UI concept and different iterations of our note-taking page in our [Figma design](https://www.figma.com/design/XxjCzTXABP9ZLaNTZZjecB/INF-133-Note-taking-web-app?t=qD7uc5vnguERKNgj-1).

![Note-taking Page](demo/notes_page.png)

## How to Use
To launch the application:
1. Clone this repository.
2. Download any dependencies:
    - numpy
    - PyTorch
    - Transformers
3. Write "server.py" in the terminal (make sure you are in the same folder as the program)
4. When you see the localhost IP address (127.0.0.1:5000), click the IP address or type "127.0.0.1:5000".
5. Login or Register

