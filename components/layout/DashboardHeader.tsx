'use client';

import { Bell, Search, User } from 'lucide-react';

export function DashboardHeader() {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Search */}
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400" />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search campaigns..."
            type="search"
            name="search"
          />
        </form>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">View notifications</span>
          <Bell className="h-6 w-6" />
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            type="button"
            className="-m-1.5 flex items-center p-1.5"
          >
            <span className="sr-only">Open user menu</span>
            <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
