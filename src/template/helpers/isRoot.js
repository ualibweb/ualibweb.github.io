module.exports.register = function(handlebars) {
    handlebars.registerHelper('isRoot', function(root, options) {
        return (root == this.reference) ? options.fn(this) : options.inverse(this);
    });
};