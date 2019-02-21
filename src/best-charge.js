function bestCharge(selectedItems) {
  let items = loadAllItems();
  let promotions = loadPromotions();
  let formatedSelectedItems = formatInputFromStringToObject(selectedItems);
  let originalBill = buildOriginalBill(selectedItems,items);
  let cheapestBill = selectBestPromotion(originalBill,promotions);
  let billViewModel = buildBillViewModel(cheapestBill);
  let result = printBill(billViewModel);
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

}

function usePromotionOver30minus6(originalBill){
  // isable,description,discountedPrice
  let promotionInfo = {};
  promotionInfo.description = '满30减6元，省6元';
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