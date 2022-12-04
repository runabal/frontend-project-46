const { Command } = require('./lib/command.js');
const { Option } = require('./lib/option.js');

exports = module.exports = new Command ();
exports.program = exports;

exports.Argument = Argument;
exports.Command = Command;
exports.Option = Option;
