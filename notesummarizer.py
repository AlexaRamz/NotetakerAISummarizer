from summarizer import Summarizer
from flask import Flask, request, jsonify


''' 
How it should work: once notes are saved AND the user clicks the 
"Summarize" button, the text will be transferred to the model 
summarizer via web requests (POST).
'''

app = Flask(__name__)
model = Summarizer()

@app.route('/summarize', methods=['POST'])
def summarize_notes():
    # Get the notes from the request body
    data = request.get_json()
    notes = data.get('notes', '')

    if not notes:
        return jsonify({'error': 'No notes provided'}), 400

    # Generate the summary using the model
    summary = model(notes, ratio=0.2)  # Limiting the summary to 20% of the original text

    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)
