module.exports.register = function(handlebars) {
    handlebars.registerHelper("debug", function(optionalValue) {
        var str = '',
            obj = this;
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += '-----' + p + '-----\n' + obj[p] + '\n';
            }
        }
        return str;
    });
};