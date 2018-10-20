# Setup

```
$ npm install
$ npm install -g nodemon
```

## Setup mysql
..

## Import sample database
..


## install NVM (node version manager):
Windows: https://github.com/coreybutler/nvm-windows/releases
Mac: https://github.com/creationix/nvm/blob/master/README.md#installation

- nvm install 8.11.4
- nvm use 8.11.4

### Fix NVM

Windows? do:
- open node_modules/pre-push/index.js
- find `if (!this.npm)`
- right after if block, put:
`this.npm += ".cmd";`

## install mysql
Mac: Sequel pro, mysql workbench
Windows: Mysql Work bench -- https://dev.mysql.com/downloads/workbench/


- npm i -g babel-cli

## Adding new flow type definition
In order to avoid flow type errors, you can fetch definitions for popular modules from flow-typed. 

`npm run flow-typed-add express@4`
