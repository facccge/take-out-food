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

function buildOriginalBill(selectedItems,itemList){
  let originalBill = [];
  for(slectedItem in selectedItems){
    for(item in itemList){
      if(slectedItem.id == item.id){
        let itemDetail = {}
        itemDetail.id = selectedItems.name
        itemDetail.
        originalBill.add(itemDetail)
      }
    }
  }  
  return originalBill
}
