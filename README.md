# PSF'27 Investor Relations — GitHub-ready website

This package contains the complete PSF'27 investor participation confirmation website.

## Upload to GitHub Pages

Upload these files to the root of your GitHub repository:

- `index.html`
- `style.css`
- `script.js`
- `psf27-logo.png`

`Code.gs` is the Google Apps Script backend source. It can also be stored in the repository for your team's reference, but it is not required by GitHub Pages.

## Google Apps Script

The included `script.js` is already configured with the deployed PSF'27 Google Apps Script Web App URL.

The Google Sheet should remain private to the Investor Relations team.

## GitHub Pages

1. Create a GitHub repository, e.g. `psf27-investor-relations`.
2. Upload the website files to the repository root.
3. Open **Settings → Pages**.
4. Select **Deploy from a branch**.
5. Select branch **main** and folder **/ (root)**.
6. Save.
7. Open the generated GitHub Pages URL.

## Form data

Investor submissions are sent to the Google Sheet through Google Apps Script and include:

- Timestamp
- Full Name
- Organisation / Venture / Fund
- Designation / Role
- Contact Number
- Email
- LinkedIn
- Preferred Attendance Day
- Confirmation
- Queries
- Source

## Important

Do not publish the Google Sheet itself. Do not place Google account passwords, API keys, OAuth client secrets, or other private credentials in this repository.

If the Apps Script deployment URL is changed in the future, update `SCRIPT_URL` in `script.js`.
