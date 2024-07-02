const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'must provide a name'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'must provide an email'],
    unique: true,
    validate: [validator.isEmail, 'please provide a valid email'],
  },

  photo: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'please confirm password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'password not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  //Only run this fuction uf passwoed was actually modified
  if (!this.isModified('password')) return next();

  //Hash the passwoed with cost of 121
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChangedAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    console.log(this.passwordChangedAt, JWTTimestamp);
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
