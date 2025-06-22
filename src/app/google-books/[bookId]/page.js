"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // Corrected import for App Router

export default function BookDetailsPage() {
  const params = useParams(); // Hook to get dynamic route parameters
  const bookId = params.bookId; // Extract bookId from params

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!bookId) {
      setError("Book ID is missing.");
      setLoading(false);
      return;
    }

    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // In a real app, hide API keys in environment variables
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY;
        if (!apiKey) {
          throw new Error("API key for Google Books is missing.");
        }
        const url = `https://www.googleapis.com/books/v1/volumes/${bookId}?key=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error("Fetch book details error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 min-h-screen bg-background text-foreground flex justify-center items-center">
        <p className="text-xl">Loading book details...</p>
        <svg className="animate-spin ml-3 h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 min-h-screen bg-background text-foreground text-center">
        <p className="text-red-400 text-xl mb-4">Error: {error}</p>
        <Link href="/google-books" className="text-blue-400 hover:text-blue-300 transition-colors">
          &larr; Back to Search
        </Link>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container mx-auto p-4 min-h-screen bg-background text-foreground text-center">
        <p className="text-xl">Book not found.</p>
        <Link href="/google-books" className="text-blue-400 hover:text-blue-300 transition-colors">
          &larr; Back to Search
        </Link>
      </div>
    );
  }

  const { volumeInfo } = book;

  return (
    <div className="container mx-auto p-4 min-h-screen bg-background text-foreground">
      <header className="mb-8">
        <Link href="/google-books" className="text-blue-400 hover:text-blue-300 transition-colors text-lg">
          &larr; Back to Search Results
        </Link>
      </header>

      <article className="bg-gray-800 shadow-xl rounded-lg p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {volumeInfo.imageLinks?.large || volumeInfo.imageLinks?.medium || volumeInfo.imageLinks?.thumbnail ? (
            <img
              src={volumeInfo.imageLinks?.large || volumeInfo.imageLinks?.medium || volumeInfo.imageLinks?.thumbnail}
              alt={`Cover of ${volumeInfo.title}`}
              className="w-full md:w-1/3 lg:w-1/4 h-auto object-contain rounded-md shadow-lg self-center md:self-start"
            />
          ) : (
            <div className="w-full md:w-1/3 lg:w-1/4 h-auto bg-gray-700 rounded-md shadow-lg flex items-center justify-center text-gray-400 text-center p-4">
              No Image Available
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-blue-300">{volumeInfo.title}</h1>
            {volumeInfo.subtitle && (
              <h2 className="text-xl md:text-2xl text-gray-400 mb-3">{volumeInfo.subtitle}</h2>
            )}
            {volumeInfo.authors && (
              <p className="text-lg text-gray-300 mb-1">By: {volumeInfo.authors.join(', ')}</p>
            )}
            {volumeInfo.publisher && (
              <p className="text-md text-gray-400 mb-1">Published by: {volumeInfo.publisher}</p>
            )}
            {volumeInfo.publishedDate && (
              <p className="text-md text-gray-400 mb-3">Published on: {volumeInfo.publishedDate}</p>
            )}

            {volumeInfo.categories && (
                <div className="mb-4">
                    <h3 className="text-md font-semibold text-gray-200 mb-1">Categories:</h3>
                    <div className="flex flex-wrap gap-2">
                        {volumeInfo.categories.map(category => (
                            <span key={category} className="bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded-full">{category}</span>
                        ))}
                    </div>
                </div>
            )}

            {volumeInfo.description && (
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2 border-b border-gray-700 pb-1">Description</h3>
                <div
                  className="prose prose-invert max-w-none text-gray-300"
                  dangerouslySetInnerHTML={{ __html: volumeInfo.description }}
                />
              </div>
            )}

            {volumeInfo.infoLink && (
              <a
                href={volumeInfo.infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
              >
                More Info on Google Books
              </a>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
