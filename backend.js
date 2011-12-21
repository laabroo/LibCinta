// infogempa -- backend.js
log.info('Hello from backend bootstrap.');
var _ = require('underscore');
var scaling = new (require('blaast/scaling').Scaling)();
var http = require('blaast/simple-http');
var QS = require('querystring');
var url = require('url');

app.message(function(client, action, data) {
    console.log('Action : ' + action);
    if (action === 'loadData') {
        var param = 'infoBMKG';
        var url = 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + param;
        var apiurl = "http://api.twitpic.com/2/users/show.json?username="+param;

        http.get(apiurl, {
            type: 'binary'
        }, {
            ok: function(data) {
                console.log('Data JSON : '+data);
                data = JSON.parse(data);
                console.log(data);
                console.log('Panjang : '+data.images.length);
                var array = [data.images];
                array.forEach(function(item) {
                    console.log('Item : '+item);
                    var panjang = item.length;
                    console.log('Pangjang : '+panjang);
                    var i = 0;
                    for(i = 0; i < panjang; i++) {
                        console.log('Data : '+item[i].message);
                        client.msg('loadData', {
                            text :
                            { content : item[i].message, data : item[i]}
                        });
                    }
                });
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

});