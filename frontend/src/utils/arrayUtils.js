// Array Manipulation:
// Folder: utils/
// File: arrayUtils.js
// Functions: filterArray(), sortArray(), mapArray(), reduceArray()

import _ from "lodash";

// Filter an array based on a given predicate
export const filterArray = (array, predicate) => _.filter(array, predicate);

// Sort an array based on a given property
export const sortArray = (array, property) => _.sortBy(array, property);

// Map over an array and apply a transformation function
export const mapArray = (array, transformation) => _.map(array, transformation);

// Reduce an array to a single value using an accumulator and an iteratee function
export const reduceArray = (array, iteratee, accumulator) =>
  _.reduce(array, iteratee, accumulator);

// hasCommonElements or not
export const hasCommonElements = (array1, array2) => {
  return array1.some((item) => array2.includes(item));
};
