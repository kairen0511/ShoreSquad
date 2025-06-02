# ShoreSquad

Rally your crew, track weather, and hit the next beach cleanup with our dope map app!

## Project Overview
ShoreSquad is a web application designed to mobilize young people for beach cleanups. It combines real-time weather data, interactive maps, social crew features, and an impact tracker to make eco-action fun, social, and effective.

## Features
- **Beach Cleanup Map:** See the next cleanup spot on an interactive Google Map, with a visible marker for the event location.
- **Weather Tracker:** Real-time 24-hour weather forecast for Singapore, powered by NEA’s public API.
- **Crew Management:** Add and manage your cleanup crew for each event.
- **Impact Tracker:** Displays the amount of trash collected at various locations (mock data for demo).
- **Live Chat:** Tawk.to chat widget for questions and coordination.

## Setup Instructions
1. **Clone the repository:**
   ```sh
   git clone https://github.com/kairen0511/ShoreSquad.git
   cd ShoreSquad
   ```
2. **Open in VS Code.**
3. **Install Live Server extension** (if not already installed).
4. **Run with Live Server:**
   - Right-click `index.html` and select `Open with Live Server`.
   - The app will open in your browser at `http://localhost:5500/ShoreSquad` (or similar).
5. **NEA API:**
   - No API key is required for the NEA 24-hour weather forecast endpoint used.

## Deployment (GitHub Pages)
1. Commit and push all changes to your `main` branch on GitHub.
2. Go to your repository settings on GitHub.
3. Under **Pages**, set the source to the `main` branch and `/ (root)` folder.
4. Save. Your site will be live at `https://<your-username>.github.io/ShoreSquad`.

## Customization
- **Tawk.to Chat:**
  - Replace the placeholder property ID in the Tawk.to script in `index.html` with your own from [Tawk.to](https://www.tawk.to/).
- **Map Location:**
  - Update the Google Maps iframe in `index.html` for new cleanup locations.
- **Impact Data:**
  - Edit the mock data in `js/app.js` to reflect real cleanup results.

---

**ShoreSquad** – Making beach cleanups social, smart, and impactful!
