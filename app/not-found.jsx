import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
      <h1 className="text-7xl sm:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 mb-4">
        404
      </h1>
      <h2 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8">
        Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" passHref>
        <Button className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
