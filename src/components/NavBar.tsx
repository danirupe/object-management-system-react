import React from 'react';
import { Link } from 'react-router-dom'

interface NavBarProps {
  scrollToTypes: () => void;
  scrollToProperties: () => void;
  scrollToObjects: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ scrollToTypes, scrollToProperties, scrollToObjects }) => {
  return (
    <nav className="flex-no-wrap relative flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent1"
          aria-controls="navbarSupportedContent1"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span>
            X
          </span>
        </button>
    
        <div className="!visible hidden flex-grow basis-[100%] items-center lg:!flex lg:basis-auto">
          <Link className="flex gap-1 mb-4 ml-2 mr-5 mt-3 items-center lg:mb-0 lg:mt-0" to="/">
            <span className='font-medium text-indigo-500'>Saal Digital</span>
            <span className='font-thin'>O.M.S</span>
          </Link>
          <div className="flex">
            <Link className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400" to="/" onClick={scrollToTypes}>Types</Link>
            <Link className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400" to="/" onClick={scrollToProperties}>Properties</Link>
            <Link className="text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-zinc-400" to="/" onClick={scrollToObjects}>Objects</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
