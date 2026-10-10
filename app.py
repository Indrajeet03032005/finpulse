from flask import Flask, render_template, request, jsonify
from pathlib import Path
import sqlite3, re
from datetime import datetime, timezone

app = Flask(__name__)
DB = Path(__file__).with_name('leads.db')

def init_db():
    with sqlite3.connect(DB) as con:
        con.execute('CREATE TABLE IF NOT EXISTS leads (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, goal TEXT NOT NULL, created_at TEXT NOT NULL)')

@app.get('/')
def home():
    return render_template('index.html')

@app.post('/api/interest')
def interest():
    data = request.get_json(silent=True) or {}
    name = str(data.get('name', '')).strip()[:100]
    email = str(data.get('email', '')).strip()[:200]
    goal = str(data.get('goal', '')).strip()[:120]
    if len(name) < 2 or not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', email) or not goal:
        return jsonify(ok=False, message='Please enter your name, a valid email and your goal.'), 400
    with sqlite3.connect(DB) as con:
        con.execute('INSERT INTO leads (name,email,goal,created_at) VALUES (?,?,?,?)', (name,email,goal,datetime.now(timezone.utc).isoformat()))
    return jsonify(ok=True, message='Thanks! Your interest has been saved in this local demo.')

if __name__ == '__main__':
    init_db()
    app.run(host='127.0.0.1', port=5000, debug=True)
