import os
import json
import uuid
from datetime import datetime
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # Enable Cross-Origin Resource Sharing
from chatbot import ChatbotEngine


app = Flask(__name__)

# Enable CORS for React frontend (allows all local development origins)
CORS(app, resources={r"/api/*": {"origins": "*"}})


# Resolve file paths relative to this script's directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INTENTS_PATH = os.path.join(SCRIPT_DIR, 'intents.json')
MODEL_DIR = os.path.join(SCRIPT_DIR, 'model')

print("[Server] Initializing Smart NLP Chatbot engine...")

# Initialize and load the trained chatbot engine
chatbot = ChatbotEngine(
    intents_path=INTENTS_PATH,
    model_dir=MODEL_DIR
)

# Auto-train if no model exists yet
if not chatbot.is_trained:
    print("[Server] No trained model found. Training now...")
    chatbot.train()
    print("[Server] Auto-training complete!")
else:
    print("[Server] Pre-trained model loaded successfully!")

chat_sessions = {}   


def get_or_create_session(session_id: str) -> list:
    """
    Get existing session history or create a new one.
    
    Args:
        session_id (str): Unique session identifier
    
    Returns:
        list: List of messages for this session
    """
    if session_id not in chat_sessions:
        chat_sessions[session_id] = []
    return chat_sessions[session_id]


@app.route('/')
def serve_index():
    """Serve the main HTML page of the vanilla frontend."""
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../vanilla_frontend'))
    return send_from_directory(frontend_dir, 'index.html')

@app.route('/<path:filename>')
def serve_static_files(filename):
    """Serve static files (CSS, JS, images) from the vanilla frontend."""
    frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../vanilla_frontend'))
    return send_from_directory(frontend_dir, filename)


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint.
    Returns server status and model information.
    """
    return jsonify({
        'status': 'online',
        'model_trained': chatbot.is_trained,
        'intents_count': len(chatbot.get_all_intents()),
        'timestamp': datetime.now().isoformat()
    }), 200


@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Main chat endpoint. Accepts user message and returns bot response.
    
    Request Body (JSON):
        {
            "message": "Hello!",
            "session_id": "optional-uuid"  // Optional, auto-generated if missing
        }
    
    Response (JSON):
        {
            "user_message": "Hello!",
            "bot_response": "Hi there!",
            "intent": "greeting",
            "confidence": 95.2,
            "processed_text": "hello",
            "nlp_steps": [...],
            "session_id": "uuid-string",
            "timestamp": "ISO datetime"
        }
    """
    try:
        # Parse JSON request body
        data = request.get_json()
        
        if not data or 'message' not in data:
            return jsonify({
                'error': 'Missing "message" field in request body'
            }), 400
        
        user_message = data.get('message', '').strip()
        
        # Reject empty messages
        if not user_message:
            return jsonify({
                'error': 'Message cannot be empty'
            }), 400
        
        # Use provided session_id or generate a new one
        session_id = data.get('session_id', str(uuid.uuid4()))
        
        # Get or create chat session
        session_history = get_or_create_session(session_id)
        
        # Current timestamp
        timestamp = datetime.now().isoformat()
        
        # Run prediction using the NLP chatbot engine
        prediction = chatbot.predict(user_message)
        
        # Build message objects for history
        user_msg = {
            'id': str(uuid.uuid4()),
            'role': 'user',
            'content': user_message,
            'timestamp': timestamp
        }
        
        bot_msg = {
            'id': str(uuid.uuid4()),
            'role': 'bot',
            'content': prediction['response'],
            'intent': prediction['intent'],
            'confidence': prediction['confidence'],
            'processed_text': prediction['processed_text'],
            'nlp_steps': prediction['nlp_steps'],
            'timestamp': datetime.now().isoformat()
        }
        
        # Save messages to session history
        session_history.append(user_msg)
        session_history.append(bot_msg)
        
        # Build response payload
        response = {
            'user_message': user_message,
            'bot_response': prediction['response'],
            'intent': prediction['intent'],
            'confidence': prediction['confidence'],
            'processed_text': prediction['processed_text'],
            'nlp_steps': prediction['nlp_steps'],
            'session_id': session_id,
            'timestamp': timestamp,
            'message_count': len(session_history)
        }
        
        return jsonify(response), 200
    
    except Exception as e:
        print(f"[ERROR] /api/chat: {str(e)}")
        return jsonify({
            'error': f'Internal server error: {str(e)}'
        }), 500


@app.route('/api/history', methods=['GET'])
def get_history():
    """
    Get the full chat history for a session.
    
    Query Parameters:
        session_id (str): The session ID to retrieve history for
    
    Response (JSON):
        {
            "session_id": "uuid",
            "messages": [...],
            "count": 10
        }
    """
    try:
        session_id = request.args.get('session_id', '')
        
        if not session_id:
            return jsonify({
                'error': 'Missing session_id query parameter'
            }), 400
        
        history = chat_sessions.get(session_id, [])
        
        return jsonify({
            'session_id': session_id,
            'messages': history,
            'count': len(history)
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/clear', methods=['POST'])
def clear_history():
    """
    Clear the chat history for a session.
    
    Request Body (JSON):
        { "session_id": "uuid" }
    
    Response (JSON):
        { "message": "Chat cleared", "session_id": "uuid" }
    """
    try:
        data = request.get_json()
        session_id = data.get('session_id', '')
        
        if session_id in chat_sessions:
            chat_sessions[session_id] = []
        
        return jsonify({
            'message': 'Chat history cleared successfully',
            'session_id': session_id
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/intents', methods=['GET'])
def get_intents():
    """
    Get the list of all available intent tags.
    
    Response (JSON):
        { "intents": ["greeting", "farewell", ...], "count": 25 }
    """
    intents = chatbot.get_all_intents()
    return jsonify({
        'intents': intents,
        'count': len(intents)
    }), 200


@app.route('/api/sessions', methods=['GET'])
def get_sessions():
    """Get list of all active session IDs."""
    sessions = [
        {
            'session_id': sid,
            'message_count': len(msgs),
            'last_message': msgs[-1]['timestamp'] if msgs else None
        }
        for sid, msgs in chat_sessions.items()
    ]
    return jsonify({'sessions': sessions}), 200


# =============================================================
# Run the Flask Development Server
# =============================================================
if __name__ == '__main__':
    print()
    print("=" * 60)
    print("   Smart NLP Chatbot - Flask API Server")
    print("=" * 60)
    print(f"   Model Status : {'Trained [OK]' if chatbot.is_trained else 'Not Trained [FAIL]'}")
    print(f"   Intents      : {len(chatbot.get_all_intents())}")
    print(f"   Server URL   : http://localhost:5000")
    print()
    print("   Available Endpoints:")
    print("   GET  /api/health    - Server health check")
    print("   POST /api/chat      - Send message to chatbot")
    print("   GET  /api/history   - Get chat history")
    print("   POST /api/clear     - Clear chat history")
    print("   GET  /api/intents   - List all intents")
    print("=" * 60)
    print()
    
    # Run Flask server on port 5000 with debug mode
    app.run(
        host='0.0.0.0',      # Accept connections from all interfaces
        port=5000,            # Port number
        debug=True,           # Enable debug mode for development
        use_reloader=False    # Disable reloader to avoid double init
    )
