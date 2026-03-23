import * as React from 'react';

export function useIsMobile(breakpoint = 768) {
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const handleWindowSizeChange = () => setWidth(window.innerWidth);
    handleWindowSizeChange(); // Set initial width
    window.addEventListener('resize', handleWindowSizeChange);
    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, []);

  return width <= breakpoint;
}
