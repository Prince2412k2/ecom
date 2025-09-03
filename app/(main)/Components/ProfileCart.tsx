
import Image from 'next/image';
import Link from 'next/link';
import { IoCartOutline } from 'react-icons/io5';

export default function ProfileCart() {
  return (
    <div className="flex items-center">
      <Link
        href="/cart"
        className="text-2xl flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <IoCartOutline />
      </Link>
      <div className="relative ml-4 flex-shrink-0">
        <div>
          <button
            type="button"
            className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            id="user-menu-button"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <span className="sr-only">Open user menu</span>
            <Image
              className="h-8 w-8 rounded-full"
              height={500}
              width={500}
              src={"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>

  )
}
