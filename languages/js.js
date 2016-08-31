/*
* @Author: Joesonw
* @Date:   2016-08-31 13:47:57
* @Last Modified by:   Joesonw
* @Last Modified time: 2016-08-31 17:12:53
*/

'use strict';

const entity = require('../lib/entity');

module.exports = function js(rules) {
    let regex = '';
    for (const rule of rules) {
        if (rule.constructor === entity.Group) {
            regex += '(' + rule.rules.map(r => parseRule(r)).join('') + ')';
        } else {
            regex += parseRule(rule);
        }
    }
    return new RegExp(regex);
};

function parseRule(rule) {
    const args = rule.args;
    let r = rule.rule;
    switch (r) {
        case entity.R.TO:
            r = `[${args[0]}-${args[1]}]`;
    }
    for (let i = 0; i < rule.pres.length; i++) {
        r = parsePrefix(rule.pres[i], r) ;
    }
    for (let i = 0; i < rule.posts.length; i++) {
        r = parsePostfix(rule.posts[i], r) ;
    }
    return r;
}

function parsePostfix(post, rule) {
    const type = post.type;
    const args = post.args;
    switch (type) {
        case entity.POST.OR_MORE:
            return `${rule}{${args},}`;
        case entity.POST.BETWEEN:
            return `${rule}{${args[0]},${args[1]}}`
    }
    return rule;
}

function parsePrefix(pre, rule) {
    switch (pre.type) {
        case entity.PRE.ONE_OF:
            return `[${rule}]`;
    }
    return rule;
}