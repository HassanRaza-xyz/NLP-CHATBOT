#  Smart NLP Chatbot

> A university-level NLP project featuring a full-stack chatbot powered by **NLTK**, **TF-IDF**, and **Logistic Regression** — with a stunning React.js + Tailwind CSS frontend.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [System Architecture](#-system-architecture)
- [Tech Stack](#-tech-stack)
- [NLP Pipeline](#-nlp-pipeline)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [API Endpoints](#-api-endpoints)
- [Intent Categories](#-intent-categories)
- [Workflow Explanation](#-workflow-explanation)

---

## 🔍 Overview

**Smart NLP Chatbot** is a complete conversational AI system built as a university NLP subject project. It demonstrates core Natural Language Processing techniques through a production-quality chatbot interface.

The system processes user input through a 6-stage NLP pipeline, classifies intent using machine learning, and returns contextually appropriate responses — all in real time via a REST API.

---

## 🏗 System Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     FRONTEND (React.js)                     │
│  ┌──────────┐  ┌──────────────────────────────────────┐   │
│  │ Sidebar  │  │           Chat Window                 │   │
│  │ History  │  │  Bubbles | Typing | Input | NLP Info  │   │
│  └──────────┘  └──────────────────────────────────────┘   │
│         Navbar | Hero | About | Features | Footer           │
└─────────────────────────┬──────────────────────────────────┘
                          │ HTTP / REST API (axios)
                          ▼
┌────────────────────────────────────────────────────────────┐
│                   BACKEND (Python Flask)                    │
│  POST /api/chat  →  ChatbotEngine.predict()               │
│  GET  /api/health | history | intents                      │
│  POST /api/clear                                           │
└─────────────────────────┬──────────────────────────────────┘
                          │
                          ▼
┌────────────────────────────────────────────────────────────┐
│                  NLP ENGINE (chatbot.py)                    │
│                                                             │
│   User Input                                                │
│       │                                                     │
│       ▼                                                     │
│   [1] Lowercase + Clean  →  "how do i apply for admission"  │
│       │                                                     │
│       ▼                                                     │
│   [2] Tokenize (NLTK)    →  ["how","do","i","apply",...]   │
│       │                                                     │
│       ▼                                                     │
│   [3] Remove Stopwords   →  ["apply","admission"]          │
│       │                                                     │
│       ▼                                                     │
│   [4] Lemmatize (WordNet) →  ["apply","admission"]         │
│       │                                                     │
│       ▼                                                     │
│   [5] TF-IDF Vectorize   →  [0.0, 0.82, 0.0, 0.57, ...]   │
│       │                                                     │
│       ▼                                                     │
│   [6] Logistic Regression →  Intent: "university_admission" │
│                               Confidence: 94.2%             │
│       │                                                     │
│       ▼                                                     │
│   Response selected randomly from responses list           │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer     | Technology              | Purpose                                      |
|-----------|-------------------------|----------------------------------------------|
| Frontend  | React.js 18 + Vite      | Modern SPA with fast HMR dev server          |
| Styling   | Tailwind CSS 3          | Utility-first CSS with glassmorphism         |
| Animation | Framer Motion           | Smooth UI transitions and animations         |
| Routing   | React Router v6         | Client-side navigation between pages         |
| HTTP      | Axios                   | API calls from frontend to backend           |
| Backend   | Python Flask            | REST API server                              |
| NLP       | NLTK                    | Tokenization, stopwords, lemmatization       |
| ML        | Scikit-learn            | TF-IDF vectorizer + Logistic Regression      |
| Storage   | Joblib                  | Save/load trained model artifacts            |

---

## 🧠 NLP Pipeline

Each user message goes through this 6-step preprocessing pipeline before intent classification:

| Step | Technique              | Library              | Example                                      |
|------|------------------------|----------------------|----------------------------------------------|
| 1    | Lowercase + Clean      | Python `re`          | `"Hello!"` → `"hello"`                      |
| 2    | Tokenization           | `nltk.word_tokenize` | `"hello world"` → `["hello", "world"]`      |
| 3    | Stopword Removal       | `nltk.corpus.stopwords` | removes "the", "is", "a", etc.           |
| 4    | Lemmatization          | `WordNetLemmatizer`  | `"running"` → `"run"`                       |
| 5    | TF-IDF Vectorization   | `TfidfVectorizer`    | text → sparse numerical feature vector      |
| 6    | Intent Classification  | `LogisticRegression` | vector → intent tag + confidence score      |

---

## ✨ Features

### Chatbot UI
- 💬 **Chat Bubbles** — Distinct user (gradient) and bot (glass) bubbles
- ⌨️ **Typing Animation** — 3-dot animated indicator while processing
- 🌙 **Dark / Light Mode** — Toggle with localStorage persistence
- 📋 **Chat Sidebar** — Full message history with intent tags
- 🗑️ **Clear Chat** — Reset conversation with backend session clear
- 📱 **Mobile Responsive** — Full mobile support with collapsible sidebar
- 👤 **Avatars** — User and bot avatars on every message
- 🕐 **Timestamps** — Every message shows a formatted timestamp
- ⚡ **Quick Replies** — Suggestion chips for first-time users

### NLP Features
- 🔤 **Tokenization** — Word-level tokenization via NLTK
- 🗑️ **Stopword Removal** — Filter high-frequency low-meaning words
- 📖 **Lemmatization** — WordNet dictionary-based word normalization
- 🎯 **Intent Recognition** — Logistic Regression with TF-IDF features
- 📊 **Confidence Score** — Visual confidence bar for each prediction
- 🔍 **NLP Details Panel** — Expandable view showing processing steps per message

---

## 📁 Project Structure

```
smart-nlp-chatbot/
│
├── backend/                          # Python Flask API
│   ├── app.py                        # Flask server + API endpoints
│   ├── chatbot.py                    # NLP engine (core logic)
│   ├── train.py                      # Model training script
│   ├── intents.json                  # Intent dataset (25+ intents)
│   ├── requirements.txt              # Python dependencies
│   └── model/                        # Auto-created after training
│       ├── vectorizer.pkl            # TF-IDF vectorizer
│       ├── classifier.pkl            # Logistic Regression model
│       ├── label_encoder.pkl         # Intent label encoder
│       └── tag_responses.pkl         # Response dictionary
│
└── frontend/                         # React.js Application
    ├── index.html                    # HTML entry point
    ├── package.json                  # NPM dependencies
    ├── vite.config.js                # Vite + API proxy config
    ├── tailwind.config.js            # Tailwind CSS config
    ├── postcss.config.js             # PostCSS config
    └── src/
        ├── main.jsx                  # React DOM entry point
        ├── App.jsx                   # Root with React Router
        ├── index.css                 # Global styles + utilities
        ├── context/
        │   └── ThemeContext.jsx      # Dark/Light mode context
        └── components/
            ├── Navbar.jsx            # Top navigation bar
            ├── HomePage.jsx          # Landing page wrapper
            ├── Hero.jsx              # Hero section
            ├── About.jsx             # About + NLP pipeline section
            ├── Features.jsx          # Features showcase
            ├── Footer.jsx            # Site footer
            ├── ChatPage.jsx          # Chat page (state manager)
            ├── ChatSidebar.jsx       # History sidebar
            ├── ChatWindow.jsx        # Message list + input bar
            └── ChatBubble.jsx        # Individual message bubble
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Python** 3.9+ ([python.org](https://www.python.org/downloads/))
- **Node.js** 18+ ([nodejs.org](https://nodejs.org/))
- **VS Code** (recommended)

---

### Step 1 — Clone / Open the Project

Open the project folder in VS Code:
```
File → Open Folder → select "nlp project chat"
```

---

### Step 2 — Backend Setup

Open a **new terminal** in VS Code (`Ctrl + `` ` ``):

```bash
# Navigate to backend folder
cd backend

# Create a Python virtual environment (recommended)
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Train the NLP model (MUST run before starting the server)
python train.py
```

You should see output like:
```
[Training] Loading intents dataset...
[Training] Dataset: 200+ patterns, 25 intents
[Training] Training complete!
Model saved to 'model/' directory.
```

---

### Step 3 — Frontend Setup

Open a **second terminal** in VS Code:

```bash
# Navigate to frontend folder
cd frontend

# Install Node.js dependencies
npm install
```

---

## ▶️ Running the Application

### Start the Backend (Flask API)

In the **backend terminal** (with venv activated):
```bash
python app.py
```
Flask server starts at: `http://localhost:5000`

### Start the Frontend (React + Vite)

In the **frontend terminal**:
```bash
npm run dev
```
React app starts at: `http://localhost:5173`

### Open in Browser
Visit: **http://localhost:5173**

---

## 📡 API Endpoints

| Method | Endpoint         | Description                        |
|--------|------------------|------------------------------------|
| `GET`  | `/api/health`    | Server status + model info         |
| `POST` | `/api/chat`      | Send message, receive bot response |
| `GET`  | `/api/history`   | Get chat history for a session     |
| `POST` | `/api/clear`     | Clear session chat history         |
| `GET`  | `/api/intents`   | List all available intent tags     |

### Example Chat Request
```json
POST /api/chat
{
  "message": "What is tokenization?",
  "session_id": "optional-uuid"
}
```

### Example Response
```json
{
  "bot_response": "Tokenization is the process of breaking text into individual word tokens...",
  "intent": "nlp_tokenization",
  "confidence": 94.2,
  "processed_text": "tokenization",
  "nlp_steps": [
    { "step": "Tokenization", "result": ["what", "is", "tokenization"] },
    { "step": "Stopword Removal", "result": ["tokenization"] },
    { "step": "Lemmatization", "result": ["tokenization"] }
  ],
  "session_id": "abc123",
  "timestamp": "2024-01-15T10:30:00"
}
```

---

## 🏷️ Intent Categories

| Category           | Intent Tags                                                                  |
|--------------------|------------------------------------------------------------------------------|
| **Conversation**   | `greeting`, `farewell`, `thanks`, `how_are_you`, `jokes`, `confusion`       |
| **Bot Info**       | `bot_name`, `capabilities`, `project_info`                                  |
| **NLP Concepts**   | `nlp_what`, `nlp_tokenization`, `nlp_lemmatization`, `nlp_stopwords`, `nlp_tfidf`, `nlp_intent` |
| **University FAQ** | `university_admission`, `university_courses`, `university_fees`, `university_scholarships`, `university_library`, `university_exams`, `university_accommodation` |
| **Tech/CS**        | `cs_programming`, `ai_ml`, `weather`, `time_date`                          |
| **Fallback**       | `fallback`, `low_confidence`                                                |

---

## 🔄 Workflow Explanation

```
User Types Message
        │
        ▼
[Frontend] React captures input → sends POST /api/chat via axios
        │
        ▼
[Backend] Flask receives request → validates message
        │
        ▼
[NLP Engine] chatbot.py:
  1. Lowercase + regex clean
  2. NLTK word_tokenize()
  3. Remove stopwords (nltk.corpus.stopwords)
  4. WordNetLemmatizer().lemmatize() each token
  5. TfidfVectorizer.transform() → feature vector
  6. LogisticRegression.predict_proba() → confidence scores
  7. Select intent with highest probability
  8. Random response selection from intent responses
        │
        ▼
[Backend] Returns JSON: { response, intent, confidence, nlp_steps }
        │
        ▼
[Frontend] React renders ChatBubble with:
  - Formatted message
  - Timestamp
  - Expandable NLP details panel
  - Confidence score bar
```

---

## 🎓 Academic Notes

This project demonstrates the following NLP/ML concepts:

1. **Text Preprocessing** — Lowercase normalization, regex cleaning, tokenization, stopword removal, lemmatization
2. **Feature Engineering** — TF-IDF (Term Frequency-Inverse Document Frequency) vectorization with bigram support
3. **Intent Classification** — Multi-class Logistic Regression trained on 200+ labeled patterns across 25+ intent classes
4. **Model Persistence** — Joblib-based serialization of trained model artifacts for reuse
5. **REST API Design** — Flask-based API with session management and CORS support
6. **Modern Frontend** — React.js with hooks, context API, routing, and glassmorphism design

---

*Built for university NLP subject · React.js + Python Flask + NLTK + Scikit-learn*
