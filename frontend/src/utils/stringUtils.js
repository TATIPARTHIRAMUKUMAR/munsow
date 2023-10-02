// Manipulate Strings:

// capitalize the first letter of a string
export const capitalizeString = (str) => {
  try {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } catch (error) {
    return "";
  }
};

// Capitalize the first letter of each word in a string
export const capitalizeWords = (str) => {
  return str?.toLowerCase()?.replace(/\b\w/g, (match) => match?.toUpperCase());
};

// Truncate a string to a specified length and append ellipsis if necessary
export const truncateString = (str, maxLength) => {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
};

// Remove whitespace from both ends of a string
export const removeWhitespace = (str) => str.trim();

// Convert a string to camelCase
export const convertToCamelCase = (str) => {
  const words = str?.split(" ");
  const camelCaseWords = words?.map((word, index) => {
    if (index === 0) {
      return word?.toLowerCase();
    }
    return word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase();
  });
  return camelCaseWords?.join("");
};

// Check if a string contains a specific substring
export const containsSubstring = (str, substring) => str.includes(substring);

// parseGPSString
export const parseGPSString = (gpsString) => {
  const [latitude, longitude] = gpsString.split(",").map(parseFloat);
  return { latitude, longitude };
};
