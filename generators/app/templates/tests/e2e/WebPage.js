module.exports = WebPage;
var ptor = protractor.getInstance();

function WebPage() {}

WebPage.prototype.get = function(url){
    browser.get(url || this.url || 'examples/index.html');
    return this;
};

WebPage.prototype.load = function(url){
    this.get(url);
    return ptor.wait(function(){
        return element.all(by.css('[ng-controller]')).count().then(function(count){
            return count > 0;
        });
    });
};

WebPage.prototype.reload = function() {
    var self = this;
    return ptor.getCurrentUrl().then(function(url){
        self.load(url);
    });
};

/**
 * Triggers a "blur" event on a given element in the page.
 *
 * When the browser window does not have the focus, the normal blur event
 * would not be triggered. This is a workaround for this.
 *
 * @param  {string} selector A CSS selector for the element on which to trigger the
 * blur event.
 */
WebPage.prototype.blurElement = function(selector) {
    element(by.css(selector)).sendKeys(protractor.Key.TAB);
    var script = "$(':selector').trigger('blur');".replace(':selector', selector);
    ptor.executeScript(script);
};