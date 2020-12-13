<?php
namespace Mageseller\Variantsfix\Plugin\Swatches\Block\Product\Renderer;
class Configurable
{
    public function afterGetJsonConfig(\Magento\Swatches\Block\Product\Renderer\Configurable $subject, $result) {
        $jsonResult = json_decode($result, true);

        $configurableProduct = $subject->getProduct();

        $name = $configurableProduct->getResource()->getAttributeRawValue($configurableProduct->getId(),['name'], 1);
        $description = $configurableProduct->getResource()->getAttributeRawValue($configurableProduct->getId(),['description'], 1);
        $short_description = $configurableProduct->getResource()->getAttributeRawValue($configurableProduct->getId(),['short_description'], 1);
        
        $jsonResult['configurable_name'] =  $name;
        $jsonResult['configurable_description'] =  $description;
        $jsonResult['configurable_short_description'] =  $short_description;
        
        $jsonResult['skus'] = [];
        foreach ($subject->getAllowProducts() as $simpleProduct) {
            $description = $simpleProduct->getResource()->getAttributeRawValue($simpleProduct->getId(),['description'], 1);
            $short_description = $simpleProduct->getResource()->getAttributeRawValue($simpleProduct->getId(),['short_description'], 1);
            $jsonResult['skus'][$simpleProduct->getId()] = $simpleProduct->getSku();
            $jsonResult['names'][$simpleProduct->getId()] = $simpleProduct->getName();
            $jsonResult['descriptions'][$simpleProduct->getId()] = $description;
            $jsonResult['short_descriptions'][$simpleProduct->getId()] = $short_description;
        }
        $result = json_encode($jsonResult);
        return $result;
    }
}
