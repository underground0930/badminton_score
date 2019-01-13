export const score = () => {
  return [...Array(70)].map((item, index) => {
    return { num: null, input: false, index: index }
  })
}
