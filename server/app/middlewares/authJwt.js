const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const Role = db.role;

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

// Check if user (find by id in request) has a given role
const userHasRole = (req, res, next, role) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.find({ _id: { $in: user.roles }}, (err, roles) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === role) {
          next();
          return;
        }
      }

      res.status(403).send({ message: `Require ${role} role!` });
      return;
    });
  });
};

// Check if a user is admin
const isAdmin = (req, res, next) => userHasRole(req, res, next, 'admin');

// Check if a user is moderator
const isModerator = (req, res, next) => userHasRole(req, res, next, 'moderator');

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;