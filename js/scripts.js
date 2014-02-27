var Purchase = {
  initialize: function(description, amount) {
    this.description = description;
    this.amount = amount;
  },
  create: function(description, amount) {
    var purchase = Object.create(Purchase);
    purchase.initialize(description, amount)
    return purchase;
  }
}

var Category = {
  all: [],
  createPurchase: function(description, amount) {
  var purchase = Purchase.create(description, amount);
  this.purchaseArray.push(purchase);
  },
  initialize: function(name) {
    this.name = name;
  },
  create: function(name) {
    var category = Object.create(Category);
    category.initialize(name);
    Category.all.push(category)
    category.purchaseArray = [];
    return category;
  },
  returnName: function() {
    return this.name;
  }

}

$(document).ready(function() {
  var currentCategory;

  $("form#category-form").submit(function(event){
    event.preventDefault();
    var inputtedCategory = $("input#new-category").val();

    var newCategory = Category.create(inputtedCategory);
    $("ul#category-id").append("<li class='categoryListItem'>" + newCategory.name + "</li>");
    currentCategory = newCategory;
    
    console.log(newCategory.purchaseArray);
    $(".categoryListItem").last().click(function() {
      currentCategory = newCategory;
      $("form#expense-form").show();
      $(".category-class").text(newCategory.name);
      $(".purchase-table").text("");
        currentCategory.purchaseArray.forEach(function(purchase) {
        $(".purchase-table").append('<tr><td>' + purchase.description + '</td><td>' + purchase.amount +'</td></tr>');
      });
    });

  this.reset();
  });

  $("form#expense-form").submit(function(event) {
    event.preventDefault();
    console.log(currentCategory);

    var inputtedDescription = $("input#new-description").val();
    var inputtedAmount = parseFloat($("input#new-amount").val());

    var newPurchase = Purchase.create(inputtedDescription, inputtedAmount);
    currentCategory.purchaseArray.push(newPurchase);

    console.log(currentCategory.purchaseArray);

    $(".purchase-table").text("");
    currentCategory.purchaseArray.forEach(function(purchase) {
      $(".purchase-table").append('<tr><td>' + purchase.description + '</td><td>' + purchase.amount +'</td></tr>');
    });

    this.reset();
    $('input#new-description').focus();

    });

});
