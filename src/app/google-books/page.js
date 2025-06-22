"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function GoogleBooksSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10; // Google Books API default is 10, max is 40

  const handleSearch = async (page = 1) => {
    if (!searchTerm.trim()) {
      setResults([]);
      setTotalItems(0);
      setError("Please enter a search term.");
      return;
    }
    setLoading(true);
    setError(null);
    setCurrentPage(page);

    try {
      // In a real app, hide API keys in environment variables
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
      if (!apiKey) {
        throw new Error("API key for Google Books is missing. Please configure NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY.");
      }
      const startIndex = (page - 1) * itemsPerPage;
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&key=${apiKey}&startIndex=${startIndex}&maxResults=${itemsPerPage}`;

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.items || []);
      setTotalItems(data.totalItems || 0);
      if (!data.items || data.items.length === 0) {
        setError("No books found for your query.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setError(err.message);
      setResults([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="container mx-auto p-4 min-h-screen bg-background text-foreground">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold">Google Books Search</h1>
        <Link href="/" className="text-blue-400 hover:text-blue-300 transition-colors">
          &larr; Back to Home
        </Link>
      </header>

      <div className="search-bar mb-6 max-w-xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for books (e.g., 'Next.js')"
            className="flex-grow p-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(1)}
          />
          <button
            onClick={() => handleSearch(1)}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Search'
            )}
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 text-center mb-4">{error}</p>}

      {results.length > 0 && (
        <div className="results-list space-y-4">
          {results.map((book) => (
            <div key={book.id} className="p-4 border border-gray-700 rounded-lg bg-gray-800 shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-1 text-blue-400">
                <Link href={`/google-books/${book.id}`} className="hover:underline">
                  {book.volumeInfo.title}
                </Link>
              </h2>
              {book.volumeInfo.authors && (
                <p className="text-gray-400 mb-1">By: {book.volumeInfo.authors.join(', ')}</p>
              )}
              {book.volumeInfo.imageLinks?.thumbnail && (
                <img
                  src={book.volumeInfo.imageLinks.thumbnail}
                  alt={`Cover of ${book.volumeInfo.title}`}
                  className="w-20 h-auto float-left mr-4 mb-2 rounded shadow"
                />
              )}
              <p className="text-gray-300 line-clamp-3">
                {book.volumeInfo.description || "No description available."}
              </p>
            </div>
          ))}
        </div>
      )}

      {totalItems > 0 && totalPages > 1 && (
        <div className="pagination-controls mt-8 flex justify-center items-center space-x-2">
          <button
            onClick={() => handleSearch(1)}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md disabled:opacity-50 transition-colors"
          >
            First
          </button>
          <button
            onClick={() => handleSearch(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md disabled:opacity-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handleSearch(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md disabled:opacity-50 transition-colors"
          >
            Next
          </button>
          <button
            onClick={() => handleSearch(totalPages)}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md disabled:opacity-50 transition-colors"
          >
            Last
          </button>
        </div>
      )}
    </div>
  );
}
