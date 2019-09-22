// eventController.js
// Import event model
Event = require('./eventModel');

// Handle update event info
exports.update = function (req, res) {
    var update; 

    /* if (((req.body.type == "postsViewed") || (req.body.type == "postsCreated")) && req.body.week != 1)
    {
        var postsQuery = {'userId': req.body.userId, 'courseId': req.body.courseId, 'week': req.body.week - 1, 'group': req.body.group}
        Event.findOne(postsQuery).exec(, function(err, event) {
            if (err)
                res.send(err);
            res.json({
                message: 'Event details updated',
                data: event
            });

        });
    } */

    var query = {'userId': req.body.userId, 'courseId': req.body.courseId, 'week': req.body.week, 'group': req.body.group}
    
    if (req.body.type == "videosWatched")
    {
        var amount = req.body.amount ? req.body.amount : 1; 
        update = { $inc: {videosWatched: amount}};
    }
    else if (req.body.type == "questionsAnswered")
    {
        var amount = req.body.amount ? req.body.amount : 1; 
        update = { $inc: {questionsAnswered: amount}};
    }
    else if (req.body.type == "postsViewed")
    {
        update = { postsViewed: req.body.amount};
    }
    else if (req.body.type == "postsCreated")
    {
        update = { postsCreated: req.body.amount};
    }

    Event.findOneAndUpdate(query, update, {upsert:true}, function (err, event) {
        if (err)
            res.send(err);
        res.json({
            message: 'Event details updated',
            data: event
        });
    });
};

// Handle view event info per user for one week
exports.view = function (req, res) {

    var query = {'userId': req.body.userId, 'courseId': req.body.courseId, 'week': req.body.week}

    Event.findOne(query, function (err, event) {
        if (err)
            res.send(err);
        res.json({
            message: 'Event details loading..',
            data: event
        });
    });
};

// Handle view event info for user all weeks
exports.viewUserProgress = function (req, res) {

    var query = {'userId': req.body.userId, 'courseId': req.body.courseId}

    Event.find(query, function (err, event) {
        if (err)
            res.send(err);
        res.json({
            message: 'Event details loading..',
            data: event
        });
    });
};

// Handle delete contact
exports.delete = function (req, res) {
    var query = {'userId': req.body.userId, 'courseId': req.body.courseId}
    Event.deleteMany(query, function (err) {
        if (err) 
            res.send(err); 
        res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};