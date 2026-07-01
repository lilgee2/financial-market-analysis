from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_NAME = "market_data.db"

@app.get("/api/market/reits")
def get_reits():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT ticker, price_cents, scraped_at FROM reit_prices ORDER BY scraped_at DESC LIMIT 10")
        data = [{"ticker": row[0], "price": row[1], "date": row[2]} for row in cursor.fetchall()]
    except sqlite3.OperationalError:
        data = []
    conn.close()
    return data

@app.get("/api/market/equities/{category}")
def get_equities(category: str):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    # category is expected to be 'Top Gainers' or 'Top Losers'
    try:
        cursor.execute("SELECT ticker, price_cents, scraped_at FROM equity_prices WHERE category = ? ORDER BY scraped_at DESC LIMIT 10", (category,))
        data = [{"ticker": row[0], "price": row[1], "date": row[2]} for row in cursor.fetchall()]
    except sqlite3.OperationalError:
        data = []
    conn.close()
    return data

@app.post("/api/login")
def login(creds: dict):
    # Dummy authentication for illustration
    if creds.get("username") and creds.get("password"):
        return {"token": "dummy-jwt-token"}
    return {"error": "Invalid credentials"}
