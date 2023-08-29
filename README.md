# Presentation

This project was generated with [Angular CLI]

## Requirements

- [Node.js](https://nodejs.org/en/) (>= 10.13.0)
- [Nest CLI](https://docs.nestjs.com/cli/overview) (>= 7.0.0)

## Publish

Commit the changes and run `npm run publish:<option>` to publish the schematics.

<option> can be `patch`, `minor` or `major`.

## Install

Run `npm install @kradihsoy/lt-schematics` to install the schematics.

Yarn : `yarn add @kradihsoy/lt-schematics`

## Usage

Run `nest generate -c @kradihsoy/lt-schematics mongoose <name> <path> <spec> <dto> <skipImport>` to generate a new component.

## Options

| Option | Type | Default | Description | Required |
| ------ | ---- | ------- | ----------- | -------- |
| name | string |  | The name of the component. | true |
| path | string | src | The path to create the component. | false |
| spec | boolean | true | Specifies if a spec file is generated. | false |
| dto | boolean | true | Specifies if a dto file is generated. | false |
| skipImport | boolean | false | Specifies if the module imports are skipped. | false |