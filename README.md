# Personal Hobbies Platform

A beautiful, fully-functional React web application for tracking books, movies, and hobbies.

## Features

### ✅ Fully Functional
- **Books Section** - Track books you've read and want to read
  - Search by title, author, or genre
  - Filter by status and genre
  - Rate and review books you've read
  - Star ratings (1-5)
  - Personal reviews + official summaries
  - Links to Goodreads

- **Movies Section** - Manage your movie watchlist
  - Search by title, director, or genre
  - Filter by status, genre, and year
  - Rate and review watched movies
  - Track watch dates
  - Links to IMDB

### 🚧 Coming Soon
- **Hiking** - Interactive trail maps, completed hikes, photo galleries
- **Sports** - Fitness tracking, workout logs, team schedules

## Tech Stack
- React 18 with TypeScript
- React Router v6 for navigation
- Context API for state management
- LocalStorage for data persistence
- CSS for styling with custom design system
- Vite for fast development

## Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open your browser to `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
\`\`\`

The production-ready files will be in the `dist` folder.

## Project Structure

\`\`\`
src/
├── components/
│   ├── common/        # Reusable components
│   ├── books/         # Book-specific components
│   └── movies/        # Movie-specific components
├── context/           # State management
├── data/             # JSON data files
├── pages/            # Page components
├── styles/           # CSS files
└── App.tsx           # Main app component
\`\`\`

## Features in Detail

### Data Management
- All data stored in localStorage for persistence
- Books and movies managed through Context API
- Easy CRUD operations (Create, Read, Update, Delete)

### Search & Filtering
- Real-time search across multiple fields
- Multi-select genre filtering
- Sort by title, rating, date, or year
- Tab-based organization

### User Experience
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Interactive modals for ratings
- Expandable cards for detailed views
- "Under Construction" states for future features

## Customization

### Adding Your Own Data

Edit the JSON files in `src/data/`:
- `books.json` - Your book collection
- `movies.json` - Your movie watchlist

### Styling

The design uses CSS custom properties for easy theming. Edit `src/App.css` to customize:
- Colors
- Fonts
- Spacing
- Animations

## Future Enhancements

### Phase 2: Hiking Features
- Interactive map with React Leaflet or Mapbox
- Trail markers (completed vs planned)
- Photo galleries
- Difficulty ratings
- Gear tracking

### Phase 3: Social Platform
- User authentication
- Friend connections
- Shared recommendations
- Blog/tips section
- Community features

## Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Deploy to Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

## License
MIT License - Feel free to use this project for your own hobbies tracking!

## Credits
Built with ❤️ using React, TypeScript, and lots of coffee ☕
