import * as time  from "d3-time";
import range from 'lodash/range.js';
import last from 'lodash/last.js';
var dataA;
var dataB;
function getData(group) {
  var result = [];

  if (group === "Systolic") {
    result = dataA.slice(1);
    result.push({
      x: time.timeMinute.offset(last(dataA).x, 30),
      y: 110 + Math.round(Math.random() * 90),
    });
    dataA = [...result];
  } else {
    result = dataB.slice(1);
    result.push({
      x: time.timeMinute.offset(last(dataB).x, 30),
      y: 70 + Math.round(Math.random() * 20),
    });
    dataB = [...result];
  }

  return result;
}

function getGroupData() {
  var result = [];
  const date = new Date();

  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  dataA = range(100).map((i) => ({
    x: time.timeMinute.offset(date, i * 30),
    y: 110 + Math.round(Math.random() * 30),
  }));

  dataB = range(100).map((i) => ({
    x: time.timeMinute.offset(date, i * 30),
    y: 70 + Math.round(Math.random() * 20),
  }));

  ["Systolic", "Diastolic"].forEach(function (i) {
    result.push({
      id: i,
      data: getData(i),
    });
  });
  return result;
}

export const generateNextEvent = function () {
  return getGroupData();
};
