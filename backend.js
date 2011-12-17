// libcinta -- backend.js
log.info('Hello from backend bootstrap.');
var _ = require('underscore');
var scaling = new (require('blaast/scaling').Scaling)();
var http = require('blaast/simple-http');
var QS = require('querystring');
var url = require('url');

app.message(function(client, action, data) {
    console.log('Action : ' + action);
    if (action === 'loadData') {
        var param = 'PustakaCinta';
        var url = 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + param;

        http.get(url, {
            type: 'binary'
        }, {
            ok: function(data) {
                console.log('Data JSON : '+data);
                data = JSON.parse(data);
                console.log(data);
                var array = [data];
                array.forEach(function(item) {
                    console.log(item.text);
                    var panjang = item.length;
                    console.log('Pangjang : '+panjang);
                    var i = 0;
                    for(i = 0; i < panjang; i++) {
                        client.msg('loadData', {
                            text :
                            { content : item[i].text}
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