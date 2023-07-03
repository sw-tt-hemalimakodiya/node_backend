'use strict';

module.exports = function(app) {
    var userRoutes = require('./user');
	app.use('/api/user', userRoutes);
}