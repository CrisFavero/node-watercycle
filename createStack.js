#!/usr/bin/env node
/**
 * Created by cmfavero on 9/29/15.
 */
var fs = require('fs');
var path = require('path');
var AWS = require('aws-sdk');

var cloudFormation = new AWS.CloudFormation({region: "us-east-1"});
var options = process.argv.slice(2);

if (options.length !== 1) {
	console.error("Expecting only a json configuration file name");
	process.exit(-1)
}

try {
	var configFile = require(path.resolve(options[0]));
} catch (e) {
	console.error("could not load json file", e.stack || e);
	process.exit(-1)
}

if (!configFile.templateFileName || !configFile.stackName) {
	console.error("missing required parameters");
	process.exit(-1);
}

//resolve the template filename based on the directory where the config was.
var resolvedTemplateFilename = path.resolve(path.dirname(options[0]), configFile.templateFileName);
var templateBody = fs.readFileSync(resolvedTemplateFilename);

var stack = {
	"StackName": configFile.stackName,
	"TemplateBody": templateBody.toString('utf8')
};

if (configFile.capabilities && configFile.capabilities.length > 0) {
	stack.Capabilities = configFile.capabilities;
}
if (configFile.parameters && configFile.parameters.length > 0) {
	stack.Parameters = configFile.parameters;
}

function response(err, data) {
	if (err) {
		// an error occurred
		console.error(err, err.stack);
	} else {
		// successful response
		console.log(data);
	}
}
cloudFormation.createStack(stack, response);
