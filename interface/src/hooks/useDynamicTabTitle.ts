import { useEffect } from "react";

/**
 * Custom hook to dynamically change the document title based on the page visibility.
 *
 * This hook changes the document's title when the page becomes active or inactive.
 * The title is set to `activeTitle` when the page is visible and to `inactiveTitle` when the page is not visible (e.g., when the user switches tabs).
 *
 * @param {string} activeTitle - The title to set when the page is active.
 * @param {string} inactiveTitle - The title to set when the page is inactive.
 *
 * @example
 * // Example usage:
 * // useDynamicTabTitle("My Active Page", "Come back to the page!");
 */
export const useDynamicTabTitle = (
  activeTitle: string,
  inactiveTitle: string
) => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = inactiveTitle;
      } else {
        document.title = activeTitle;
      }
    };

    document.title = activeTitle;

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeTitle, inactiveTitle]);
};
