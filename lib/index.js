/*
* @Author: Qiaosen Huang
* @Date:   2016-08-30 11:51:15
* @Last Modified by:   Joesonw
* @Last Modified time: 2016-08-31 16:58:21
*/

'use strict';
//const Parser = require('jison').Parser;
const parser = require('../grammar.js').parser;
const js = require('../languages/js');

parser.yy = require('./entity');
const result = parser.parse(`
    group ('s' 1 or more; one of 'bcdef');
    a to z between 1 and 10;
    'a'

`);

js(result);