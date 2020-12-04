#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const config = require('../config/compile.config.js');

const nunEnv = new nunjucks.Environment(
    [
      new nunjucks.FileSystemLoader('out/styles/'),
      new nunjucks.FileSystemLoader('src/views/'),
    ],
    {},
);

const renderFile = (directorySegments, fileName, staticData) => {
  console.log(`Rendering ${path.resolve('out', directorySegments, fileName)}...`);
  const compiledFile = nunEnv.render(
      path.join(directorySegments, fileName),
      { ...staticData, filename: fileName },
  );

  if (!fs.existsSync('out')) {
    fs.mkdirSync('out');
  }
  if (!fs.existsSync(path.resolve('out', directorySegments))) {
    fs.mkdirSync(
        path.resolve('out', directorySegments),
        { recursive: true },
    );
  }
  const strippedFileName = fileName.split(/\.njk$/)[0];
  fs.writeFileSync(
      path.resolve('out', directorySegments, strippedFileName + '.html'),
      compiledFile
  );
};

const dirsToRead = [ path.resolve('src/views/') ];

while (dirsToRead.length > 0) {
  let currentDir = dirsToRead.pop();
  let scannedDir = fs.readdirSync(currentDir);
  console.log(`${currentDir} found ${scannedDir.length} files inside...`);
  scannedDir.forEach((file) => {
    let currentFile = path.resolve(currentDir, file);
    console.log(`Reviewing ${currentFile}...`);
    if (fs.statSync(currentFile).isDirectory()) {
      dirsToRead.push(currentFile);
    } else {
      if (/\.njk$/.test(currentFile) && !/\.par\.njk$/.test(currentFile)) {
        const afterSrcPath = currentDir.split(/src\/views\/?/)[1];
        renderFile(afterSrcPath, file, config);
      }
    }
  })
}
