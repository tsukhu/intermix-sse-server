var faker = require('faker');

function getData(times) {
  var result = [];
  for(var i=0;i<times;i++) {
    result.push({
      x: faker.random.number({min:5, max:120}),
      y: faker.random.number({min:5, max:120}),
    });
  }
  return result;
}

function getGroupData() {
  var result = [];
  ["group A","group B","group C","group D"].forEach(function(i) {
    result.push({
      id: i,
      data: getData(50)
    });
  });
  return result;
}

module.exports.generateNextEvent = function () { 
    return getGroupData();
};
