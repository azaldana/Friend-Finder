var friends = require('../data/friends.js');


module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });


    app.post("/api/friends", function (req, res) {
        console.log(req.body.scores);

        var userInput = req.body;

        console.log(userInput);

        for (var i = 0; i < userInput.scores.length; i++) {
            userInput.scores[i] = parseInt(userInput.scores[i]);
        }

        var bestFriendIndex = 0;
        var minimumDifference = 40;

        // in this for-loop, start off with a zero difference and compare the user and the ith friend scores, one set at a time
        //  whatever the difference is, add to the total difference
        for (var i = 0; i < friends.length; i++) {
            var totalDifference = 0;
            for (var j = 0; j < friends[i].scores.length; j++) {
                var difference = Math.abs(userInput.scores[j] - friends[i].scores[j]);
                totalDifference += difference;
            }

            if (totalDifference < minimumDifference) {
                bestFriendIndex = i;
                minimumDifference = totalDifference;
            }
        }

        friends.push(userInput);

        // send back to browser the best friend match
        res.json(friends[bestFriendIndex]);

    });
}