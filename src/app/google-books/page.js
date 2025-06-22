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
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance' or 'newest'
  const [showFilters, setShowFilters] = useState(false); // State for filter menu visibility

  // State for filters
  const [filterPrintType, setFilterPrintType] = useState('all'); // 'all', 'books', 'magazines'
  const [filterEbook, setFilterEbook] = useState('all'); // 'all', 'ebooks', 'free-ebooks', 'paid-ebooks'
  // Potentially add more filters like language: const [filterLang, setFilterLang] = useState(''); // e.g., 'en', 'es'

  const itemsPerPage = 10; // Google Books API default is 10, max is 40

  const handleSearch = async (page = 1, newSearch = false) => {
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
      let url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&key=${apiKey}&startIndex=${startIndex}&maxResults=${itemsPerPage}`;

      // Apply sorting
      if (sortBy === 'newest') {
        url += '&orderBy=newest';
      }

      // Apply filters
      if (filterPrintType !== 'all') {
        url += `&printType=${filterPrintType}`;
      }
      if (filterEbook !== 'all') {
        // Google Books API uses 'filter=ebooks', 'filter=free-ebooks', 'filter=paid-ebooks'
        // For 'ebooks' (all types), it means any book that has an epub or pdf.
        // 'filter=partial' (allows books with partial previews)
        // 'filter=full' (allows only books with full text viewability)
        // For simplicity, we'll map our 'ebooks' to the API's 'ebooks' which covers general availability.
        if (filterEbook === 'ebooks') url += `&filter=ebooks`;
        else if (filterEbook === 'free-ebooks') url += `&filter=free-ebooks`;
        else if (filterEbook === 'paid-ebooks') url += `&filter=paid-ebooks`;
      }
      // Example for language filter if added:
      // if (filterLang) {
      //   url += `&langRestrict=${filterLang}`;
      // }

      if (newSearch) { // Reset current page to 1 if it's a new search term or sort/filter change
        setCurrentPage(1);
      }

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

      <div className="search-controls-bar mb-6 max-w-3xl mx-auto"> {/* Increased max-width for more items */}
        <div className="flex flex-col sm:flex-row gap-2 items-center"> {/* items-center for better vertical alignment if heights differ */}
          {/* Search Input */}
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for books..." // Slightly shorter placeholder
            className="flex-grow p-3 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-auto" // Ensure it takes available space
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(1)}
          />
          {/* Search Button */}
          <button
            onClick={() => handleSearch(1, true)} // Pass true for newSearch
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-md transition-colors disabled:opacity-50 flex items-center justify-center w-full sm:w-auto"
          >
            {loading && !results.length ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Search'
            )}
          </button>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              handleSearch(1, true); // Trigger search with new sort order, reset to page 1
            }}
            disabled={loading}
            className="bg-gray-700 hover:bg-gray-600 text-white font-semibold p-3 pr-8 rounded-md transition-colors disabled:opacity-50 w-full sm:w-auto appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
            style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.5rem center', backgroundSize: '1.5em 1.5em' }}
            aria-label="Sort results by"
          >
            <option value="relevance">Sort by Relevance</option>
            <option value="newest">Sort by Newest</option>
          </select>

          {/* Filters Button */}
          <button
            onClick={() => setShowFilters(!showFilters)} // Toggle filter menu
            disabled={loading}
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold p-3 rounded-md transition-colors disabled:opacity-50 w-full sm:w-auto"
            aria-label="Open filters"
            aria-expanded={showFilters} // Accessibility: indicates if menu is open
          >
            Filters
          </button>
        </div>
      </div>

      {/* Sliding Filter Menu */}
      {showFilters && (
        <div
          className="fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-gray-800 shadow-xl z-50 p-6 transform transition-transform duration-300 ease-in-out"
          // Applying transform based on showFilters for slide-in/out effect
          style={{ transform: showFilters ? 'translateX(0)' : 'translateX(100%)' }}
          role="dialog" // Accessibility
          aria-modal="true" // Accessibility
          aria-labelledby="filter-menu-title" // Accessibility
        >
          <div className="flex justify-between items-center mb-6">
            <h2 id="filter-menu-title" className="text-2xl font-semibold text-white">Filters</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close filters menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          {/* Filter Options */}
          <div className="space-y-6">
            {/* Print Type Filter */}
            <div>
              <label htmlFor="filter-print-type" className="block text-sm font-medium text-gray-300 mb-1">Print Type</label>
              <select
                id="filter-print-type"
                name="filter-print-type"
                value={filterPrintType}
                onChange={(e) => setFilterPrintType(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Print Types</option>
                <option value="books">Books Only</option>
                <option value="magazines">Magazines Only</option>
              </select>
            </div>

            {/* eBook Filter */}
            <div>
              <label htmlFor="filter-ebook" className="block text-sm font-medium text-gray-300 mb-1">eBook Availability</label>
              <select
                id="filter-ebook"
                name="filter-ebook"
                value={filterEbook}
                onChange={(e) => setFilterEbook(e.target.value)}
                className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All eBooks Status</option>
                <option value="ebooks">Any eBook</option> {/* General, includes free and paid if available as ePub/PDF */}
                <option value="free-ebooks">Free eBooks</option>
                <option value="paid-ebooks">Paid eBooks</option>
              </select>
            </div>

            {/* Placeholder for Language Filter - can be implemented similarly if desired
            <div>
              <label htmlFor="filter-lang" className="block text-sm font-medium text-gray-300 mb-1">Language (e.g., en, es, fr)</label>
              <input
                type="text"
                id="filter-lang"
                name="filter-lang"
                value={filterLang}
                onChange={(e) => setFilterLang(e.target.value)}
                placeholder="Enter language code"
                className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500"
              />
            </div>
            */}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={() => {
                handleSearch(1, true); // Apply filters and trigger new search, reset to page 1
                setShowFilters(false); // Close menu
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-md transition-colors"
            >
              Apply Filters & Search
            </button>
          </div>
        </div>
      )}
      {/* Overlay to close filter menu on click outside */}
      {showFilters && (
         <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowFilters(false)}
            aria-hidden="true" // For screen readers, as the dialog is modal
        ></div>
      )}


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
