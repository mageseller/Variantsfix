define([
    'jquery',
    'mage/utils/wrapper'
], function ($, wrapper) {
    'use strict';

    return function(targetModule){
        
        var fillSelect = targetModule.prototype._fillSelect;
        var fillSelectWrapper = wrapper.wrap(fillSelect, function(original,element){
            var attributeId = element.id.replace(/[a-z]*/, ''),
            options = this._getAttributeOptions(attributeId),
            prevConfig,
            index = 1,
            allowedProducts,
            i,
            j;

            this._clearSelect(element);
            element.options[0] = new Option('', '');
            element.options[0].innerHTML = this.options.spConfig.chooseText;
            prevConfig = false;

            if (element.prevSetting) {
                prevConfig = element.prevSetting.options[element.prevSetting.selectedIndex];
            }

            if (options) {
                for (i = 0; i < options.length; i++) {
                    allowedProducts = [];
                    if (prevConfig) {
                        for (j = 0; j < options[i].products.length; j++) {
                            // prevConfig.config can be undefined
                            if (prevConfig.config &&
                                prevConfig.config.allowedProducts &&
                                prevConfig.config.allowedProducts.indexOf(options[i].products[j]) > -1) {
                                allowedProducts.push(options[i].products[j]);
                            }
                        }
                    } else {
                        allowedProducts = options[i].products.slice(0);
                    }

                    if (allowedProducts.length > 0) {
                        options[i].allowedProducts = allowedProducts;
                        element.options[index] = new Option(this._getOptionLabel(options[i]), options[i].id);
                        if (typeof options[i].price !== 'undefined') {
                            element.options[index].setAttribute('price', options[i].prices);
                        }
                        element.options[index].config = options[i];
                        index++;
                    }
                    
                    //extra code for select first option
                    if (i == 0) {
                        this.options.values[attributeId] = options[i].id;
                    }   
                }            
                if (window.location.href.indexOf('#') !== -1) {this._parseQueryParams(window.location.href.substr(window.location.href.indexOf('#') + 1));}
            }
        });
        targetModule.prototype._fillSelect = fillSelectWrapper;

        var reloadPrice = targetModule.prototype._reloadPrice;
        var reloadPriceWrapper = wrapper.wrap(reloadPrice, function(original){
            var result = original();
            var simpleSku = this.options.spConfig.skus[this.simpleProduct];
            var simpleName = this.options.spConfig.names[this.simpleProduct];
            var description = this.options.spConfig.descriptions[this.simpleProduct];
            var shortDescription = this.options.spConfig.short_descriptions[this.simpleProduct];
            var oldDescription = this.options.spConfig.configurable_description;
            var oldShortDescription = this.options.spConfig.configurable_short_description;
            if(simpleSku != '') {
                $('.product.attribute.sku [itemprop="sku"]').html(simpleSku);
            }
            if(simpleName != '') {
                $('.page-title [itemprop="name"]').html(simpleName);
            }
            var descriptionSelect = $('#description .product.attribute.description .value');
            
            if(description != '' && typeof description != 'undefined') {
                descriptionSelect.html(description);
            }else{
                descriptionSelect.html(oldDescription);
            }
            var shortDescriptionSelect = $('.product.attribute.overview [itemprop="description"]');
            
            if(shortDescription != '' && typeof shortDescription != 'undefined') {
                shortDescriptionSelect.html(shortDescription);
            }else{
                shortDescriptionSelect.html(oldShortDescription);
            }
            return result;
        });
        targetModule.prototype._reloadPrice = reloadPriceWrapper;
        return targetModule;
    };
});
