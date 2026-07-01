import yfinance as yf
import pandas as pd
import numpy as np
import sqlite3 
from datetime import datetime


class MarketDataPipeline:

    def __init__(self, db_name="market_data.db"):
        self.conn = sqlite3.connect(db_name)
        self.cursor = self.conn.cursor()
        self.create_tables()

    def create_tables(self):
       self.cursor.execute("""
       CREATE TABLE IF NOT EXISTS daily_prices(
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         ticker TEXT,
         date TEXT,
         open_price REAL,
         high REAL,
         low REAL,
         close_price REAL,
         volume INTEGER,
         UNIQUE(ticker, date)
       )
       """)
       self.conn.commit()

       # ===========================================
       # EXTRACTION METHODS
       #============================================

    def seed_historical_data(self, ticker_symbol, start_date="2020-01-01"):
         """Run ONCE to populate the database with years of training data."""
         print(f"--- SEEDING BULK DATA FOR {ticker_symbol} ---")
         try: 
            stock = yf.Ticker(ticker_symbol)
            data = stock.history(start=start_date)
            if not data.empty:
              
              self._load_dataframe_to_db(data, ticker_symbol)
            else:
              print(f"No historical data found for {ticker_symbol}.")
         except Exception as e:
            print(f"Error fetching historical data: {e}")

    def update_daily_data(self, ticker_symbol):
        """Run DAILY to append the most recent market closing data."""
        print(f"--- FETCHING DAILY UPDATE FOR {ticker_symbol} ---")
        try: 
            stock =yf.Ticker(ticker_symbol)
            data = stock.history(period="5d")
            if not data.empty:
                 
                 self._load_dataframe_to_db(data, ticker_symbol)
            else:
              print(f"No recent data found for {ticker_symbol}.")
        except Exception as e:
          print(f"Error fetching daily data: {e}")

    # ============================================================
    #  LOAD METHOD (Shared by both extractors)
    # ============================================================

    def _load_dataframe_to_db(self, df, ticker_symbol):
      """Internal helper method to handle secure database insertion."""
      records_inserted = 0

      for index, row in df.iterrows():
        # Handle different index formats between yf.download and yf.Ticker 
       if isinstance(index, tuple):
         date_val = index[0]
       else:
        date_val = index
       
       date_str = pd.to_datetime(date_val).strftime('%Y-%m-%d')

       try: 
        self.cursor.execute('''INSERT OR IGNORE INTO daily_prices
        (ticker, date, open_price, high, low, close_price, volume)
        VALUES (?,?,?,?,?,?,?)''',
        (ticker_symbol, date_str, 
        float(row['Open']), 
        float(row['High']),
        float(row['Low']), 
        float(row['Close']), 
        int(row['Volume'])))

        if self.cursor.rowcount > 0:
          records_inserted += 1
        
       except sqlite3.Error as e:
        print(f"Database error on {date_str}: {e}")

      self.conn.commit()
      print(f"Success: {records_inserted} new records saved to database.\n")

    def close_connection(self):
      self.conn.close() 

# =============================================================
# EXECUTION LOGIC
# =============================================================

if __name__ == "__main__":
  pipeline = MarketDataPipeline()

  ticker = "AAPL"

  # First, we seed the database (bulk fetch)

  # //// pipeline.seed_historical_data(ticker)


  # Run the daily update, it won't duplicate due to the 'INSERT OR IGNORE' fuction

  pipeline.update_daily_data(ticker)

  pipeline.close_connection()

           
            
  
          
          
          
           
            
  
          
          
          