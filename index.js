var querystring = require('querystring');
var _ = require('lodash');
var co = require('co');
var request = require('co-request');
var xmlParser = require('xml2js').parseString;
var config = require(__dirname + "/config/config.json");

//defaults
var queryDefaults = {
  v: 2,
  sort: 'avg_rating',
  per_page: 25
};
var queryUrl = "http://www.goodreads.com/review/list/" + config.user + ".xml"

parseXML = function (blob) {
  return function (fn) {
    xmlParser(blob, fn);
  }
}

co(function *(){
  var queryParams = _.extend({}, config, queryDefaults);
  queryParams.page = 1;
  body = yield parseXML((yield request({url: queryUrl, qs: queryParams})).body)
  console.log(body.GoodreadsResponse.reviews);
})();