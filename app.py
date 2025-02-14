import os
import streamlit as st
import google.generativeai as genai
import json
import streamlit.components.v1 as components
import mysql.connector

# Read the HTML file
with open("index.html", "r") as f:
    html_template = f.read()

# Set API Key (use environment variables for security)
os.environ["GEMINI_API_KEY"] = "AIzaSyB1voqyHXB3laUN6WrRpBTfZSh8CcD5FjE"
genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Configure the model
generation_config = {
    "temperature": 0,
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
st.title("Japanese Sentence Breakdown 🇯🇵")

user_input = st.text_input("Enter a Japanese sentence:", "")

# Establish database connection
onn = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)
cursor = conn.cursor()

def save_sentence(sentence, english, literal):
    try:
        sentence = sentence.strip()
        english = english.strip()
        literal = literal.strip()
        
        # Check if the sentence already exists in the database
        cursor.execute(
            """
            SELECT COUNT(*) FROM sentences WHERE sentence = %s
            """,
            (sentence,)
        )
        result = cursor.fetchone()
        
        if result[0] > 0:
            st.warning("This sentence has already been saved")
        else:
            cursor.execute(
                """
                INSERT INTO sentences (sentence, english, literal)
                VALUES (%s, %s, %s)
                """,
                (sentence, english, literal)
            )
            conn.commit()
            st.success("Sentence saved successfully!")
    except mysql.connector.Error as err:
        st.error(f"Error: {err}")

def get_sentences():
    cursor.execute("SELECT * FROM sentences ORDER BY created_at DESC")
    return cursor.fetchall()

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
            save_sentence(item['sentence'], item['english'], item.get('literal', ''))
        formatted_html = formatted_html.replace("{{sentence}}", item['sentence'])
        formatted_html = formatted_html.replace("{{english}}", item['english'])
        formatted_html = formatted_html.replace("{{literal}}", item.get('literal', ''))
        formatted_html = formatted_html.replace("{{breakdown}}", breakdown_html)
        return formatted_html
    except json.JSONDecodeError:
        return "<p>Error: Failed to parse response as JSON.</p>"

if st.button("Analyze Sentence") and user_input:
    chat_session = model.start_chat(history=[
    {
      "role": "user",
      "parts": [
        "break down this sentence: まぜそばって知ってますか\n\nfor the sentence, include japanese, english and literal translation, and breakdown includes word, reading in furigana and meaning",
      ],
    },
    {
      "role": "model",
      "parts": [
        "```json\n[\n  {\n    \"sentence\": \"まぜそばって知ってますか\",\n    \"english\": \"Do you know what Mazesoba is?\",\n    \"literal\": \"Mazesoba, do you know?\",\n    \"breakdown\": [\n      {\n        \"word\": \"まぜそば\",\n        \"reading\": \"mazesoba\",\n        \"meaning\": \"Mazesoba (a type of brothless ramen)\"\n      },\n      {\n        \"word\": \"って\",\n        \"reading\": \"tte\",\n        \"meaning\": \"Speaking of; as for; regarding\"\n      },\n      {\n        \"word\": \"知ってますか\",\n        \"reading\": \"shittemasu ka\",\n        \"meaning\": \"Do you know?\"\n      },\n      {\n        \"word\": \"知って\",\n        \"reading\": \"shitte\",\n        \"meaning\": \"know (te-form of 知る - shiru)\"\n      },\n      {\n        \"word\": \"ます\",\n        \"reading\": \"masu\",\n        \"meaning\": \"polite verb ending\"\n      },\n      {\n        \"word\": \"か\",\n        \"reading\": \"ka\",\n        \"meaning\": \"question particle\"\n      }\n    ]\n  }\n]\n```",
      ],
    },
  ]
)
    response = chat_session.send_message(f"break down this sentence: {user_input}")

    st.subheader("Breakdown Result")
    formatted_html = format_response_with_template(response.text, html_template)
    components.html(formatted_html, height=600, scrolling=True)

if st.button("Show Saved Sentences"):
    saved_sentences = get_sentences()
    st.subheader("Saved Sentences")
    for sentence in saved_sentences:
        st.write(f"Japanese: {sentence[1]}")
        st.write(f"English: {sentence[2]}")
        st.write("---")