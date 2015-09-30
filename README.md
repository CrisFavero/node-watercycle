# WaterCycle

### Simple collection of aws cloud formation scripts to easily manage template deployment.

Usage: `wc-createstack configuration.json`

*This is the very beginning of this script so things are likely to change drastically* 


##Creating the configuration file
parameters and capabilities are optional based on your templates needs.

example json document:
```json
{
	"stackName": "test-stack",
	"templateFileName": "test-stack.template",
	"parameters": [
		{
			"ParameterKey": "param1",
			"ParameterValue": "value"
		}
	],
	"capabilities": []
}
```
