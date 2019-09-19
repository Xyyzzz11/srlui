
// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import event controller
var eventController = require('./eventController');
// Contact routes
router.route('/events')
    .post(eventController.update)
router.route('/events/:userid/course/:courseId')
    .get(eventController.viewUserProgress)
    .delete(eventController.delete)
router.route('/events/:userid/course/:courseId/week/:weekId')
    .get(eventController.view)
// Export API routes
module.exports = router;