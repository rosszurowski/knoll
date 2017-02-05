
export default function maybeCall (fn, ...args) {
  return typeof fn === 'function' ? fn(...args) : fn
}
