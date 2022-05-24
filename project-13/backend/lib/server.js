"use strict";

var _express = _interopRequireDefault(require("express"));

require("core-js/stable");

require("regenerator-runtime/runtime");

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _mongodb = require("mongodb");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var app = (0, _express["default"])();
app.get("/hello", function (req, res) {
  res.send("hello");
});
app.get("/api/articles/:name", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var name, client, db, _articlesInfo;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            name = req.params.name;
            _context.next = 4;
            return _mongodb.MongoClient.connect("mongodb://localhost:27017");

          case 4:
            client = _context.sent;
            _context.next = 7;
            return client.db("my-blog");

          case 7:
            db = _context.sent;
            _context.next = 10;
            return db.collection("articles").findOne({
              name: name
            });

          case 10:
            _articlesInfo = _context.sent;
            res.status(200).json(_articlesInfo);
            client.close();
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.status(500).json({
              message: "Something went wrong"
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 15]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post("/api/articles/:name/upvote", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var name, client, db, articlesInfo, updateArticleInfo;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            name = req.params.name;
            console.log(name);
            _context2.next = 4;
            return _mongodb.MongoClient.connect("mongodb://localhost:27017");

          case 4:
            client = _context2.sent;
            _context2.next = 7;
            return client.db("my-blog");

          case 7:
            db = _context2.sent;
            _context2.next = 10;
            return db.collection("articles").findOne({
              name: name
            });

          case 10:
            articlesInfo = _context2.sent;
            _context2.next = 13;
            return db.collection("articles").updateOne({
              name: name
            }, {
              $set: {
                upvotes: articlesInfo.upvotes + 1
              }
            });

          case 13:
            _context2.next = 15;
            return db.collection("articles").findOne({
              name: name
            });

          case 15:
            updateArticleInfo = _context2.sent;
            console.log(updateArticleInfo);
            res.status(200).json(updateArticleInfo);

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.post("/api/articles/:name/add-comment", _bodyParser["default"].json(), /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var body, name, client, db, articlesInfo, updatedArticleInfo;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            body = req.body;
            name = req.params.name;
            _context3.next = 4;
            return _mongodb.MongoClient.connect("mongodb://localhost:27017");

          case 4:
            client = _context3.sent;
            _context3.next = 7;
            return client.db("my-blog");

          case 7:
            db = _context3.sent;
            _context3.next = 10;
            return db.collection("articles").findOne({
              name: name
            });

          case 10:
            articlesInfo = _context3.sent;
            db.collection("articles").updateOne({
              name: name
            }, {
              $push: {
                comments: body
              }
            });
            _context3.next = 14;
            return db.collection("articles").findOne({
              name: name
            });

          case 14:
            updatedArticleInfo = _context3.sent;
            res.status(200).json(updatedArticleInfo);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
app.get("/api/articles", function (req, res) {
  res.status(200).send(JSON.stringify(articlesInfo));
});
app.listen(8000, function () {
  console.log("server is online on port 8000.");
});