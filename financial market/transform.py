import sqlite3
import pandas as pd

class FeatureEngineer:

    def __init__(self, db_name="market_data.db"):

        self.conn = sqlite3.connect(db_name)

    def calculate_features(self, ticker_symbol):
        print(f"--- ENGINEERING FEATURES FOR {ticker_symbol}---")

        # extraction (read row data)

        query = f"SELECT * FROM daily_prices WHERE ticker = '{ticker_symbol}' ORDER BY date ASC"
        df = pd.read_sql_query(query, self.conn)
        if df.empty:
            print(f"No data found in database for {ticker_symbol}.")
            return

        # setting the data as the index, helps to make the time-based math work correctly

        df.set_index('date', inplace=True)

        # Transform

        # 10d & 50d Simple Moving Average 

        df['sma_10'] = df['close_price'].rolling(window=10).mean()
        df['sma_50'] = df['close_price'].rolling(window=50).mean()

        #  Daily Return (Percentage change from the previos day)

        df['daily_return'] = df['close_price'].pct_change()
        
        #  10d Volatility (Standard deviation of daily returns)

        df['Volatility_10d'] = df['daily_return'].rolling(window=10).std()

        # drop NaN  rows

        df.dropna(inplace=True)

        table_name = "engineerd_features"

        df.to_sql(table_name, self.conn, if_exists='replace', index=True)

        print(f"Succes! {len(df)} rows of engineered features saved to the '{table_name}' table.\n")


