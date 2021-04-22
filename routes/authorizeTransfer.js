var express = require('express');
var router = express.Router();
const db = require("../util/database");


/* GET home page. */
router.get('/:transferID', function (req, res, next) {
    var tid = req.params.transferID;
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
    var host = req.get('host');


    if ((ip === "127.0.0.1" || ip === "::ffff:127.0.0.1" || ip === "::1") || host.indexOf("localhost") !== -1) {

        //Once transfer is authorized update transaction record's status to 1.
        db.run(
            `UPDATE transfer set 
           authorized = 1 
           WHERE transferID = ?`,
            [tid],
            function (err, result) {
                if (err) {
                    res.send("Invalid");
                    return;
                }
                else {
                    res.redirect("/"); //redirect to transfer page once transfer record has been updated.
                }
            });
    }
    else {
        res.status(401).send("Access Denied / Unauthorized request"); //authorization denied
    } 
});

module.exports = router;