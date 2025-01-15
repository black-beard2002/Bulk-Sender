import React from 'react'

const Navbar = () => {
  return (
    <header className=" w-full h-15 bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
    <nav className="w-full h-full">
      <div className="px-2 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-end">
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div>
                <button 
                  type="button" 
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" 
                  aria-expanded="false" 
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  <img 
                    className="w-8 h-8 rounded-full" 
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                    alt="user photo"
                  />
                </button>
              </div>
              <div 
                className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" 
                id="dropdown-user"
              >
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900 dark:text-white" role="none">
                    Neil Sims
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" 
                      role="menuitem"
                    >
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" 
                      role="menuitem"
                    >
                      Settings
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" 
                      role="menuitem"
                    >
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" 
                      role="menuitem"
                    >
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </header>
  )
}

export default Navbar