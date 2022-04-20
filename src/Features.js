export const createFeatureArray = features => {
  var featureArray = [];
  var key = 0;
  for (var index in features) {
    featureArray.push({
      name: features[index][0],
      latitude: features[index][2],
      longitude: features[index][3],
      type: features[index][6],
      diameter: features[index][1],
      quadCode: features[index][8],
      quadName: features[index][7],
      key: key
    });
    key = key + 1;
  }
  featureArray.sort((a, b) => {
    if (a.latitude > b.latitude) {
      return -1;
    } else {
      return 1;
    }
  });
  return featureArray;
};
