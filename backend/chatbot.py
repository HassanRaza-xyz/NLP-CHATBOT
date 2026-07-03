

import json          # For loading the intents dataset
import random        # For selecting random responses
import re            # For text cleaning
import os            # For file path operations
import joblib        # For saving/loading the trained model

import nltk          # Natural Language Toolkit
from nltk.tokenize import word_tokenize          # For tokenization
from nltk.corpus import stopwords                # For stopword removal
from nltk.stem import WordNetLemmatizer          # For lemmatization

from sklearn.feature_extraction.text import TfidfVectorizer   # TF-IDF
from sklearn.linear_model import LogisticRegression             # Classifier
from sklearn.preprocessing import LabelEncoder                  # Encode labels
import numpy as np   # For numerical operations

# -----------------------------------------------------------------
# Step 1: Download required NLTK data (runs only if not downloaded)
# -----------------------------------------------------------------
def download_nltk_data():
    """Download required NLTK corpora if not already present.
    Uses nltk.download() directly with quiet=True — it is idempotent
    and skips re-downloading resources that already exist.
    """
    resources = ['punkt', 'punkt_tab', 'stopwords', 'wordnet', 'omw-1.4']
    for name in resources:
        nltk.download(name, quiet=True)

download_nltk_data()


# Step 2: Initialize NLP tools

lemmatizer = WordNetLemmatizer()          # Converts words to base form
stop_words = set(stopwords.words('english'))  # Common English stopwords


# Step 3: Preprocessing function

def preprocess_text(text: str) -> str:

    
    # 1. Convert to lowercase for uniformity
    text = text.lower()
    
    # 2. Remove special characters, keeping only letters and spaces
    text = re.sub(r'[^a-z\s]', '', text)
    
    # 3. Tokenize: split sentence into individual words
    tokens = word_tokenize(text)
    
    # 4. Remove stopwords (e.g., "the", "is", "at") and short words
    tokens = [
        token for token in tokens
        if token not in stop_words and len(token) > 1
    ]
    
    # 5. Lemmatize: convert words to base form (e.g., "running" → "run")
    tokens = [lemmatizer.lemmatize(token) for token in tokens]
    
    # Join tokens back into a single string
    return ' '.join(tokens)


# Step 4: Load the intents dataset

def load_intents(filepath: str) -> dict:
    """
    Loads and returns the intents JSON dataset.
    
    Args:
        filepath (str): Path to intents.json file
    
    Returns:
        dict: Parsed intents dictionary
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data


# -----------------------------------------------------------------
# Step 5: Prepare training data from intents
# -----------------------------------------------------------------
def prepare_training_data(intents: dict):
  
    corpus = []          # Preprocessed text patterns
    labels = []          # Intent tags (labels)
    tag_responses = {}   # Map from tag → list of responses
    
    for intent in intents['intents']:
        tag = intent['tag']
        responses = intent['responses']
        tag_responses[tag] = responses  # Store responses for this tag
        
        for pattern in intent['patterns']:
            processed = preprocess_text(pattern)  # Apply NLP preprocessing
            if processed.strip():  # Only add non-empty processed patterns
                corpus.append(processed)
                labels.append(tag)
    
    return corpus, labels, tag_responses


# -----------------------------------------------------------------
# Step 6: The main ChatbotEngine class
# -----------------------------------------------------------------
class ChatbotEngine:
    
    def __init__(self, intents_path: str = None, model_dir: str = 'model'):
        self.model_dir = model_dir
        self.intents_path = intents_path
        self.is_trained = False
        
        self.vectorizer = TfidfVectorizer(
            max_features=5000,    # Maximum vocabulary size
            ngram_range=(1, 2),   # Use single words and bigrams
            analyzer='word'       # Analyze at word level
        )
        
        # Logistic Regression: multi-class intent classifier
        self.classifier = LogisticRegression(
            max_iter=1000,        # Maximum training iterations
            C=10,                 # Regularization parameter
            solver='lbfgs',       # Optimization algorithm
            multi_class='auto'    # Handle multiple classes
        )
        
        # Label encoder encodes string labels (tag names) to numbers
        self.label_encoder = LabelEncoder()
        
        # Dictionary mapping tags to their response lists
        self.tag_responses = {}
        
        # Try to load a pre-trained model from disk
        self._try_load_model()
    
    def _try_load_model(self):
        """Attempts to load a pre-trained model from the model directory."""
        vectorizer_path = os.path.join(self.model_dir, 'vectorizer.pkl')
        classifier_path = os.path.join(self.model_dir, 'classifier.pkl')
        encoder_path = os.path.join(self.model_dir, 'label_encoder.pkl')
        responses_path = os.path.join(self.model_dir, 'tag_responses.pkl')
        
        # Check if all model files exist
        if all(os.path.exists(p) for p in [
            vectorizer_path, classifier_path, encoder_path, responses_path
        ]):
            try:
                self.vectorizer = joblib.load(vectorizer_path)
                self.classifier = joblib.load(classifier_path)
                self.label_encoder = joblib.load(encoder_path)
                self.tag_responses = joblib.load(responses_path)
                self.is_trained = True
                print("[ChatbotEngine] Pre-trained model loaded successfully!")
            except Exception as e:
                print(f"[ChatbotEngine] Could not load model: {e}")
                self.is_trained = False
    
    def train(self):
        if not self.intents_path:
            raise ValueError("intents_path must be provided for training")
        
        print("[Training] Loading intents dataset...")
        intents = load_intents(self.intents_path)
        
        print("[Training] Preparing training data...")
        corpus, labels, self.tag_responses = prepare_training_data(intents)
        
        print(f"[Training] Dataset: {len(corpus)} patterns, {len(set(labels))} intents")
        
        # Encode string labels to integer indices
        encoded_labels = self.label_encoder.fit_transform(labels)
        
        print("[Training] Fitting TF-IDF vectorizer...")
        # Learn vocabulary and convert text to TF-IDF matrix
        X_train = self.vectorizer.fit_transform(corpus)
        
        print("[Training] Training Logistic Regression classifier...")
        # Train the classifier on TF-IDF features
        self.classifier.fit(X_train, encoded_labels)
        
        self.is_trained = True
        print("[Training] Model training complete!")
        
        # Save model to disk for future use
        self._save_model()
        
        return {
            'patterns': len(corpus),
            'intents': len(set(labels)),
            'status': 'trained'
        }
    
    def _save_model(self):
        """Save all model components to the model directory."""
        os.makedirs(self.model_dir, exist_ok=True)
        
        joblib.dump(self.vectorizer, os.path.join(self.model_dir, 'vectorizer.pkl'))
        joblib.dump(self.classifier, os.path.join(self.model_dir, 'classifier.pkl'))
        joblib.dump(self.label_encoder, os.path.join(self.model_dir, 'label_encoder.pkl'))
        joblib.dump(self.tag_responses, os.path.join(self.model_dir, 'tag_responses.pkl'))
        
        print(f"[ChatbotEngine] Model saved to '{self.model_dir}/' directory.")
    
    def predict(self, user_input: str, threshold: float = 0.15):
        if not self.is_trained:
            return {
                'response': "I'm not trained yet! Please run the training script first.",
                'intent': 'error',
                'confidence': 0.0,
                'processed_text': user_input,
                'nlp_steps': []
            }
        
        # --- NLP Preprocessing Pipeline ---
        nlp_steps = []
        
        original = user_input
        
        # Step 1: Lowercase
        lowered = user_input.lower()
        
        # Step 2: Clean special characters
        cleaned = re.sub(r'[^a-z\s]', '', lowered)
        
        # Step 3: Tokenize
        tokens = word_tokenize(cleaned)
        nlp_steps.append({
            'step': 'Tokenization',
            'result': tokens[:10]  # Show first 10 tokens
        })
        
        # Step 4: Remove stopwords
        filtered = [t for t in tokens if t not in stop_words and len(t) > 1]
        nlp_steps.append({
            'step': 'Stopword Removal',
            'result': filtered[:10]
        })
        
        # Step 5: Lemmatize
        lemmatized = [lemmatizer.lemmatize(t) for t in filtered]
        nlp_steps.append({
            'step': 'Lemmatization',
            'result': lemmatized[:10]
        })
        
        processed_text = ' '.join(lemmatized)
        
        # Handle empty processed text (all stopwords or punctuation)
        if not processed_text.strip():
            processed_text = cleaned.strip() or original
        
        # --- TF-IDF Feature Extraction ---
        try:
            X_input = self.vectorizer.transform([processed_text])
        except Exception:
            return {
                'response': "I'm having trouble processing that. Could you rephrase?",
                'intent': 'error',
                'confidence': 0.0,
                'processed_text': processed_text,
                'nlp_steps': nlp_steps
            }
        
        # --- Logistic Regression Prediction ---
        # Get probability scores for all intent classes
        probabilities = self.classifier.predict_proba(X_input)[0]
        
        # Index of highest probability class
        best_idx = np.argmax(probabilities)
        confidence = float(probabilities[best_idx])
        
        # Decode integer label back to string tag
        predicted_tag = self.label_encoder.inverse_transform([best_idx])[0]
        
        # Use fallback response if confidence is below threshold
        if confidence < threshold:
            response = random.choice([
                "I'm not sure I understand. Could you rephrase that?",
                "Hmm, that's a bit unclear. Try asking about NLP or university topics!",
                "I didn't catch that. Ask me about NLP concepts or university FAQs!"
            ])
            predicted_tag = 'low_confidence'
        else:
            # Select a random response from the predicted intent's responses
            responses = self.tag_responses.get(predicted_tag, [
                "I'm not sure how to respond to that."
            ])
            response = random.choice(responses)
        
        return {
            'response': response,
            'intent': predicted_tag,
            'confidence': round(confidence * 100, 2),  # Convert to percentage
            'processed_text': processed_text,
            'nlp_steps': nlp_steps
        }
    
    def get_all_intents(self) -> list:
        """Returns a list of all available intent tags."""
        if self.is_trained:
            return list(self.tag_responses.keys())
        return []
