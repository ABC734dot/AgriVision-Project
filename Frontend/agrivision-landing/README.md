# AgriVision — Landing + Dashboard (React)

A componentized React + Vite app with two routed pages:

- `/` — the marketing landing page (hero, farmer-story rails, CTA)
- `/dashboard` — the post-login crop recommendation dashboard

The two are linked: clicking the profile icon, "Now it's your turn", or the
footer "Log in here" opens the login modal; submitting it (login or signup)
navigates to `/dashboard`. The AgriVision logo in the dashboard sidebar links
back to `/`.

## Run it

```bash
npm install
npm run dev      # local dev server, then open the printed localhost URL
npm run build    # production build to /dist
npm run preview  # serve that production build locally
```

## Structure

```
src/
├── main.jsx                     # React entry point
├── App.jsx                      # Router root: defines "/" and "/dashboard",
│                                 # owns the login-modal open/close state
├── App.css
├── styles/
│   └── tokens.css               # Shared CSS variables (colors, fonts), reset
│
├── components/                  # Shared across both pages
│   ├── BrandMark.jsx/.css       # Logo mark
│   ├── Header.jsx/.css          # Landing page top nav + profile icon
│   ├── Footer.jsx/.css          # Landing page footer
│   └── LoginModal.jsx/.css      # Login/signup modal — navigates to
│                                 # /dashboard on submit via useNavigate()
│
└── pages/
    ├── landing/
    │   ├── LandingPage.jsx       # Composes Header, Hero, FieldRows,
    │   │                         # TurnSection, Footer
    │   ├── data/
    │   │   └── stories.js        # Farmer story content for both rails
    │   └── components/
    │       ├── Hero.jsx/.css         # Video hero, headline, primary CTA
    │       ├── ScanReadout.jsx/.css  # Live-ticking soil data element
    │       ├── FieldRows.jsx/.css    # Section wrapper for the two rails
    │       ├── Rail.jsx/.css         # One scrollable row + nav arrows
    │       ├── StoryCard.jsx/.css    # Single farmer-story card
    │       └── TurnSection.jsx/.css  # Second CTA block
    │
    └── dashboard/
        ├── DashboardPage.jsx     # Composes Sidebar, Topbar, input/result
        │                         # panels, insight strip. Owns isLoading
        │                         # and hasRun state for the recommendation run.
        ├── data/
        │   └── crops.js           # Mock ranked crop recommendation data
        └── components/
            ├── Sidebar.jsx/.css          # Nav, active-field switcher, profile.
            │                             # Brand logo links back to "/"
            ├── Topbar.jsx/.css           # Greeting + live season badge
            ├── FieldInputPanel.jsx/.css  # Sliders/inputs + run button
            ├── RecommendationPanel.jsx/.css  # Empty state or rank list
            ├── RankItem.jsx/.css         # One expandable ranked crop row
            └── InsightStrip.jsx/.css     # Bottom stat cards
```

## How the pages are linked

- `App.jsx` wraps everything in `<BrowserRouter>` and defines two `<Route>`s.
- `LoginModal` is mounted once at the router root (not inside either page),
  so it can be opened from landing-page triggers and still navigate to
  `/dashboard` regardless of which trigger opened it.
- `Sidebar` (dashboard) wraps its logo in a `<Link to="/">` to return to the
  landing page.

This is a front-end-only prototype: the login form doesn't call a real API,
it just calls `navigate('/dashboard')` on submit so the flow is clickable
end-to-end.
