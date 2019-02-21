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
        // id,name,price,quantity,subtotal
        let itemDetail = {}; 
        itemDetail.id = item.id;
        itemDetail.name = item.name;
        itemDetail.price = item.price;
        itemDetail.quantity = formatedSelectedItem.quantity;
        itemDetail.subtotal = itemDetail.price * itemDetail.quantity;
        itemDetails.push(itemDetail);
        totalPrice += itemDetail.subtotal;
      }
    }
  }  
  let originalBill = {};
  originalBill.itemDetails = itemDetails;
  originalBill.totalPrice = totalPrice;
  return originalBill
}

