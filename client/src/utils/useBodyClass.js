import { useEffect } from 'react';

const addBodyClass = className => document.body.classList.add(className);
const removeBodyClass = className => document.body.classList.remove(className);

// Add a space separated list of classes to the body
export default function useBodyClass(className) {
  const classArray = className.split(" ");
  useEffect(() => {
    // Set up
    classArray.map(addBodyClass);
    // Clean up
    return () => { classArray.map(removeBodyClass) };
  });
}