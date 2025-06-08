/**
 * Handles smooth scrolling to a specific category section on the page.
 * 
 * This function scrolls the page to the element with the specified `targetId`. 
 * It calculates the position of the target element and adjusts for a fixed header offset to ensure the element is fully visible.
 * The scrolling is smooth and the page scrolls to the adjusted position.
 * 
 * @param {string} targetId - The ID of the target element to scroll to.
 * 
 * @example
 * // Example usage:
 * // handleCategoryClick("category-section-id");
 */
export const handleCategoryClick = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = 150;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
