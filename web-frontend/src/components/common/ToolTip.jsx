import React, { useState, useRef, useEffect } from "react";

/**
 * Reusable dynamic tooltip component using Tailwind CSS animations.
 * @param {string} text - The tooltip description text.
 * @param {"top"|"bottom"|"left"|"right"} [position="top"] - Tooltip location relative to the child element.
 * @param {number} [delay=200] - Delay in milliseconds before showing the tooltip.
 * @param {React.ReactNode} children - The target element to hover.
 */
const ToolTip = ({ text, position = "top", delay = 200, zIndex = "z-50", children }) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setVisible(false);
  };

  // Clean up timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Position classes mapper
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2 origin-bottom",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2 origin-top",
    left: "right-full top-1/2 -translate-y-1/2 mr-2 origin-right",
    right: "left-full top-1/2 -translate-y-1/2 ml-2 origin-left",
  };

  // Arrow pointer classes mapper
  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-slate-800 border-x-transparent border-b-transparent",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-800 border-x-transparent border-t-transparent",
    left: "left-full top-1/2 -translate-y-1/2 border-l-slate-800 border-y-transparent border-r-transparent",
    right: "right-full top-1/2 -translate-y-1/2 border-r-slate-800 border-y-transparent border-l-transparent",
  };

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}

      <div
        className={`absolute ${zIndex} whitespace-nowrap bg-slate-800 text-white text-[11px] font-medium px-2.5 py-1.5 rounded-lg shadow-md transition-all duration-200 ease-out pointer-events-none ${
          positionClasses[position]
        } ${
          visible
            ? "opacity-100 scale-100 translate-y-0 translate-x-0"
            : "opacity-0 scale-90 pointer-events-none"
        }`}
      >
        {text}
        {/* Arrow pointer */}
        <div className={`absolute border-4 ${arrowClasses[position]}`} />
      </div>
    </div>
  );
};

export default ToolTip;
