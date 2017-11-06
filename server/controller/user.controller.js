module.exports = function (app) {
	app.get('/user/userlist', function (req, res) {
		res.json(require('./../model/user/userlist'));
	});
};
