const mysql = require('mysql');

dbconfig={
    host:'localhost',
    user:'newuser',
    password:'password',
    database:'music'
}

function sqlQuery(query,callback) {
    var connection=mysql.createConnection(dbconfig);
    connection.connect();
    connection.query(query,function(err,rows){
        if (err){throw err}
        callback(rows);
        connection.end();
    })
}

module.exports = {
    sqlQuery
};
