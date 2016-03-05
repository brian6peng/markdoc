var marked = require('D:\\Code\\js\\marked\\lib\\marked.js');
var fs = require('fs')
var path = require('path');

marked.setOptions({
    variables: {
        baseUrl: "http://doc.notefirst.com",
        baseDir: "D:\\Document\\markdown"
    },
    reference: true,
    headerPrefix: 'section-',
    summary: true
});

console.log(marked(fs.readFileSync('D:\\Document\\markdown\\test.md', 'utf8')));

