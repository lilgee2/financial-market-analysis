import sqlite3

DB_NAME = "market_data.db"

def print_dashboard_section(title, rows):
    """Helper function to format and print a clean ASCII table."""
    print(f"\n--- {title.upper()} ---")
    if not rows:
        print("No records found in this category.")
        return
        
    print(f"{'Ticker':<12} | {'Price (Cents)':<15}")
    print("-" * 30)
    for row in rows:
        ticker, price = row
        print(f"{ticker:<12} | {price:<15.2f}")

def view_market_dashboard():
    print(f"Connecting to {DB_NAME}...\n")
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    try:
        # 1. Query the 5 most recent Top Gainers
        cursor.execute("""
            SELECT ticker, price_cents 
            FROM equity_prices 
            WHERE category = 'Top Gainers' 
            ORDER BY scraped_at DESC 
            LIMIT 5
        """)
        gainers = cursor.fetchall()
        
        # 2. Query the 5 most recent Top Losers
        cursor.execute("""
            SELECT ticker, price_cents 
            FROM equity_prices 
            WHERE category = 'Top Losers' 
            ORDER BY scraped_at DESC 
            LIMIT 5
        """)
        losers = cursor.fetchall()
        
        # 3. Query the 5 most recent REITs
        cursor.execute("""
            SELECT ticker, price_cents 
            FROM reit_prices 
            ORDER BY scraped_at DESC 
            LIMIT 5
        """)
        reits = cursor.fetchall()

        # --- RENDER THE DASHBOARD ---
        print("=" * 35)
        print("   ZSE LIVE MARKET DASHBOARD")
        print("=" * 35)
        
        print_dashboard_section("Top Gainers", gainers)
        print_dashboard_section("Top Losers", losers)
        print_dashboard_section("REITs", reits)
        
        print("\n" + "=" * 35)
        
    except Exception as e:
        print(f"An error occurred while reading the database: {e}")
        
    finally:
        conn.close()

if __name__ == "__main__":
    view_market_dashboard()