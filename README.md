Title: js-banklist

Description:
A minimal, front-end banking demo app implemented with vanilla JavaScript, HTML and CSS. It showcases common banking UI features (login, balance, transaction list, transfers, loan requests, account closure, sorting, localized currency/date formatting, and an auto-logout timer) and is intended for learning, demoing UI/DOM techniques, and experimenting with date/currency APIs.

Features:

Login: Username + PIN-based client-side authentication.
Balances: Live calculation and formatted currency display.
Transactions: View deposits/withdrawals with relative dates (Today/Yesterday/NN days ago) and locale-aware formatting.
Transfer: Send money between sample accounts (client-side only).
Loan: Request loan with a simulated approval delay.
Close Account: Delete an account from the local dataset.
Sort: Toggle sorting of transactions.
Auto-logout timer: Session timer that logs the user out after inactivity.
Sample Accounts: Preloaded demo accounts for quick testing.
Tech Stack:

Frontend: Vanilla JavaScript (ES6+), HTML5, CSS3
APIs used: Intl.NumberFormat, Intl.DateTimeFormat, Date utilities
Sample accounts (for demo):

js — PIN 1111
jd — PIN 2222
stw — PIN 3333
ss — PIN 4444
Getting Started:

Clone or download the repo.
Open index.html in a modern browser (no build step required).
Usage:

Enter one of the sample usernames and its PIN to log in.
Try transfers, request loans, sort transactions, and close accounts to see UI updates.
The logout timer will hide the UI when time expires.
Notes & Improvements:

All logic runs client-side; this is a demo and not secure for real banking.
Replace client-side auth and storage with a backend and secure auth for production.
Consider adding persistent storage (localStorage) or a proper API for persistence.
License:

No license specified. Add a LICENSE file if you want to set usage terms (e.g., MIT).