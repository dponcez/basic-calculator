// Returns a function that as long as continues it's execution to be invoked,
// this not will triggered immediately if user fire a handling event.
// The function will be called after being stops it's execution for 'n' milliseconds

export function debounce(func, wait, immediate) {
  let timer;
  const later = () => {
    if (!immediate){
      func.apply(this, arguments)
    };
  };

  return (...args) => {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(later, wait);

    const callNow = immediate && !timer;
    if (callNow) {
      func.apply(context, args)
    };
  };
}
