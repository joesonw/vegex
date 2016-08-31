/*
* @Author: Joesonw
* @Date:   2016-08-30 14:53:57
* @Last Modified by:   Joesonw
* @Last Modified time: 2016-08-31 13:52:07
*/

'use strict';

const sprintf = require('sprintf').sprintf;

const tokens = [
    'BEGIN',
    'END',
    'REQUIRED',
    'OR',
    'BETWEEN',
    'AND',
    'MORE',
    'ONE',
    'OF',
    'FOR',
    'TO',
    'ONE',
    'NEWLINE',
    'WHITESPACE',
    'GROUP',
];

for (const token of tokens) {
    const name = token.replace(/ /g, '_');
    const regex = token.split('').map(char => {
        if (char === ' ') return '\s';
        return `[${char.toLowerCase()}${char.toUpperCase()}]`;
    }).join('');
    console.log(sprintf('%-40sreturn \'%s\';', regex, name));
}