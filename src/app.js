const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

const Person = require('Person')
const Viteamin = require('Viteamin')

const server = express()
server.use(bodyParser.json())