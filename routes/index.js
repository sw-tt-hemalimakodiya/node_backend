'use strict';

module.exports = function(app) {
    var userRoutes = require('./user');
	app.use('/api/user', userRoutes);

    var categoryRoutes = require('./category');
	app.use('/api/category', categoryRoutes);
}