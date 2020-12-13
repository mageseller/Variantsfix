define([
    'jquery',
    'mage/utils/wrapper'
], function ($, wrapper) {
    'use strict';
    return function(targetModule){
        var init = targetModule.prototype._init;
        var initWrapper = wrapper.wrap(init, function(original){
            original();
            if (this.options.jsonConfig.attributes.length > 0) {
                var selectswatch = this.element.find('.' + this.options.classes.attributeClass + ' .' + this.options.classes.attributeOptionsWrapper);
                $.each(selectswatch, function (index, item) {
                    var swatchOption = $(item).find('div.swatch-option').first();
                    if (swatchOption.length && !$(item).find('div.swatch-option').hasClass('selected')) {
                        swatchOption.trigger('click');
                    }
                });
            }
        });
        targetModule.prototype._init = initWrapper;
        var updatePrice = targetModule.prototype._UpdatePrice;
        targetModule.prototype.configurableSku = $('div.product-info-main .sku .value').html();
        var updatePriceWrapper = wrapper.wrap(updatePrice, function(original){
            var allSelected = true;
            for(var i = 0; i<this.options.jsonConfig.attributes.length;i++){
                if (!$('div.product-info-main .product-options-wrapper .swatch-attribute.' + this.options.jsonConfig.attributes[i].code).attr('data-option-selected')){
                    allSelected = false;
                }
            }
            var simpleSku = this.configurableSku;
            var simpleName = this.options.jsonConfig.configurable_description;
            var simpleDescription = this.options.jsonConfig.configurable_description;
            var simpleShortDescription = this.options.jsonConfig.configurable_short_description;
            if (allSelected){
                var products = this._CalcProducts();
                simpleSku = this.options.jsonConfig.skus[products.slice().shift()];
                simpleName = this.options.jsonConfig.names[products.slice().shift()];
                if(this.options.jsonConfig.descriptions[products.slice().shift()].length > 0){
                    simpleDescription = this.options.jsonConfig.descriptions[products.slice().shift()];
                }
                if(this.options.jsonConfig.short_descriptions[products.slice().shift()].length > 0){
                    simpleShortDescription = this.options.jsonConfig.short_descriptions[products.slice().shift()];
                }
            }

            $('div.product-info-main .sku .value').html(simpleSku);
            $('.page-title [itemprop="name"]').html(simpleName);
            $('.product.attribute.description .value').html(simpleDescription);
            $('[itemprop="description"]').html(simpleShortDescription);
            return original();
        });

        targetModule.prototype._UpdatePrice = updatePriceWrapper;
        return targetModule;
    };
});
