console.log("salam maqa");
tariffs = [];
tariffs[15] = ["1.11", "2.22", "3.33", "4.44", "4.44", "4.44"];
tariffs[16] = ["2", "2.5", "4", "5", "6.5", "6.5"];



function calculatePrice() {
    $("#count").css("background-color", "#fff");
    $("#width").css("background-color", "#fff");
    $("#length").css("background-color", "#fff");
    $("#height").css("background-color", "#fff");
    $("#wght").css("background-color", "#fff");
    var olke = $("#country").val();
    var uzunluq = $(".asa1").val();
    var weight_type = $("#weight").val();
    var city = 1;
    var count = $("#count").val();
    var w = $("#width").val();
    var l = $("#length").val();
    var h = $("#height").val();
    var wght = $("#wght").val();
    var iftrue = true;

    if (count == "") {
        iftrue = false;
        $("#count").css("background-color", "#ffffff38");
    } else if (l == "") {
        iftrue = false;
        $("#length").css("background-color", "#ffffff38");
    } else if (w == "") {
        iftrue = false;
        $("#width").css("background-color", "#ffffff38");
    } else if (h == "") {
        iftrue = false;
        $("#height").css("background-color", "#ffffff38");
    } else if (wght == "") {
        iftrue = false;
        $("#weight").css("background-color", "#ffffff38");
    }

    if (iftrue) {
        var ccc =
            w >= 100 || l >= 100 || h >= 100 ?
            volumetricweight(
                w * cmtoinch(uzunluq),
                l * cmtoinch(uzunluq),
                h * cmtoinch(uzunluq),
                wght * kgtolbs(weight_type)
            ) :
            wght;

        if (ccc > 0.5 && ccc <= 1) {
            // ccc = 1;
        }

        var price = tarifff(ccc, olke);
        sum = count * price;

        if ((w != 0 && l != 0 && h != 0) || (wght != 0 && count != 0)) {
            $("#totalPrice").text(sum.toFixed(2) + "$");
        } else {
            $("#totalPrice").text(0) + "$";
        }
    }
}

function tarifff(weight, country) {
    if (tariffs[country] != undefined) {
        if (country == 15) {
            if (weight > 0 && weight <= 0.25) {
                return tariffs[country]["0"];
            } else if (weight > 0.25 && weight <= 0.5) {
                return tariffs[country]["1"];
            } else if (weight > 0.5 && weight <= 0.75) {
                return tariffs[country]["2"];
            } else if (weight > 0.75 && weight <= 1) {
                return tariffs[country]["3"];
            } else if (weight > 1 && weight <= 5) {
                return weight * tariffs[country]["3"];
            } else {
                return weight * tariffs[country]["3"];
            }
        }

        if (country == 16) {
            if (weight >= 0 && weight <= 0.1) {
                return tariffs[country]["0"];
            } else if (weight > 0.1 && weight <= 0.25) {
                return tariffs[country]["1"];
            } else if (weight > 0.25 && weight <= 0.5) {
                return tariffs[country]["2"];
            } else if (weight > 0.5 && weight <= 0.75) {
                return tariffs[country]["3"];
            } else {
                return weight * 6.5;
            }
        }
    }
}

function volumetricweight(width, length, height, wght) {
    var v_w = (width * length * height) / 6000;
    if (v_w >= wght) {
        return v_w;
    } else {
        return wght;
    }
}

function cmtoinch(val) {
    if (val == "cm") {
        return 1;
    } else {
        return 2.54;
    }
}

function kgtolbs(val) {
    if (val == "kg") {
        return 1;
    } else {
        return 2.2;
    }
}

function calculateTotal(th) {
    var mbl = $(th).val();
    if (mbl > 9999) {
        // $(th).val() = substr($(th).val(),-1);
        $("#onlinePay").text(0 + " AZN");
        $("#cashPay").text(0 + " AZN");
        return false;
    }
    var cur = parseFloat(
        $("#country1").find("option:selected").attr("data-cur")
    );
    var percentage = mbl * cur;
    var azn = percentage + (percentage) / 100;
    var cash = percentage.toFixed(2);
    azn = azn.toFixed(2);
    $("#onlinePay").text(azn + " AZN");
    $("#cashPay").text(cash + " AZN");
}
console.log("maqa");
$(document).on('click', '.categories', function(e) {
    e.preventDefault();
    $(this).next().next().slideToggle();
})

$(document).on('click', '.category li a', function(e) {
    e.preventDefault();
    let category = $(this).attr('data-id');
    let products = $('.product-item');

    products.each(function() {
        if (category == $(this).attr('data-id')) {
            $(this).parent().fadeIn();
        } else {
            $(this).parent().hide();
        }
    })
    if (category == 'all') {
        products.parent().fadeIn();
    }
})