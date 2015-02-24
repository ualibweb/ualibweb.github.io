module.exports.register = function(handlebars) {
    handlebars.registerHelper('ifAny', function () {
        var argLength = arguments.length - 1;
        var content = arguments[argLength];
        var success = true;
        var i = 0;
        while (i < argLength) {
            if (!arguments[i]) {
                success = false;
                break;
            }
            i += 1;
        }
        if (success) {
            return content.fn(this);
        } else {
            return content.inverse(this);
        }
    });
};
