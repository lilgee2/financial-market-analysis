import time
import sqlite3
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

DB_NAME = "market_data.db"

def init_database():
    """Creates the local database file and tables if they do not exist."""
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # 1. Keep your existing REIT table intact
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS reit_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticker TEXT NOT NULL,
            price_cents REAL NOT NULL,
            scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # 2. Add a new table for Equities (Gainers/Losers)
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS equity_prices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ticker TEXT NOT NULL,
            price_cents REAL NOT NULL,
            category TEXT NOT NULL,
            scraped_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    conn.commit()
    conn.close()
    print(f"Database initialized: '{DB_NAME}' tables are ready.")

def save_reit_to_db(ticker, price):
    """Inserts a fresh REIT price record into the database."""
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO reit_prices (ticker, price_cents) VALUES (?, ?)
        """, (ticker, price))
        conn.commit()
        conn.close()
        print(f"   -> Saved REIT: {ticker} at {price:.2f} cents")
    except Exception as e:
        print(f"   -> Error saving REIT {ticker}: {e}")

def save_equity_to_db(ticker, price, category):
    """Inserts a fresh Equity price record with its category (Gainer/Loser)."""
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO equity_prices (ticker, price_cents, category) 
            VALUES (?, ?, ?)
        """, (ticker, price, category))
        conn.commit()
        conn.close()
        print(f"   -> Saved Equity [{category}]: {ticker} at {price:.2f} cents")
    except Exception as e:
        print(f"   -> Error saving Equity {ticker}: {e}")

def scrape_zse_market():
    init_database()
    
    print("\nStarting the ghost browser (Headless Mode)...")
    
    # --- NEW HEADLESS CONFIGURATION ---
    chrome_options = Options()
    chrome_options.add_argument("--headless") # This hides the window!
    chrome_options.add_argument("--window-size=1920,1080") # Prevents mobile-layout bugs
    chrome_options.add_argument("--log-level=3") # Hides messy terminal warnings
    
    service = Service(ChromeDriverManager().install())
    # Pass the options into the driver
    driver = webdriver.Chrome(service=service, options=chrome_options) 
    # ----------------------------------
    
    try:
        print("Navigating to ZSE silently in the background...")
        driver.get("https://www.zse.co.zw/")
        
        print("Waiting 10 seconds for JavaScript to render the live data...")
        time.sleep(10) 
        
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        tables = soup.find_all("table")
        
        # Define our scraping targets based on your table investigation mapping
        # Format: { table_index: ("Category Name", "Type") }
        targets = {
            1: ("Top Gainers", "Equity"),
            2: ("Top Losers", "Equity"),
            4: ("Real Estate Investment Trusts", "REIT")
        }
        
        for index, (category_name, asset_type) in targets.items():
            if len(tables) > index:
                print(f"\n--- PROCESSING TABLE {index}: {category_name} ---")
                table = tables[index]
                rows = table.find_all('tr')[1:] # Skip headers
                
                for row in rows:
                    cells = row.find_all(['td', 'th'])
                    data = [cell.text.strip().replace('\n', '').replace('\r', '') for cell in cells]
                    
                    if len(data) >= 2 and data[0] != "":
                        ticker = data[0]
                        raw_price = data[1]
                        
                        # Skip the text headers if they appear
                        if ticker in ["REIT Name", "Company"]:
                            continue
                            
                        try:
                            clean_price = float(raw_price)
                            
                            # Direct the data to the right database table
                            if asset_type == "REIT":
                                save_reit_to_db(ticker, clean_price)
                            else:
                                save_equity_to_db(ticker, clean_price, category_name)
                                
                        except ValueError:
                            print(f"   Skipping row for {ticker}: Invalid price format '{raw_price}'")
            else:
                print(f"Could not find Table {index} ({category_name}) on the page.")
            
    except Exception as e:
        print(f"An error occurred: {e}")
        
    finally:
        print("\nClosing the browser...")
        driver.quit()

if __name__ == "__main__":
    scrape_zse_market()