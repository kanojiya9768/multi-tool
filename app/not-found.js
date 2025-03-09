import Link from "next/link";

export default function NotFound() {
  return (
    <div class="bg-gray-100 flex items-center justify-center h-screen font-roboto mt-20">
      <div class="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto animate-fadeIn">
        <div class="relative">
          <svg
            class="mx-auto mb-8 animate-float"
            width="200"
            height="200"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM13 7H11V13H13V7ZM13 15H11V17H13V15Z"
              fill="#4A5568"
            />
          </svg>
          <h1 class="text-9xl font-bold text-gray-800 mb-4">404</h1>
          <p class="text-2xl text-gray-600 mb-8">
            {`Oops! The page you're looking for doesn't exist.`}
          </p>
          <Link
            href="/"
            class="px-8 py-2 bg-blue-600 text-white rounded-full primary-gradient hover:bg-blue-700 transition duration-300 inline-flex items-center"
          >
            <i class="fas fa-home mr-2"></i>
            Go Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}
