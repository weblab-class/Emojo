// dependencies
const express = require('express');
const router = express.Router();

// public endpoints
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'src/views' });
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/profile', function(req, res) {
  res.sendFile('profile.html', { root: 'src/views' });
});

router.get('/index.html', function(req, res) {
  res.sendFile('index.html', { root: 'src/views' });
});

router.get('/emojify.html', function(req, res) {
  res.sendFile('emojify.html', { root: 'src/views' });
});

router.get('/feed.html', function(req, res) {
  res.sendFile('feed.html', {root: "src/views" });
})

router.get('/search.html', function(req, res) {
  res.sendFile('search.html', {root: "src/views" });
})

module.exports = router;
