function bestCharge(selectedItems) {
  let items = loadAllItems();
  let promotions = loadPromotions();
  let formatedSelectedItems = formatInputFromStringToObject(selectedItems);
  let originalBill = buildOriginalBill(formatedSelectedItems,items);
  let bestPromotion = selectBestPromotion(originalBill,promotions);
  let finalBill = buildFinalBill(originalBill,bestPromotion);
  let result = printBill(finalBill);
  return result;
}

function formatInputFromStringToObject(selectedItems){
  let formatedSelectedItems = new Array();
  for(let itemStr of selectedItems){
    let object = {};
    let itemSplitArray = itemStr.split(" x ");
    object.id = itemSplitArray[0];
    object.quantity = parseInt(itemSplitArray[1]);
    formatedSelectedItems.push(object);
  }
  return formatedSelectedItems;
}

function buildOriginalBill(formatedSelectedItems,items){
  let itemDetails = new Array();
  let totalPrice = 0.00;
  for(let formatedSelectedItem of formatedSelectedItems){
    for(let item of items){
      if(formatedSelectedItem.id == item.id){
        // id,name,price,quantity,subtotalPrice
        let itemDetail = {}; 
        itemDetail.id = item.id;
        itemDetail.name = item.name;
        itemDetail.price = item.price;
        itemDetail.quantity = formatedSelectedItem.quantity;
        itemDetail.subtotalPrice = itemDetail.price * itemDetail.quantity;
        itemDetails.push(itemDetail);
        totalPrice += itemDetail.subtotalPrice;
      }
    }
  }  
  //itemDetails,totalPrice
  let originalBill = {};
  originalBill.itemDetails = itemDetails;
  originalBill.totalPrice = totalPrice;
  return originalBill
}

function selectBestPromotion(originalBill,promotions){
  let promotionFunctions = [usePromotionOver30minus6,usePromotionHalfPriceOfDesignatedItem];
  let bestPromotionInfo = {};
  bestPromotionInfo.isabled = false;
  bestPromotionInfo.description = '';
  bestPromotionInfo.discountedPrice = 0.0;
  for(let promotionFunction of promotionFunctions){
    let promotionInfo = promotionFunction(originalBill);
    if(promotionInfo.discountedPrice > bestPromotionInfo.discountedPrice){
      bestPromotionInfo.isabled = true;
      bestPromotionInfo.description = promotionInfo.description;
      bestPromotionInfo.discountedPrice = promotionInfo.discountedPrice;
    }
  }
  return bestPromotionInfo;
}

function usePromotionOver30minus6(originalBill){
  // isable,description,discountedPrice
  let promotionInfo = {};
  promotionInfo.description = '满30减6元';
  promotionInfo.isabled = false;
  promotionInfo.discountedPrice = 0.00;
  if(originalBill.totalPrice >= 30.00){
    promotionInfo.isabled = true;
    promotionInfo.discountedPrice = 6.00;
  }
  return promotionInfo;
}

function usePromotionHalfPriceOfDesignatedItem(originalBill){
  // isable,description,discountedPrice
  let promotionInfo = {};
  promotionInfo.description = '指定菜品半价(黄焖鸡，凉皮)';
  promotionInfo.isabled = false;
  promotionInfo.discountedPrice = 0.00;
  let halfPriceItemIds = ['ITEM0001','ITEM0022'];
  for(let itemDetail of originalBill.itemDetails){
    for(let halfPriceItemId of halfPriceItemIds){
      if(itemDetail.id === halfPriceItemId){
        promotionInfo.isabled = true;
        promotionInfo.discountedPrice += 0.5 * itemDetail.subtotalPrice;
      }
    }
  }
  return promotionInfo;
}

function buildFinalBill(originalBill,promotionInfo){
  let finalBill = {};
  finalBill.itemDetails = originalBill.itemDetails;
  finalBill.totalPrice = originalBill.totalPrice - promotionInfo.discountedPrice;
  if(promotionInfo.isabled == true){
    finalBill.promotionInfo = promotionInfo;
  }
  return finalBill;
}

function printBill(finalBill){
  outputString = '============= 订餐明细 =============\n';
  for(let itemDetail of finalBill.itemDetails){
    outputString += itemDetail.name + ' x '
    + itemDetail.quantity + ' = '
    + itemDetail.subtotalPrice + '元\n';
  }
  outputString += '-----------------------------------\n'
  if(finalBill.promotionInfo){
    outputString += '使用优惠:\n'
    outputString += finalBill.promotionInfo.description + '，省'
    + finalBill.promotionInfo.discountedPrice +'元\n';
    outputString += '-----------------------------------\n'
  }
  outputString += '总计：'+finalBill.totalPrice+'元\n';
  outputString += '===================================';
  return outputString;
}