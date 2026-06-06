import React from 'react';

const Link = ({ to, children, className, style, onClick, target }) => {
  const handleClick = (e) => {
    if (target === '_blank') return;
    
    // Allow modifier keys to open in new tab (Ctrl/Cmd click, shift click etc)
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    window.history.pushState({}, '', to);
    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
    if (onClick) onClick(e);
  };

  return (
    <a href={to} className={className} style={style} onClick={handleClick} target={target}>
      {children}
    </a>
  );
};

export default Link;
