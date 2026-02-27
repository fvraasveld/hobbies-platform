# 🚀 Personal Hobbies Platform - Complete Setup Guide

## 📦 What You've Got

A fully-functional React + TypeScript application with:
- ✅ **Books tracking** with search, ratings, and reviews
- ✅ **Movies tracking** with watchlists and ratings
- ✅ Beautiful, modern UI with dark theme
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ LocalStorage data persistence
- 🚧 Hiking & Sports sections (coming soon placeholders)

## 🎯 Quick Start (3 Steps)

### Option A: sandbox.io (Easiest - No Local Setup)

1. Go to **sandbox.io** (or codesandbox.io)
2. Click **"Import from GitHub"** or **"Upload Project"**
3. Upload the entire `hobbies-platform` folder
4. That's it! It will auto-install and run

### Option B: Local Development

1. **Install Node.js** (if you don't have it)
   - Download from: https://nodejs.org/ (get LTS version)
   - Verify: Open terminal and run `node --version`

2. **Navigate to project folder**
   ```bash
   cd hobbies-platform
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   (Wait 1-2 minutes for packages to install)

4. **Start the app**
   ```bash
   npm run dev
   ```
   
5. **Open in browser**
   - Go to: http://localhost:3000
   - You should see your landing page!

## 📁 Project Structure Explained

```
hobbies-platform/
│
├── src/
│   ├── App.tsx              # Main app with routing
│   ├── main.tsx             # Entry point
│   │
│   ├── pages/               # Main page components
│   │   ├── Home.tsx         # Landing page with hobby tiles
│   │   ├── BooksPage.tsx    # Books section with 3 tabs
│   │   ├── MoviesPage.tsx   # Movies section with 3 tabs
│   │
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── StarRating.tsx
│   │   │   └── ComingSoon.tsx
│   │   ├── books/
│   │   │   └── BookCard.tsx
│   │   └── movies/
│   │       └── MovieCard.tsx
│   │
│   ├── context/             # State management
│   │   ├── BooksContext.tsx
│   │   └── MoviesContext.tsx
│   │
│   ├── data/                # Your data files (EDIT THESE!)
│   │   ├── types.ts         # TypeScript interfaces
│   │   ├── books.json       # Your books data
│   │   └── movies.json      # Your movies data
│   │
│   └── styles/              # All CSS files
│       ├── App.css          # Global styles
│       ├── Home.css
│       ├── BooksPage.css
│       └── ...
│
├── index.html               # HTML template
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
├── vite.config.ts           # Vite bundler config
└── README.md                # Documentation
```

## 🎨 Design System

### Colors
- Primary: Purple gradient (`#667eea → #764ba2`)
- Secondary: Pink gradient (`#f093fb → #f5576c`)
- Background: Dark (`#0f0f1a`)
- Cards: Navy (`#16213e`)

### Fonts
- Headings: **Playfair Display** (serif, elegant)
- Body: **DM Sans** (sans-serif, clean)

### Key Features
- Smooth animations and transitions
- Hover effects on cards and buttons
- Responsive grid layouts
- Modal dialogs for ratings
- Tab navigation

## 📝 How to Add Your Own Data

### Adding Books

Edit `src/data/books.json`:

```json
{
  "id": "book-7",
  "title": "Your Book Title",
  "author": "Author Name",
  "genre": ["Fiction", "Thriller"],
  "coverImageUrl": "https://images.unsplash.com/photo-...?w=300&h=450",
  "officialSummary": "Book description here...",
  "officialLink": "https://www.goodreads.com/book/show/...",
  "status": "read",
  "dateAdded": "2024-03-20",
  "dateFinished": "2024-03-25",
  "myRating": 5,
  "myReview": "Your thoughts here...",
  "tags": ["favorite", "must-read"]
}
```

**Getting Cover Images:**
- Use Unsplash: https://unsplash.com/s/photos/book
- Or upload to Imgur/Cloudinary and use the link
- Image should be roughly 300x450px

### Adding Movies

Edit `src/data/movies.json` similarly:

```json
{
  "id": "movie-6",
  "title": "Movie Title",
  "director": "Director Name",
  "year": 2024,
  "genre": ["Action", "Sci-Fi"],
  "posterUrl": "https://images.unsplash.com/photo-...?w=300&h=450",
  "officialSummary": "Movie plot...",
  "officialLink": "https://www.imdb.com/title/...",
  "status": "watched",
  "dateAdded": "2024-03-15",
  "dateWatched": "2024-03-18",
  "myRating": 4,
  "myReview": "Great film!",
  "runtime": 142
}
```

## 🎮 How to Use the App

### Landing Page
- Click on **"Reading"** or **"Movies"** tiles to open those sections
- Click on **"Hiking"** or **"Sports"** to see "Coming Soon" modal

### Books Page
**Tab 1: Search & Browse**
- Use search bar to find books
- Filter by genre
- Sort by title, author, etc.
- Click any book card to expand and see details

**Tab 2: Books I've Read**
- View all your finished books
- See your ratings and reviews
- Click to expand for full details
- "Move to To-Read" button to change status

**Tab 3: To Read**
- Your reading wishlist
- Click "Mark as Read" to rate and review
- Automatically moves to "Books I've Read"

### Movies Page
Same structure as Books, with 3 tabs:
- Search & Browse
- Movies I've Watched
- Watchlist

## 🔧 Customization Tips

### Change Colors

Edit `src/App.css` and modify CSS variables:

```css
:root {
  --primary: #6366f1;        /* Change this */
  --secondary: #ec4899;      /* And this */
  --bg-primary: #0f0f1a;     /* Background color */
  /* ... */
}
```

### Change Fonts

In `src/App.css`, update the Google Fonts import:

```css
@import url('https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap');

body {
  font-family: 'YourFont', sans-serif;
}
```

### Add More Hobbies

To activate Hiking or Sports:

1. Create the page component in `src/pages/`
2. Update `isActive: true` in `Home.tsx`
3. Add routing in `App.tsx`

## 📤 Deployment Options

### Vercel (Recommended)
1. Push code to GitHub
2. Go to vercel.com and sign in
3. "Import Project" → select your repo
4. Deploy! (automatic)

### Netlify
1. Push code to GitHub
2. Go to netlify.com
3. "Add new site" → "Import from Git"
4. Build command: `npm run build`
5. Publish directory: `dist`

### GitHub Pages
```bash
npm install gh-pages --save-dev
# Add to package.json scripts:
"deploy": "npm run build && gh-pages -d dist"
# Then run:
npm run deploy
```

## 🐛 Common Issues & Solutions

### "Cannot find module" errors
```bash
npm install
```

### Port already in use
```bash
# In vite.config.ts, change port:
server: { port: 3001 }
```

### Images not loading
- Check image URLs are valid
- Use Unsplash or Imgur for hosting
- Make sure URLs end in .jpg, .png, etc.

### Data not persisting
- Check browser's LocalStorage isn't disabled
- Try clearing browser cache
- Check browser console for errors (F12)

## 🚀 Next Steps & Future Features

### Phase 2: Hiking Section
- Install React Leaflet: `npm install react-leaflet leaflet`
- Add map component
- Create Hike interface and context
- Implement trail markers

### Phase 3: Social Features
- Install Firebase: `npm install firebase`
- Add authentication
- User profiles
- Friend system
- Shared recommendations

### Additional Ideas
- Export data to CSV
- Import from Goodreads API
- Dark/Light mode toggle
- Statistics dashboard
- PWA for offline access

## 📚 Resources

- **React Docs:** https://react.dev
- **TypeScript:** https://www.typescriptlang.org/docs/
- **Vite:** https://vitejs.dev
- **React Router:** https://reactrouter.com
- **CSS Tricks:** https://css-tricks.com

## 💬 Need Help?

Common questions:
1. **How do I add more books?** → Edit `src/data/books.json`
2. **Can I change the design?** → Yes! Edit CSS files in `src/styles/`
3. **How do I deploy?** → See "Deployment Options" above
4. **Can I add authentication?** → Yes, use Firebase Auth (Phase 3)

## 🎉 You're All Set!

Your hobbies platform is ready to use. Start by:
1. Adding your own books and movies to the JSON files
2. Customizing colors if you want
3. Deploying to share with others

Happy tracking! 🎬📚🥾
