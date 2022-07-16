export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export const shuffledArr = (array: any[]) => {
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};

export function handleCapitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getNextIndex = (arr: string[], element: string) => {
  let nextIndex = 0;
  const length = arr.length;
  const currentIndex = arr.indexOf(element);
  if (currentIndex < length - 1) {
    nextIndex = currentIndex + 1;
  }

  return nextIndex;
};

export const getPreviousIndex = (arr: string[], element: string) => {
  const length = arr.length;
  let previousIndex = length - 1;
  const currentIndex = arr.indexOf(element);
  if (currentIndex > 0) {
    previousIndex = currentIndex - 1;
  }

  return previousIndex;
};
