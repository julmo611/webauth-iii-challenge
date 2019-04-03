const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../api/secrets').jwtSecret;
const Users = require('../users/users-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
	user.password = hash;

	Users.add(user)
		.then(saved => {
			res.status(201).json(saved);
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

router.post('/login', (req, res) => {
	let { username, password, department } = req.body;

	Users.findBy({ username, department })
		.first()
		.then(user => {
			if (user && bcrypt.compareSync(password, user.password)) {
				const token = generateToken(user);
				res.status(200).json({
					message: `Welcome ${user.username}!`,
					token
				});
			} else {
				res.status(401).json({ message: 'Invalid Credentials' });
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
});

function generateToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
		department: user.department
	};

	const options = {
		expiresIn: '1d'
	};

	return jwt.sign(payload, secret, options);
}

// logout enpoint /logout

router.get('/logout', (req, res) => {
	if (req.session) {
		req.session.destroy(err => {
			if (err) {
				res.status(500).json({ message: 'automatic logout' });
			} else {
				res.status(200).json({ message: 'bye, thanks' });
			}
		});
	} else {
		res.status(200).json({ message: 'bye, thanks' });
	}
});

module.exports = router;
