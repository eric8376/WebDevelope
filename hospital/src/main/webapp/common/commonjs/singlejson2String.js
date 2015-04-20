function singlejson2String(json) {
    json = json.substring(2, json.length - 2)


    json = json.replace(new RegExp('\":\"', "g"), ",");
    json = json.replace(new RegExp('\",\"', "g"), ",");
    return json
}