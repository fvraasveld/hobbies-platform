// Book interface
export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string[];
  coverImageUrl: string;
  officialSummary: string;
  officialLink: string;
  status: 'read' | 'to-read' | 'currently-reading';
  dateAdded: string;
  dateFinished?: string;
  myRating?: number;
  myReview?: string;
  tags?: string[];
}

export interface BookFilters {
  searchTerm: string;
  genre: string[];
  status: 'all' | 'read' | 'to-read' | 'currently-reading';
  sortBy: 'title' | 'author' | 'rating' | 'dateFinished';
  sortOrder: 'asc' | 'desc';
}

// Movie interface
export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  genre: string[];
  posterUrl: string;
  officialSummary: string;
  officialLink: string;
  status: 'watched' | 'to-watch' | 'currently-watching';
  dateAdded: string;
  dateWatched?: string;
  myRating?: number;
  myReview?: string;
  tags?: string[];
  runtime?: number;
}

export interface MovieFilters {
  searchTerm: string;
  genre: string[];
  status: 'all' | 'watched' | 'to-watch';
  yearRange?: [number, number];
  sortBy: 'title' | 'year' | 'rating' | 'dateWatched';
  sortOrder: 'asc' | 'desc';
}

// Hiking interface (future use)
export interface Hike {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  distance: number;
  elevationGain: number;
  difficulty: 'easy' | 'moderate' | 'hard' | 'extreme';
  trailType: 'loop' | 'out-and-back' | 'point-to-point';
  status: 'completed' | 'planned';
  description: string;
  dateCompleted?: string;
  myRating?: number;
  myNotes?: string;
  season?: 'spring' | 'summer' | 'fall' | 'winter';
  photos?: string[];
  videos?: string[];
  gearUsed?: string[];
  trailConditions?: string;
  tags?: string[];
}
