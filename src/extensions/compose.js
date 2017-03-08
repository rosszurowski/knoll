export default function compose (...funcs) {
  return (...args) => {
    const [fn, ...fns] = funcs.reverse()
    return fns.reduce((acc, f) => f(acc), fn(...args))
  }
}
