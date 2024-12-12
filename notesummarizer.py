from summarizer import Summarizer

# Initialize the Summarizer model
model = Summarizer()

def summarize_notes(notes: str, ratio: float = 0.2) -> str:
    """
    Summarize the input notes based on the provided ratio.
    """
    text = """In this study, the authors investigate the effects of a new approach to education
          that emphasizes student-driven learning. This approach has shown to improve student 
          engagement and outcomes in various subjects, including science, mathematics, and the arts."""

    if not text:
        raise ValueError("No notes provided.")
    
    if not (0.0 < ratio <= 1.0):
        raise ValueError("Invalid ratio. Must be between 0 and 1.")

    # Generate the summary using the model
    summary = model(text, ratio=0.2)
    print(summary)
    return summary
