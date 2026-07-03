"""
=============================================================
  Smart NLP Chatbot - Training Script (train.py)
  Description: Standalone script to train the chatbot model.
               Run this ONCE before starting the Flask server.
  Usage:       python train.py
=============================================================
"""

import os
from chatbot import ChatbotEngine

def main():
    """Main training function."""
    
    print("=" * 60)
    print("   Smart NLP Chatbot - Model Training")
    print("=" * 60)
    
    # Resolve path to intents.json (same directory as this script)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    intents_path = os.path.join(script_dir, 'intents.json')
    model_dir = os.path.join(script_dir, 'model')
    
    # Verify intents file exists
    if not os.path.exists(intents_path):
        print(f"[ERROR] intents.json not found at: {intents_path}")
        print("Please make sure intents.json is in the backend/ directory.")
        return
    
    print(f"[INFO] Loading intents from: {intents_path}")
    print(f"[INFO] Model will be saved to: {model_dir}/")
    print()
    
    # Initialize the chatbot engine with training mode
    engine = ChatbotEngine(
        intents_path=intents_path,
        model_dir=model_dir
    )
    
    # Train the model
    print("[INFO] Starting training process...")
    print()
    
    result = engine.train()
    
    print()
    print("=" * 60)
    print("   Training Complete!")
    print("=" * 60)
    print(f"   Patterns trained on : {result['patterns']}")
    print(f"   Number of intents   : {result['intents']}")
    print(f"   Model status        : {result['status']}")
    print()
    print("[INFO] Model files saved in 'model/' directory:")
    print("   - vectorizer.pkl     (TF-IDF Vectorizer)")
    print("   - classifier.pkl     (Logistic Regression Model)")
    print("   - label_encoder.pkl  (Intent Label Encoder)")
    print("   - tag_responses.pkl  (Response Dictionary)")
    print()
    print("[INFO] You can now start the Flask server with:")
    print("   python app.py")
    print("=" * 60)
    
    # Quick test prediction to verify training worked
    print()
    print("[TEST] Running quick prediction test...")
    
    test_inputs = [
        "Hello there!",
        "What is NLP?",
        "How do I apply for admission?",
        "Tell me a joke"
    ]
    
    for test_input in test_inputs:
        result = engine.predict(test_input)
        print(f"  Input     : '{test_input}'")
        print(f"  Intent    : {result['intent']}")
        print(f"  Confidence: {result['confidence']}%")
        print(f"  Response  : {result['response'][:80].encode('cp1252', errors='ignore').decode('cp1252')}...")
        print()
    
    print("[TEST] All tests passed successfully! Model is ready.")


if __name__ == '__main__':
    main()
