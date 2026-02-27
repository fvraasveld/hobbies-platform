import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book } from '../data/types';
import booksData from '../data/books.json';

interface BooksContextType {
  books: Book[];
  addBook: (book: Omit<Book, 'id' | 'dateAdded'>) => void;
  updateBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  markAsRead: (id: string, rating: number, review: string, dateFinished: string) => void;
  markAsToRead: (id: string) => void;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Load from localStorage or use initial data
    const stored = localStorage.getItem('books');
    if (stored) {
      setBooks(JSON.parse(stored));
    } else {
      setBooks(booksData as Book[]);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage whenever books change
    if (books.length > 0) {
      localStorage.setItem('books', JSON.stringify(books));
    }
  }, [books]);

  const addBook = (book: Omit<Book, 'id' | 'dateAdded'>) => {
    const newBook: Book = {
      ...book,
      id: `book-${Date.now()}`,
      dateAdded: new Date().toISOString(),
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, ...updates } : book
    ));
  };

  const deleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const markAsRead = (id: string, rating: number, review: string, dateFinished: string) => {
    updateBook(id, {
      status: 'read',
      myRating: rating,
      myReview: review,
      dateFinished,
    });
  };

  const markAsToRead = (id: string) => {
    updateBook(id, {
      status: 'to-read',
      myRating: undefined,
      myReview: undefined,
      dateFinished: undefined,
    });
  };

  return (
    <BooksContext.Provider value={{ books, addBook, updateBook, deleteBook, markAsRead, markAsToRead }}>
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BooksContext);
  if (!context) {
    throw new Error('useBooks must be used within BooksProvider');
  }
  return context;
};
