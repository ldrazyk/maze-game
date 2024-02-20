import express from 'express';
import path from 'path';
// const express = require('express');
// const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.static('src'));
app.use(express.static(path.resolve('learn', 'svg')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});

app.get('/svg', (req, res) => {
    res.sendFile(path.resolve('learn', 'svg', 'index.html'));
});


const PORT = 8081;

app.listen(PORT, () => console.log(`Listening to port ${PORT}...`));