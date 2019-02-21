describe('Take out food', function () {
  it('should generate best charge when best is 指定菜品半价', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"];
    let summary = String(bestCharge(inputs)).trim();
    let expected = `
============= 订餐明细 =============
黄焖鸡 x 1 = 18元
肉夹馍 x 2 = 12元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
指定菜品半价(黄焖鸡，凉皮)，省13元
-----------------------------------
总计：25元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when best is 满30减6元', function() {
    let inputs = ["ITEM0013 x 4", "ITEM0022 x 1"];
    let summary = String(bestCharge(inputs)).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
凉皮 x 1 = 8元
-----------------------------------
使用优惠:
满30减6元，省6元
-----------------------------------
总计：26元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

  it('should generate best charge when no promotion can be used', function() {
    let inputs = ["ITEM0013 x 4"];
    let summary = String(bestCharge(inputs)).trim();
    let expected = `
============= 订餐明细 =============
肉夹馍 x 4 = 24元
-----------------------------------
总计：24元
===================================`.trim();
    expect(summary).toEqual(expected)
  });

});

describe('Load all items', function () {
  it('should load all items when use loadAllItems() function', function() {
    let summary = loadAllItems();
    let expected = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00
    }, {
      id: 'ITEM0030',
      name: '冰锋',
      price: 2.00
    }];
    expect(summary).toEqual(expected)
  });
});

describe('Load promotions', function () {
  it('should load all promotions when use loadPromotions() function', function() {
    let summary = loadPromotions();
    let expected =[{
      type: '满30减6元'
    }, {
      type: '指定菜品半价',
      items: ['ITEM0001', 'ITEM0022']
    }];
    expect(summary).toEqual(expected)
  });
});

describe('Format input from string to object', function () {
  it('should format input(selectedItems) from string to object', function() {
    let inputs = ["ITEM0001 x 1", "ITEM0013 x 2", "ITEM0022 x 1"]
    let summary = formatInputFromStringToObject(inputs);
    let expected = [{
      id: 'ITEM0001',
      quantity: 1
    }, {
      id: 'ITEM0013',
      quantity: 2
    }, {
      id: 'ITEM0022',
      quantity: 1
    }];
    expect(summary).toEqual(expected)
  });
});

describe('Build original bill', function () {
  it('should build Original Bill by input of formatedSelectedItems and inputItems', function() {
    let formatedSelectedItems = [{
      id: 'ITEM0001',
      quantity: 1
    }, {
      id: 'ITEM0013',
      quantity: 2
    }, {
      id: 'ITEM0022',
      quantity: 1
    }];
    let items = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00
    }, {
      id: 'ITEM0030',
      name: '冰锋',
      price: 2.00
    }];
    let summary = buildOriginalBill(formatedSelectedItems,items);
    let expected = [{
      id: 'ITEM0001',
      name: '黄焖鸡',
      price: 18.00,
      quantity: 1,
      subtotal: 18.00
    }, {
      id: 'ITEM0013',
      name: '肉夹馍',
      price: 6.00,
      quantity: 2,
      subtotal: 12.00
    }, {
      id: 'ITEM0022',
      name: '凉皮',
      price: 8.00,
      quantity: 1,
      subtotal: 8.00
    }];
    expect(summary).toEqual(expected)
  });
});