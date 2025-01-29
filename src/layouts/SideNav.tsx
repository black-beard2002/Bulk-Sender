import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import ThemeToggle from "../components/ThemeToggle";
import logo from "../../public/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBarsStaggered,
  faChartColumn,
  faChevronDown,
  faEnvelopeOpen,
  faLayerGroup,
  faPaperPlane,
  faPeoplePulling,
  faPeopleRoof,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
function SideNav({
  isHovered,
  setIsHovered,
  isMobile,
  setIsSidebarOpen,
  isSidebarOpen,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { signOut, user } = useAuth();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  // Ref for the sidebar container
  const sidebarRef = useRef(null);

  // Handle clicks outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobile &&
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen, isMobile, setIsSidebarOpen]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-[#dcdcdd] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                onClick={toggleSidebar}
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <FontAwesomeIcon icon={faBarsStaggered} className="w-6 h-6 text-[#6daffe] dark:text-gray-500"/>
              </button>
              <a href="https://tele-bulksender.vercel.app" className="flex ms-2 md:me-24">
                <img
                  src={logo}
                  className="h-8 me-3"
                  alt="Tele-sender Logo"
                />
                <span className="self-center text-xl font-semibold font-sans sm:text-2xl whitespace-nowrap text-[#4c5c68] dark:text-white">
                  Tele Sender
                </span>
              </a>
            </div>
            <div className="flex items-center flex-row gap-1">
              <div>
                <ThemeToggle />
              </div>
              <div className="flex items-center ms-4">
                <div>
                  <button
                    type="button"
                    className="flex text-sm dark:bg-gray-800 bg-[#1985a1] p-2 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={isProfileDropdownOpen}
                    onClick={() =>
                      setIsProfileDropdownOpen(!isProfileDropdownOpen)
                    }
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
                  className={`z-50 ${
                    isProfileDropdownOpen ? "" : "hidden"
                  } absolute right-0 top-full mt-2 my-4 text-base list-none bg-[#dcdcdd] text-[#2a2d2f] divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm  dark:text-white"
                      role="none"
                    >
                      Neil Sims
                    </p>
                    <p
                      className="text-sm font-medium  truncate dark:text-gray-300"
                      role="none"
                    >
                      {user?.email}
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="/"
                        className="block px-4 py-2 text-[#4c5c68] text-sm  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 hover:text-[#1985a1] dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-[#4c5c68] text-sm  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 hover:text-[#1985a1] dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={signOut}
                        className="block cursor-pointer px-4 py-2 text-[#4c5c68] text-sm hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 hover:text-[#1985a1] dark:hover:text-white"
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

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 h-screen pt-28 transition-all duration-300 bg-[#dcdcdd] border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 
            ${
              isMobile
                ? `${
                    isSidebarOpen ? "translate-x-0 w-48" : "-translate-x-full"
                  }`
                : `${isHovered ? "w-60" : "w-[3.25rem]"} translate-x-0`
            }
          `}
        aria-label="Sidebar"
        ref={sidebarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="h-full px-1.5 pb-4 overflow-x-hidden overflow-y-auto bg-[#dcdcdd]  font-sans dark:g-[bg-gray-800,text-slate-50]">
          <ul className="space-y-2 font-bold ">
            <li onClick={()=>setIsSidebarOpen(false)}>
              <Link
                to="/"
                className="flex items-center p-2 rounded-lg  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 group"
              >
                <FontAwesomeIcon icon={faChartColumn} className="w-6 text-[#1985a1] h-6 dark:text-gray-200" />
                <span className="ms-4 text-[#46494c] dark:text-gray-200">Dashboard</span>
              </Link>
            </li>
            <li onClick={()=>setIsSidebarOpen(false)}>
              <Link
                to="/templates"
                className="flex items-center p-2 rounded-lg  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 group"
              >
                <FontAwesomeIcon icon={faLayerGroup} className="w-6 h-6 dark:text-gray-200 text-[#1985a1]" />
                <span className="flex-1 ms-4 whitespace-nowrap dark:text-gray-200 text-[#46494c]">Templates</span>
                <span className="inline-flex items-center justify-center w-3 h-3 px-5 py-3 ms-4 text-sm font-medium text-slate-100 bg-[#1985a1] rounded-full dark:bg-blue-900 dark:text-blue-300">
                  Pro
                </span>
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex items-center w-full p-2 text-[#46494c] text-base border-2 bg-transparent dark:bg-transparent transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                aria-controls="dropdown-example"
                data-collapse-toggle="dropdown-example"
              >
                <FontAwesomeIcon icon={faUserGroup} className="w-6 h-6 dark:text-gray-200 text-[#1985a1]" />
                <span className="flex-1 ms-4 dark:text-gray-200 text-left text-[#46494c] rtl:text-right whitespace-nowrap">
                  Contacts
                </span>
                <FontAwesomeIcon icon={faChevronDown} className="w-3 dark:text-gray-200 h-3 text-[#1985a1]"/>
              </button>
              <ul
                id="dropdown-example"
                className={`${isDropdownOpen ? "" : "hidden"} py-2 space-y-2`}
              >
                <li onClick={()=>setIsSidebarOpen(false)}>
                  <Link
                    to="/contactsgroups"
                    className="flex items-center rounded-lg px-12 w-full p-2  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 group"
                  >
                    <FontAwesomeIcon icon={faPeopleRoof} className="w-6 dark:text-gray-200 text-[#1985a1] h-6" />
                    <span className="flex-1 dark:text-gray-200 ms-4 text-[#46494c] whitespace-nowrap">
                      Groups
                    </span>
                  </Link>
                </li>
                <li onClick={()=>setIsSidebarOpen(false)}>
                  <Link
                    to="/newgroup"
                    className="flex items-center dark:text-gray-200 rounded-lg px-12 w-full p-2  hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-200 group"
                  >
                    <FontAwesomeIcon
                      icon={faPeoplePulling}
                      className="w-6 text-[#1985a1] dark:text-gray-200 h-6"
                    />
                    <span className="flex-1 ms-4 dark:text-gray-200 text-[#46494c] whitespace-nowrap">
                      Create group
                    </span>
                  </Link>
                </li>
                <li onClick={()=>setIsSidebarOpen(false)}>
                  <Link
                    to="/sendmessage"
                    className="flex items-center rounded-lg px-12 w-full p-2 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 group"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} className="w-6 dark:text-gray-200 text-[#1985a1] h-6" />
                    <span className="flex-1 ms-4 dark:text-gray-200 text-[#46494c] whitespace-nowrap">
                      Send Message
                    </span>
                  </Link>
                </li>
              </ul>
            </li>
            <li onClick={()=>setIsSidebarOpen(false)}>
              <a
                href="#"
                className="flex items-center rounded-lg p-2 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 group"
              >
                <FontAwesomeIcon icon={faEnvelopeOpen} className="w-6 dark:text-gray-200 text-[#1985a1] h-6" />
                <span className="flex-1 ms-4 text-[#46494c] dark:text-gray-200 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-4 text-sm font-medium text-slate-100 bg-[#1985a1] rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
            <li onClick={()=>setIsSidebarOpen(false)}>
              <a
                href="#"
                className="flex items-center rounded-lg p-2  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 group"
              >
                <FontAwesomeIcon icon={faUserGroup} className="w-6 dark:text-gray-200 text-[#1985a1] h-6" />
                <span className="flex-1 ms-4 text-[#46494c] dark:text-gray-200 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li onClick={()=>setIsSidebarOpen(false)}>
              <a
                href="#"
                className="flex items-center rounded-lg p-2  hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-200 group"
              >
                <FontAwesomeIcon icon={faBagShopping} className="w-6 dark:text-gray-200 text-[#1985a1] h-6" />
                <span className="flex-1 ms-4 dark:text-gray-200 text-[#46494c] whitespace-nowrap">Products</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default SideNav;
