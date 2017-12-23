var cassandra = require('cassandra-driver');
var async = require('async');

var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'test'});

client.execute("SELECT lastname, age, city, email, firstname FROM users WHERE lastname='Jones'", function (err, result) {
    if (!err){
        if ( result.rows.length > 0 ) {
            var user = result.rows[0];
            console.log("name = %s, age = %d", user.firstname, user.age);
        } else {
            console.log("No results");
        }
    }else{
        console.log(err);
        client.execute("CREATE KEYSPACE IF NOT EXISTS test WITH replication = { 'class': 'SimpleStrategy',  'replication_factor': '3};",function() {

        });
        client.execute("CREATE TABLE emp( emp_id int PRIMARY KEY, emp_name text, emp_city text, emp_sal varint, emp_phone varint);",function() {

        });
    }
});
