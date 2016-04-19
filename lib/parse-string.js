var _ = require('underscore');
var esprima = require('esprima');


/**
 * Takes JavaScript source string and parses Angular module definitions
 * in an Array, each item an Object with properties:
 *   moduleName : String
 *   instantiation : Boolean
 * 
 * @param  {String} js The JavaScript source
 * @return {Array}    The parsed Array
 */
function parseString(js) {
	var tree = esprima.parse(js);
	var expressions = rfilter(tree, isAngularModuleCallExpression);
	return _.map(expressions, parseAngularModuleCallExpression);
}



function isAngularModuleCallExpression(node) {
	if (!node) return false;
	if (node.type !== 'CallExpression') return false;
	if (node.callee.type !== 'MemberExpression') return false;
	if (node.callee.object.type === 'Identifier') {
		if (node.callee.object.name !== 'angular') return false;
	} else if (node.callee.object.type === 'MemberExpression') {
		if (node.callee.object.object.type !== 'Identifier') return false;
		if (node.callee.object.object.name !== 'window') return false;
		if (node.callee.object.property.type !== 'Identifier') return false;
		if (node.callee.object.property.name !== 'angular') return false;
	} else {
		return false;
	}
	if (node.callee.property.type !== 'Identifier') return false;
	if (node.callee.property.name !== 'module') return false;
	if (node.arguments.length < 1) return false;
	if (node.arguments[0].type !== 'Literal') return false;
	return true;
}

function parseAngularModuleCallExpression(node) {
	var name = node.arguments[0].value;
	var declaration = node.arguments.length > 1;
	return {
		name: name,
		declaration: declaration
	};
}

function reach(node, cb) {
	if (_.isArray(node) || _.isObject(node)) {
		_.each(node, function(v, k) {
			cb(v, k);
			reach(v, cb);
		});
	}
}

function rfilter(node, cb) {
	var included = [];
	reach(node, function(subNode) {
		if (cb(subNode)) {
			included.push(subNode);
		}
	});
	return included;
}



module.exports = parseString;