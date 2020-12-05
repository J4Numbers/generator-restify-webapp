/* eslint-disable import/no-dynamic-require,global-require */
const chai = require('chai');
const helpers = require('yeoman-test');

process.env.NODE_ENV = 'test';

global.expect = chai.expect;
global.yHelpers = helpers;
