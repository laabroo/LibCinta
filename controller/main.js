var _ = require('common/util');

var TAG = 'main.js';
_.extend(exports, {
	':load': function() {
		console.log('View was loaded');
		var view = this;

		app.view('main').on('load', function() {
			console.log(TAG + ' : ---------------- *******************  -------------------');
			app.on('message', function(action, data) {
				if (action === 'loadData') {
					console.log('Action : ' + action);
					console.log(data.text.content);
				}
			});
		});
	},
	':state': function() {
		app.on('message', function(action, data) {
			if (action === 'loadData') {
				console.log('Action : ' + action);
			}
		});
	},

	':keypress': function(key) {
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
	},

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

});