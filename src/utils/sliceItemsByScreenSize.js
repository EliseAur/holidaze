/**
 * Slices a list of items based on the screen size and whether all items should be shown.
 * Determines the number of items to display depending on the screen size breakpoints.
 *
 * @param {Array} items - The list of items to slice.
 * @param {boolean} showAll - A flag indicating whether all items should be shown.
 * @param {boolean} isXs - Indicates if the screen size is extra small.
 * @param {boolean} isSm - Indicates if the screen size is small.
 * @param {boolean} isMd - Indicates if the screen size is medium.
 * @param {boolean} isLg - Indicates if the screen size is large.
 * @returns {Array} A sliced array of items based on the screen size or all items if `showAll` is true.
 *
 * @example
 * const items = [1, 2, 3, 4, 5];
 * const visibleItems = sliceItemsByScreenSize(items, false, true, false, false, false);
 * console.log(visibleItems); // [1, 2]
 */
export function sliceItemsByScreenSize(items, showAll, isXs, isSm, isMd, isLg) {
  if (showAll) {
    return items;
  } else if (isXs || isSm) {
    return items.slice(0, 2);
  } else if (isMd) {
    return items.slice(0, 3);
  } else if (isLg) {
    return items.slice(0, 4);
  } else {
    return items.slice(0, 4); // Default to 4
  }
}
