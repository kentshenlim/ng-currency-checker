export default function debounce(fn: Function, t: number): Function {
  let timeID: null | ReturnType<typeof setTimeout> = null;
  return (...args: any[]) => {
    clearTimeout(Number(timeID)); // Stupid TypeScript
    timeID = setTimeout(() => {
      fn(...args);
    }, t);
  };
}
