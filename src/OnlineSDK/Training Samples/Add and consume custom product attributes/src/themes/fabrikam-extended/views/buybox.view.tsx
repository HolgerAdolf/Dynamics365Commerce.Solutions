/*--------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * See License.txt in the project root for license information.
 *--------------------------------------------------------------*/

import { Module, Node } from '@msdyn365-commerce-modules/utilities';
import * as React from 'react';

import { IBuyboxAddToCartViewProps, IBuyboxAddToOrderTemplateViewProps, IBuyboxAddToWishlistViewProps, IBuyboxKeyInPriceViewProps, IBuyboxProductConfigureDropdownViewProps, IBuyboxProductConfigureViewProps, IBuyboxProductQuantityViewProps, IBuyboxShopSimilarLookViewProps } from '@msdyn365-commerce-modules/buybox/src/modules/buybox/../../common';
import { IBuyboxViewProps } from '@msdyn365-commerce-modules/buybox/src/modules/buybox/./buybox';
import { IBuyboxFindInStoreViewProps } from '@msdyn365-commerce-modules/buybox/src/modules/buybox/./components/buybox-find-in-store';
import { ArrayExtensions } from '@msdyn365-commerce-modules/retail-actions';
import { AsyncResult, AttributeValue } from '@msdyn365-commerce/retail-proxy';
import { IBuyboxProps as IBuyboxExtentionProps } from '../definition-extensions/buybox.ext.props.autogenerated';

export interface IBuyboxExtData {
    productAttributes: AsyncResult<AttributeValue[]>;
}

enum CustomAttributes {
    customAttribute = 'customAttribute'
}

const BuyboxView: React.FC<IBuyboxViewProps & IBuyboxExtentionProps<IBuyboxExtData>> = props => {
    const { ModuleProps, MediaGalleryContainerProps, ProductInfoContainerProps, addToCart, addToOrderTemplate, addToWishlist, configure, description, findInStore, quantity, price, title, rating, inventoryLabel, shopSimilarLook, keyInPrice,
        shopSimilarDescription, unitOfMeasure } = props;

    return (
        <Module {...ModuleProps}>
            <Node {...MediaGalleryContainerProps}>
                {props.mediaGallery}
            </Node>
            <Node {...ProductInfoContainerProps}>
                {title}
                {price}
                {unitOfMeasure}
                {props.bulkPurchaseLink}
                {description}
                {getCustomAttribute(props)}
                {rating}
                {configure && _renderConfigure(configure)}
                {keyInPrice && _renderKeyInPrice(keyInPrice)}
                {quantity && _renderQuantity(quantity)}
                {inventoryLabel}
                {addToCart && _renderAddToCart(addToCart)}
                {findInStore && _renderFindInStore(findInStore)}
                {addToOrderTemplate && _renderAddToOrderTemplate(addToOrderTemplate)}
                {addToWishlist && _renderAddToWishlist(addToWishlist)}
                {_renderSocialShare(props.slots && props.slots.socialShare)}
                {shopSimilarLook && _renderShopSimilarItem(shopSimilarLook)}
                {shopSimilarDescription && _renderShopSimilarItem(shopSimilarDescription)}
            </Node>
        </Module>
    );
};

export function getCustomAttribute(props: IBuyboxViewProps & IBuyboxExtentionProps<IBuyboxExtData>): React.ReactElement | undefined {
    const productAttributes = props.data.productAttributes.result;
    let customAttributeValue: string | undefined;
    if (!productAttributes) {
        return undefined;
    }

    ArrayExtensions.validValues(
        productAttributes.map(item => {
             if (item.Name === CustomAttributes.customAttribute && item.TextValue !== '') {
                customAttributeValue = item.TextValue;
            }
        })
    );
    return customAttributeValue ? <div className='msc-product-custom-attribute'>{customAttributeValue}</div> : undefined;
}

const _renderAddToCart = (addToCart: IBuyboxAddToCartViewProps): JSX.Element => {
    const { ContainerProps, errorBlock, button } = addToCart;

    return (
        <Node {...ContainerProps}>
            {errorBlock}
            {button}
        </Node>
    );
};

const _renderAddToOrderTemplate = (addToOrderTemplate: IBuyboxAddToOrderTemplateViewProps): JSX.Element => {
    const { ContainerProps, errorBlock, button } = addToOrderTemplate;

    return (
        <Node {...ContainerProps}>
            {errorBlock}
            {button}
        </Node>
    );
};

const _renderAddToWishlist = (addToWishlist: IBuyboxAddToWishlistViewProps): JSX.Element => {
    const { ContainerProps, errorBlock, button } = addToWishlist;

    return (
        <Node {...ContainerProps}>
            {errorBlock}
            {button}
        </Node>
    );
};

const _renderConfigure = (configure: IBuyboxProductConfigureViewProps): JSX.Element => {
    const { ContainerProps, dropdowns } = configure;

    return (
        <Node {...ContainerProps}>
            {dropdowns.map(_renderConfigureDropdown)}
        </Node>
    );
};

const _renderSocialShare = (socialShare: React.ReactNode[]): JSX.Element | undefined => {
    if (!socialShare || socialShare.length === 0) {
        return undefined;
    }

    return (
        <>
            {socialShare[0]}
        </>
    );
};

const _renderConfigureDropdown = (dropdown: IBuyboxProductConfigureDropdownViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, errors, select } = dropdown;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>
                {heading}
                {errors}
            </Node>
            {select}
        </Node>
    );
};

const _renderFindInStore = (findInStore: IBuyboxFindInStoreViewProps): JSX.Element => {
    const { ContainerProps, storeSelector, heading, description, errors, button, modal, productPickupOptionList } = findInStore;

    return (
        <Node {...ContainerProps}>
            {storeSelector}
            {heading}
            {productPickupOptionList}
            {description}
            {errors}
            {button}
            {modal}
        </Node>
    );
};

const _renderQuantity = (quantity: IBuyboxProductQuantityViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, input, errors } = quantity;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>
                {heading}
                {errors}
            </Node>
            {input}
        </Node>
    );
};

const _renderKeyInPrice = (keyInPrice: IBuyboxKeyInPriceViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, input } = keyInPrice;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>
                {heading}
            </Node>
            {input}
        </Node>
    );
};

const _renderShopSimilarItem = (shopSimilarItem: IBuyboxShopSimilarLookViewProps): JSX.Element => {
    const { ContainerProps, errors, input } = shopSimilarItem;

    return (
        <Node {...ContainerProps}>
            {errors}
            {input}
        </Node>
    );
};
export default BuyboxView;
