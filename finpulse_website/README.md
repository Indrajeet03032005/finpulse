# FinPulse local website prototype

## Requirements
- Python 3.10 or newer (3.11 or 3.12 recommended)
- Internet connection for external Unsplash photos and Google Fonts (the website itself runs locally)

## Windows Command Prompt setup
1. Extract this folder anywhere, for example `C:\Users\YourName\Downloads\finpulse_website`.
2. Open **Command Prompt** (not the Python `>>>` shell).
3. Run:

```bat
cd /d "%USERPROFILE%\Downloads\finpulse_website"
py -m venv .venv
.venv\Scripts\activate
python -m pip install -r requirements.txt
python app.py
```

4. Visit **http://127.0.0.1:5000** in your browser.
5. Stop the server with Ctrl+C.

If your folder is elsewhere, replace the `cd /d` path with its real location. If `py` is not recognized, try `python -m venv .venv`.

## What works
- Responsive multi-section landing page
- Interactive illustrative savings projection calculator
- Interest form saves name, email and goal in local SQLite file `leads.db`
- Fictional personas, concept dashboard, editorial cards

## Not yet implemented
- User accounts, authentication, investment transactions, personalized financial advice, real portfolio data, live market feeds, emailing leads or appointment booking
- External images/fonts need internet access; replace URLs with locally owned images before production
- Flask development server is **local testing only**, not for public production hosting

## Before publishing
- Replace sample images with licensed brand photography
- Obtain permission before publishing real testimonials
- Set up secure hosting, proper data storage and privacy safeguards for lead collection
- Turn off debug mode, use a production server and review public-facing financial-service claims
