/**
 supreme.js
 author: Mykal Burris | <mykalburris@gmail.com>
 created: 21-Dec-2016
 updated: 21-Dec-2016
 version: 1
 */

const request = require('request').defaults({
    jar: true,
    rejectUnauthorized: false,
    followAllRedirects: true,
    headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
    }
});

var str, base_url, url, keys, handle;

function keyword_check (keyword){
    return str.toLowerCase().includes(keyword);
}

var seek = function (callback){
    console.log('Searching for '+ keys + '...');
    keys = keys.toLowerCase().split(' ');
    request({
        url: 'http://www.supremenewyork.com/mobile_stock.json',
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_0 like Mac OS X) AppleWebKit/602.1.38 (KHTML, like Gecko) Version/10.0 Mobile/14A300 Safari/602.1'
        }
    }, function (err, res, body) {
        if (!err && res.statusCode == 200){
            var json = JSON.parse(body);
            for (c in json.products_and_categories) {
                for (i in json.products_and_categories[c]) {
                    str = json.products_and_categories[c][i].name;

                    if (keys.every(keyword_check)) {
                        handle  = (json.products_and_categories[c][i].id);
                        console.log(str, handle);
                        return callback(str, handle)
                    }
                }
            }
        }  else {
                try {
                    console.log(res.statusCode);
                } catch (TypeError) {
                    console.log(err);
                }
            console.log('Item was not found');
            return callback(null);
        }

    })
};


module.exports = function (keywords, callback){
    keys = keywords;
    seek(function (name, handle){
        console.log('GETTING INVENTORY');
        console.log('http://www.supremenewyork.com/shop/' + handle + '.json');
        request({
            url: 'http://www.supremenewyork.com/shop/' + handle + '.json',
            method: 'GET'
        }, function (err, res, body) {
            if (!err && res.statusCode == 200) {
                var stock = [];
                var json = JSON.parse(body);
                var styles = json.styles;
                var total = 0;
                for (s in styles) {
                    var stock_level = json.styles[s].sizes;
                    var image = json.styles[s].mobile_zoomed_url_hi;
                    var color = json.styles[s].name;
                    var variant_total = 0;
                    for (sl in stock_level){
                        var pid = stock_level[sl].id;
                        var variant = stock_level[sl].name; // size
                        var qty = stock_level[sl].stock_level;

                        stock.push({
                            name: name,
                            variant: variant,
                            pid: pid,
                            qty: qty,
                            image: "http:" + image,
                            color: color
                        });

                        if (qty > 0) {
                            total += parseInt(qty);
                        }
                        variant_total += parseInt(qty);
                        // console.log(size + ' | ' + sku); // size
                        // console.log(qty);
                        // console.log();
                    }
                    // console.log('Variant Total: ' + variant_total);
                    // console.log('---------------------');
                }
                // console.log('Total: ' + total);
                // console.log(stock);
                callback(null, stock);
                // callback(null, _.keyBy(stock, 'variant'));
            } else {
                try {
                    console.log(res.statusCode);
                } catch (TypeError) {
                    console.log(err);
                }
               return callback(null);
            }

        });

    })
};

// get_stock('170331');
// get_stock('170318');
// seek('spider web');
