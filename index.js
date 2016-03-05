var marked = require('D:\\Code\\js\\marked\\lib\\marked.js');
var fs = require('fs')
var path = require('path');

var baseDir = 'D:\\Document\\markdown';

function load() {
    var files = {}
      , list
      , file
      , i
      , l;

    list = fs
      .readdirSync(baseDir)
      .filter(function (file) {
          return path.extname(file) === '.md';
      });

    i = 0;
    l = list.length;

    for (; i < l; i++) {
        file = path.join(baseDir, list[i]);
        files[path.basename(file)] = fs.readFileSync(file, 'utf8');
    }
    return files;
}

function main() {
    marked.setOptions({
        variables: {
            baseUrl: "http://doc.notefirst.com",
            baseDir: "D:\\Document\\markdown"
        },
        reference: true,
        headerPrefix: 'section-'
    });

    var templatePath = path.join(baseDir, '模版\\Index.htm');
    var templateContent = fs.readFileSync(templatePath, 'utf8');

    var files = load();
    var file;
    for (file in files) {
        var result = templateContent;
        result = result.replace('{{FileName}}', file);
        marked.setOptions({
            summary: false,
            firstDepth: 0
        });
        var content = marked(files[file]);
        result = result.replace('{{content}}', content);
        marked.setOptions({
            summary: true
        });
        var summary = marked(files[file]);
        result = result.replace('{{summary}}', summary);

        var resultPath = path.join(baseDir, file).replace(/[^.]+$/, 'html');
        fs.writeFileSync(resultPath, result);
    }
}

exports = main;
exports.main = main;
module.exports = exports;

main();

