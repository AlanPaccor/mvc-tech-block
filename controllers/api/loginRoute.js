const express = require('express');
const { User } = require('../../models');

const uniqueRouter = express.Router();

uniqueRouter.post('/', async (req, res) => {
  try {
    const userExists = await User.findOne({ where: { user_name: req.body.user_name } });

    if (!userExists) {
      res.status(400).json({ msg: 'Invalid username or password. Please try again.' });
      return;
    }

    const isValidPassword = await userExists.checkPw(req.body.password);

    if (!isValidPassword) {
      res.status(401).json({ msg: 'Invalid password. Please try again.' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userExists.id;
      req.session.logged_in = true;

      res.json({ user: userExists, msg: 'Login successful.' });
    });
  } catch (error) {
    res.status(500).json({ error: error, msg: 'An error occurred while processing your request.' });
    console.log(error);
  }
});

uniqueRouter.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = uniqueRouter;
