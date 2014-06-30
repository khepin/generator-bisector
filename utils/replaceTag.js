module.exports = function replaceTag(original, tagName, content) {
    // Regexp to find the tags
    var r = new RegExp('\<' + tagName + '\>[^<]*\<\/' + tagName + '\>')
    // How many spaces before the tags
    var s = new RegExp('\n( +)\/\/ \<' + tagName + '\>')
    var spaces = original.match(s)[1].length
    // String of "n" spaces
    spaces = '\n' + Array(spaces + 1).join(' ')

    var c = '<' + tagName + '>'
    for (var i = 0; i < content.length; i++) {
        c += spaces + content[i]
    }
    c += spaces + '// </' + tagName + '>'

    return original.replace(r, c)
};