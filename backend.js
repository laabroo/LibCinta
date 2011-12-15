// libcinta -- backend.js
log.info('Hello from backend bootstrap.');
var http = require('blaast/simple-http');
var QS = require('querystring');

app.message(function(client, action, data) {
    console.log('Action : ' + action);
    if (action === 'loadData') {
        var param = 'PustakaCinta';
        var url = 'https://api.twitter.com/1/statuses/user_timeline.json?screen_name='+param;

        http.get(url, {
            type: 'binary'
        }, {
            ok: function(data) {
                var jsonObj = JSON.parse(data);
                log.info(jsonObj);
                console.log(jsonObj.text);
                var array = [jsonObj];
                console.log(array.length);
                array.forEach(function(item){
                    console.log(item.text);
                    var panjang = item.length;
                    var i=0;
                    for(i=0;i<panjang;i++){
                        console.log(item.text[i]);
                        client.msg('loadData', {
                            text :
                            { content : item.text[i]}
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