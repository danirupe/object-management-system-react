import React, { useState } from 'react';
import { Link } from 'react-router-dom'

interface NavBarProps {
  scrollToSection: (section: string) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ scrollToSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="fixed top-0 flex-no-wrap flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleMenuOpen}
          >
          <span>
          {
            menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )
          }

          </span>
        </button>
    
        <div className={`!visible flex-grow basis-[100%] items-center mt-4 lg:!flex lg:basis-auto lg:mt-0 ${menuOpen ? 'block' : 'hidden'}`}>
          <Link className="flex mx-6 mb-4 items-center lg:mb-0 lg:mt-0" to="/">
            <span className='font-medium text-indigo-500'>Saal Digital</span>
            <span className='font-thin'>O.M.S</span>
          </Link>
          <div className="flex flex-col mx-6 mb-4 gap-2 lg:flex-row lg:gap-0 lg:mb-0 lg: mx:0">
            <Link className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400" to="/" onClick={() => scrollToSection('typesRef')}>Types</Link>
            <Link className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400" to="/" onClick={() => scrollToSection('propertiesRef')}>Properties</Link>
            <Link className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400" to="/" onClick={() => scrollToSection('objectsRef')}>Objects</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
