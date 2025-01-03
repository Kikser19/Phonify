from Crawlers import ANHOCH, MOBELIX, TELEKOM, NEPTUN, SETEC
import pandas as pd
from concurrent.futures import ThreadPoolExecutor, as_completed
from sqlalchemy import create_engine
from sqlalchemy.exc import SQLAlchemyError
import urllib

def main():
    # List of scripts and their scrape functions
    scripts = [ANHOCH, TELEKOM, NEPTUN, SETEC, MOBELIX]

    database_url = "mssql+pyodbc:///?odbc_connect={}".format(urllib.parse.quote_plus(
        "Driver={ODBC Driver 17 for SQL Server};"
        "Server=ETEREO\\SQLEXPRESS;"
        "Database=Phonify;"
        "Trusted_Connection=yes;"
    ))

    engine = create_engine(database_url)

    # List to store DataFrames
    dataframes = []
    final_df = pd.DataFrame()
    # Threading: Run all scraping functions concurrently
    with ThreadPoolExecutor(max_workers=len(scripts)) as executor:
        futures = {executor.submit(script.scrape): script for script in scripts}

        for future in as_completed(futures):
            script = futures[future]
            try:
                print(f"Scraping data from {script.__name__}...")
                df = future.result()  # Get the result (DataFrame)
                dataframes.append(df)
            except Exception as e:
                print(f"Error scraping data from {script.__name__}: {e}")

    # Combine all DataFrames into one
    if dataframes:
        final_df = pd.concat(dataframes, ignore_index=True)

        # Save the combined DataFrame to a CSV file
        output_file = "all_phones.csv"
        final_df.to_csv(output_file, index=False)
        print(f"All data saved to {output_file}.")
    else:
        print("No data was scraped.")

    try:
        final_df.to_sql('Mobile', con=engine, if_exists='append', index=False)
        print("Data successfully inserted into the database.")
    except SQLAlchemyError as e:
        print(f"Error inserting data into the database: {e}")


if __name__ == "__main__":
    main()
