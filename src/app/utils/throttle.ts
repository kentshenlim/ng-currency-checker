export default function throttle(fn: Function, t: number): Function {
  let timeID: null | ReturnType<typeof setTimeout> = null;
  let lastArgs: any[] | null = null;
  return (...args: any[]) => {
    if (timeID === null) {
      timeID = setTimeout(() => {
        cooldownEnded();
      }, t);
      fn(...args);
    } else lastArgs = args;
  };

  function cooldownEnded() {
    if (lastArgs === null) timeID = null;
    else {
      const lastArgsCopied = [...lastArgs];
      lastArgs = null;
      fn(...lastArgsCopied);
      setTimeout(() => {
        cooldownEnded();
      }, t);
    }
  }
}
