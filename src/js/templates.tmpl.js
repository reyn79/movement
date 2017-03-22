this["movement"] = this["movement"] || {};
this["movement"]["templates"] = this["movement"]["templates"] || {};

this["movement"]["templates"]["src/html/inc/car-item.hbs"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"item"
    + ((stack1 = helpers["if"].call(alias1,(data && data.first),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\r\n    <div class=\"row\">\r\n        <div class=\"col-xs-8 col-xs-offset-2\">\r\n            <div class=\"media\">\r\n                <div class=\"media-left\">\r\n                    <a href=\"#\">\r\n                        <img class=\"media-object\" src=\""
    + alias4(((helper = (helper = helpers.profile_photo_url || (depth0 != null ? depth0.profile_photo_url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"profile_photo_url","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias4(((helper = (helper = helpers.author_name || (depth0 != null ? depth0.author_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author_name","hash":{},"data":data}) : helper)))
    + "\">\r\n                    </a>\r\n                </div>\r\n                <div class=\"media-body\">\r\n                    <p>"
    + alias4(((helper = (helper = helpers.text || (depth0 != null ? depth0.text : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data}) : helper)))
    + "\r\n                        <span>"
    + alias4(((helper = (helper = helpers.author_name || (depth0 != null ? depth0.author_name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author_name","hash":{},"data":data}) : helper)))
    + "</span>\r\n                    </p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return " active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});