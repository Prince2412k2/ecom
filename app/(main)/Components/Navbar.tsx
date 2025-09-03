import Link from 'next/link';
import SearchBar from './SearchBar';
import ProfileCart from './ProfileCart';
import { IoLogoDesignernews } from 'react-icons/io5';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed z-1 w-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-bold text-gray-900">
              <IoLogoDesignernews />
            </Link>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-center">
            <SearchBar />
          </div>
          <div className="flex items-center">
            <ProfileCart />
          </div>
        </div>
        <div className="md:hidden flex items-center justify-center pb-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
};
