var _ = require('common/util');
var app = this;
var ui = require('ui');
var TextView = ui.TextView;
var VLayout = require('ui').VLayout;
var Control = require('ui').Control;

var TAG = 'main.js';
_.extend(exports, {
    ':load': function() {
        console.log('View was loaded');
        var view = this;
        app.on('connected', function() {
            app.msg('loadData', { data : ''});
            app.on('message', function(action, data) {
                if (action === 'loadData') {
                    console.log(data.text.content);
                    clearInterval(view.intervalId);
                    delete view.intervalId;
                    var i = 1;
                    var temp;
                    var dataArray = [data.text.content];
                    dataArray.forEach(function(item) {
                        console.log('Item : ' + item);
                        if (i % 2 === 0) {
                            temp = new TextView({
                                label: item,
                                style: {
                                    color: 'black',
                                    width: 'fill-parent',
                                    'font-size':'small',
                                    'background-color': 'transparent'
                                }
                            });
                            temp.on('blur', function() {
                                this.style({
                                    'color': 'black',
                                    'font-weight': 'normal',
                                    'background-color': 'transparent'
                                });
                            });
                        } else {
                            temp = new TextView({
                                label: item,
                                style: {
                                    color: 'black',
                                    'font-size':'small',
                                    width: 'fill-parent',
                                    'background-color': '#BDB76B'
                                }
                            });
                            temp.on('blur', function() {
                                this.style({
                                    'color': 'black',
                                    'background-color': '#BDB76B',
                                    'font-weight': 'normal'
                                });
                            });
                        }
                        temp.on('activate', function() {
                            app.setContent('main', {
                                title: data.text.content
                            });
                        });
                        temp.on('focus', function() {
                            this.style({
                                'color': 'black',
                                'background-color': '#3682b0',
                                'font-weight': 'bold'
                            });
                        });
                        view.add(item, temp);
                        i++;
                    });
                    view.focusItem(1);
                }

            });
        });

    },

    ':keypress'
        :
        function(key) {
            if (this.index === undefined) {
                if (this.size() > 0) {
                    this.focusItem(1);
                }
            } else if (key === 'up' || key === 'down') {
                var next = this.index + (key === 'up' ? -1 : 1);

                if (next < 1) {
                    next = 1;
                } else if (next > (this.size() - 1)) {
                    next = this.size() - 1;
                }

                if (this.index === next) {
                    return;
                }

                this.focusItem(next);
            } else if (key === 'fire') {
                this.get(this.index).emit('activate');
            }
        }
    ,

    focusItem: function(index) {
        if (this.index !== undefined) {
            this.get(this.index).emit('blur');
        }
        this.index = index;
        this.get(index).emit('focus');
        if (index === 1) {
            this.scrollTop(0);
        }
        console.log(index);
        this.scrollTo(index);
    }

})
    ;