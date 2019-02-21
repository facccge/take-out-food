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
  let originalBill = new Array();
  for(let formatedSelectedItem of formatedSelectedItems){
    for(let item of items){
      if(formatedSelectedItem.id == item.id){
        let itemDetail = {};
        itemDetail.id = item.id;
        itemDetail.name = item.name;
        itemDetail.price = item.price;
        itemDetail.quantity = formatedSelectedItem.quantity;
        itemDetail.subtotal = itemDetail.price * itemDetail.quantity;
        originalBill.push(itemDetail);
      }
    }
  }  
  return originalBill
}
