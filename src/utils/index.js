export const createLocationIdStr = (citiesArr) => {
  return citiesArr.map((city) => {
    return city.id
  }).join(',')
}
