function Shuffle<T>(arr: T[]): T[] {
  if (!arr) {
    // console.error("Input array is undefined");
    return [];
  }

  const shuffleArray: T[] = [];
  const useIndexses: number[] = [];

  let i = 0;
  while (i < arr.length) {
    const randomArray = Math.floor(Math.random() * arr.length);
    if (!useIndexses.includes(randomArray)) {
      shuffleArray.push(arr[randomArray]);
      useIndexses.push(randomArray);
      i++;
    }
  }
  return shuffleArray;
}

export default Shuffle;
