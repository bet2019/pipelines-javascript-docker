import toQueryString from "./toQueryString";

function mergeProperties(propertyKey, firstObject, secondObject) {
  var propertyValue = firstObject[propertyKey];

  if (typeof(propertyValue) === "object") {
      return mergeNestedObjects(firstObject[propertyKey], secondObject[propertyKey]);
  } else if (secondObject[propertyKey] === undefined) {
      return firstObject[propertyKey];
  }

  return secondObject[propertyKey];
}

function mergeNestedObjects(firstObject, secondObject) {
  var finalObject = {};

  // Merge first object and its properties.
  for (var propertyKey in firstObject) {
      finalObject[propertyKey] = mergeProperties(propertyKey, {...firstObject}, {...secondObject});
  }

  // Merge second object and its properties.
  for (var propertyKey in secondObject) {
      finalObject[propertyKey] = mergeProperties(propertyKey, {...secondObject}, {...firstObject});
  }

  return finalObject;
} 


const objToQueryString = (obj, urlEncode) => {
  return toQueryString(obj, urlEncode)
}




const parseSearchContentToObject = (searchContent = null) => {
  let str = searchContent || window.location.search
  let obj = {}
  let params = str
      .trim()
      .replace(/^[\?,\s,\&]*/g,'')
      

  if (!params || params.length == 0 ) {
    return
  }

  params
    .split('&')
    .map( i => {
        i = decodeURIComponent(i)
        let keyValue = i.split('=')
        let key = keyValue[0].replace(/\[|\]\[|\]/g,'.')
        if ('.' === key.substr(-1)) {
          key = key.substr(0,key.length-1)
        }
        let nestedKey = key.split('.')
        key = nestedKey.join('" :{"')        
        let value = /* Number(keyValue[1]) !== NaN ? Number(keyValue[1]) :  */keyValue[1]
        let v = `{"${key}":"${value}"`+ (nestedKey.length > 1 ? "}".repeat(nestedKey.length): '}')
        let valueObj = JSON.parse(v)
        
        obj = mergeNestedObjects({...obj}, {...valueObj})
      })
  
  let parsedObject = JSON.parse(JSON.stringify(obj), (key, value) => {
    if (value && value.length > 0 ) {
      if (!isNaN(value)) {
        return Number(value)
      }else if (value.toLowerCase() === 'true') {
        return true
      }else if (value.toLowerCase() === 'false') {
        return false
      }
    }
    return value
  })

  return parsedObject
}

const replaceStateWithFilterParams = (filterParams) => {
  let urlPath = window.location.origin+window.location.pathname+'?'+objToQueryString(filterParams)
  window.history.replaceState({}, '', urlPath);
}


export default {
  objToQueryString,
  parseSearchContentToObject,
  replaceStateWithFilterParams
}