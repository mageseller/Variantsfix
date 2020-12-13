<?php
namespace Mageseller\Variantsfix\Plugin\Checkout\Block\Cart\Item;

class Renderer
{
    public function beforeSetItem(
        \Magento\Checkout\Block\Cart\Item\Renderer $subject,
        $item
    ) {
        $product = $item->getProduct();
        if($product->getTypeId() == "configurable"){
            foreach ($item->getChildren() as $childItem){
                $product->setName($childItem->getName());
                $item->setProduct($product);
            }
        }
        return [$item];
    }
}
