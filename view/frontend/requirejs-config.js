var config = {
    config: {
        mixins: {
            'Magento_ConfigurableProduct/js/configurable': {
                'Mageseller_Variantsfix/js/model/skuswitch': true
            },
            'Magento_Swatches/js/swatch-renderer': {
                'Mageseller_Variantsfix/js/model/swatch-skuswitch': true
            }
        }
    }
};
