import os
import streamlit as st
import google.generativeai as genai
import json
import streamlit.components.v1 as components
from google.api_core.exceptions import ResourceExhausted

# Read the HTML file
with open("index.html", "r") as f:
    html_template = f.read()

# Set API Key (use environment variables for security)
os.environ["GEMINI_API_KEY"] = "AIzaSyB1voqyHXB3laUN6WrRpBTfZSh8CcD5FjE"
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Configure the model
generation_config = {
    "temperature": 0.5,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-exp",
    generation_config=generation_config,
)

# Display the logo and title
st.image("https://i.imgur.com/9XzJ2Sx.png", width=150)
st.title("Bambie Sensei's here to help!")

user_input = st.text_input("Enter a sentence:", "")

# Define the JSON file path
json_file_path = "saved_sentences.json"

def save_sentence_to_json(sentence, english, literal):
    try:
        # Read existing data from the JSON file
        if os.path.exists(json_file_path) and os.path.getsize(json_file_path) > 0:
            with open(json_file_path, "r") as file:
                data = json.load(file)
        else:
            data = []

        # Check if the sentence already exists in the JSON file
        if any(item['sentence'] == sentence for item in data):
            st.warning("This sentence has already been saved")
        else:
            # Add the new sentence to the beginning of the data
            data.insert(0, {
                "sentence": sentence,
                "english": english,
                "literal": literal
            })

            # Write the updated data back to the JSON file
            with open(json_file_path, "w") as file:
                json.dump(data, file, indent=4)
            st.success("Sentence saved successfully!")
    except Exception as err:
        st.error(f"Error: {err}")

def get_sentences_from_json():
    try:
        if os.path.exists(json_file_path) and os.path.getsize(json_file_path) > 0:
            with open(json_file_path, "r") as file:
                data = json.load(file)
            return data
        else:
            return []
    except Exception as err:
        st.error(f"Error: {err}")
        return []

def format_response_with_template(response_text, template):
    """
    Parses the JSON response and formats it using the HTML template.
    """
    try:
        cleaned_text = response_text.strip("```json\n").strip("\n```")
        parsed_response = json.loads(cleaned_text)
        formatted_html = template
        breakdown_html = ""
        for idx, item in enumerate(parsed_response):
            # Debugging: Print the item to see its structure
            print(item)
            if 'sentence' in item and 'english' in item:
                sentence_html = f"""
                <h3>{item['sentence']}</h3>
                <p><strong>English:</strong> {item['english']}</p>
                <p><strong>Literal Translation:</strong> {item.get('literal', '')}</p>
                <ul>
                """
                for word in item.get("breakdown", []):
                    sentence_html += f"<li><strong>{word['word']}</strong> ({word['reading']}): {word['meaning']}</li>"
                sentence_html += "</ul>"
                breakdown_html += sentence_html
                save_sentence_to_json(item['sentence'], item['english'], item.get('literal', ''))
            else:
                print(f"Missing keys in item: {item}")
        formatted_html = formatted_html.replace("{{sentence}}", item.get('sentence', ''))
        formatted_html = formatted_html.replace("{{english}}", item.get('english', ''))
        formatted_html = formatted_html.replace("{{literal}}", item.get('literal', ''))
        formatted_html = formatted_html.replace("{{breakdown}}", breakdown_html)
        return formatted_html
    except json.JSONDecodeError:
        return "<p>Error: Failed to parse response as JSON.</p>"

if st.button("Analyze Sentence") and user_input:
    try:
        chat_session = model.start_chat(history=[
            {
                "role": "user",
                "parts": [
                    f"break down this sentence: {user_input.strip()}\n\nfor the sentence, include japanese, english and literal translation, and breakdown includes word, reading in furigana and meaning",
                ],
            }
        ])
        response = chat_session.send_message(f"break down this sentence: {user_input.strip()}")
        cleaned_text = response.text.strip("```json\n").strip("\n```")
        parsed_response = json.loads(cleaned_text)
        combined_response = parsed_response

        # Debugging: Print the combined response
        print(combined_response)

        st.subheader("Breakdown Result")
        formatted_html = format_response_with_template(json.dumps(combined_response), html_template)
        components.html(formatted_html, height=600, scrolling=True)
    except ResourceExhausted:
        st.error("API quota exceeded or too many requests. Please try again later.")
    except Exception as e:
        st.error(f"An error occurred: {e}")

if st.button("Show Saved Sentences"):
    saved_sentences = get_sentences_from_json()
    st.subheader("Saved Sentences")
    for sentence in saved_sentences:
        st.write(f"Japanese: {sentence['sentence']}")
        st.write(f"English: {sentence['english']}")
        st.write(f"Literal Translation: {sentence['literal']}")
        st.write("---")