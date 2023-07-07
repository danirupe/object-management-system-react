import React, { useEffect, useState } from 'react';

interface ScrollTopButtonProps {
  scrollToSection: (section: string) => void;
}

export const ScrollTopButton: React.FC<ScrollTopButtonProps> = ({scrollToSection}) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setShowScrollButton(window.scrollY > 400);
    })
  }, [])

  return (
    <div data-testid="scrollTopButton" className={`fixed bottom-4 right-4 ${showScrollButton ? 'block opacity-100' : 'hidden opacity-0'}`}>
      <button className="bg-indigo-500 rounded-full w-fit px-6 py-2 text-white" onClick={() => scrollToSection('topRef')}>
        Scroll to top
      </button>
    </div>
  )
}