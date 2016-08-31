/*
* @Author: Joesonw
* @Date:   2016-08-30 14:34:02
* @Last Modified by:   Joesonw
* @Last Modified time: 2016-08-31 16:51:51
*/

'use strict';

function Entity() {

}

const POST = {
    OPTIONAL: 0,
    ONE_OR_MORE: 1,
    BETWEEN: 2,
    OR_MORE: 3,
    MORE: 4,
    FOR: 5,
};

const R = {
    TO: 0,
};

function Postfix(type, args) {
    this.type = type;
    this.args = args;
};

function Prefix(type, args) {
    this.type = type;
    this.args = args;
};

const PRE = {
    ONE_OF: 0,
};

function Rule(rule, args) {
    this.rule = rule;
    this.args = args;
    this.posts = [];
    this.pres = [];
};

function Group(rules) {
    this.rules = rules;
};

module.exports = {
    Rule,
    Entity,
    POST,
    PRE,
    Postfix,
    Prefix,
    Group,
    R,
}