module.exports.register = function(handlebars) {
    handlebars.registerHelper('scrollSpyId', function(id, options) {
        return id.replace(/\./g, "-");
    });
};