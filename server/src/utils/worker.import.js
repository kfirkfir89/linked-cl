/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable prettier/prettier */
const p = require('path');
const { workerData } = require('worker_threads');
require('ts-node').register();
require(p.resolve(__dirname, workerData.data.path));