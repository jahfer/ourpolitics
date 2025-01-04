// https://stackoverflow.com/a/2450976
export function shuffle<T>(array: Array<T>): Array<T> {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export function partition<T>(arr: Array<T>, predicate: (item: T) => boolean): [Array<T>, Array<T>] {
  const init: [Array<T>, Array<T>] = [[], []];
  return arr.reduce((acc, item) => {
      acc[predicate(item) ? 0 : 1].push(item);
      return acc;
  }, init);
};

export function handleEnterAsClick(e: React.KeyboardEvent<HTMLElement>) {
  if(e.key === 'Enter') {
    e.currentTarget.click();
    e.preventDefault();
    e.stopPropagation();
  }
}