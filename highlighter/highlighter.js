
function highlighter(str, searchQuery, tag) {

  // validate input
  if(
    !(str 
    && str.trim() !== ''
    && searchQuery
    && searchQuery.trim() !== '')
  ){
    return str;
  } 

  var startTag = '<' + tag + '>';
  var endTag = '</' + tag + '>';
  searchQuery = searchQuery.split(' ');
  var allIndex = [];

  searchQuery.forEach(sub => {
    if (str.includes(sub)) {

      var startIdx = 0;
      var matchIndex = str.indexOf(sub, startIdx);

      while (matchIndex > -1) {
        startIdx = matchIndex + 1;
        Array(sub.length).fill().map((e, i) => allIndex.push(i + matchIndex));
        matchIndex = str.indexOf(sub, startIdx);
      }

    }
  })

  allIndex = uniq(allIndex).sort((a, b) => a - b);

  // group ranges
  var tmp = [];
  var result = [];
  var prev;

  allIndex.forEach(item => {
    if (item - prev !== 1) {
      if (tmp.length) {
        // push the range into results
        var first = tmp.shift();
        var last = tmp.pop();
        result.push([first, last || first]);
      }
      tmp = [];
    }
    prev = item;
    tmp.push(item);
  });

  if (tmp.length > 0) {
    var first = tmp.shift();
    var last = tmp.pop();
    result.push([first, last || first]);
    tmp = [];
  }

  // apply markup
  var lastIdx = 0;
  var formatted = '';

  result.forEach(arr => {
    var first = arr[0];
    var last = arr[1]

    if (lastIdx === first) {
      var sub = str.substring(first, last + 1);
      formatted += startTag + sub + endTag;
      lastIdx = last + 1;
    } else {
      var sub = str.substring(lastIdx, first);
      formatted += sub;

      sub = str.substring(first, last + 1);
      formatted += startTag + sub + endTag;
      lastIdx = last + 1;
    }
  });

  sub = str.substring(lastIdx, str.length);
  formatted += sub;

  // console.log(allIndex);
  // console.log('');
  // console.log(result);
  // console.log('');
  // console.log(formatted);
  return formatted;
}

function uniq(a) {
  var seen = {};
  return a.filter(function (item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}


// highlighter('john doveletterj tt', 'let letter ele t hn do j tt');
// console.log(highlighter('johnny', 'oh', 'sp'));