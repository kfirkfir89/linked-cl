/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable prettier/prettier */
const path = require('path');
const { workerData } = require('worker_threads');
require('ts-node').register();
require(path.resolve(__dirname, workerData.data.path));