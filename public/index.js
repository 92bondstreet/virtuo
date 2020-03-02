'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

//Sum of the kmPrice and the dailyPrice
function rentalPrice(rental) {
  var dailyPriceAndDuration = getDailyPrice(rental);
  var totalRentalPrice =   dailyPriceAndDuration[0] + getKmPrice(rental);
  if (dailyPriceAndDuration[1] >= 1 && dailyPriceAndDuration[1] < 4) {
    totalRentalPrice -= totalRentalPrice / 10;
  } else if (dailyPriceAndDuration[1] >= 4 && dailyPriceAndDuration[1] < 10) {
    totalRentalPrice -= totalRentalPrice * 30 / 100;
  } else if (dailyPriceAndDuration[1] <= 10) {
    totalRentalPrice -= totalRentalPrice * 50 / 100;
  }
  return totalRentalPrice;
};

///We get the km/daily price of a car
///The boolean allows us to do one function for either the km or the daily
function getCarPrice(id, km) {
  var result;
  for (let i = 0; i < cars.length; i++) {
    if (cars[i].id == id) {
      if (km) {
        result = cars[i].pricePerKm;
      } else {
        result = cars[i].pricePerDay;
      }
    }
  }
  return result;
};

///We get the price for the duration of the rental
///For the part2 we return also the duration in order to avoid the same computation twice
function getDailyPrice(rental) {
  var pickupDate = new Date(rental.pickupDate);
  var returnDate = new Date(rental.returnDate);
  var duration = returnDate.getTime() / 86400000 - pickupDate.getTime() / 86400000 + 1;
  var dailyPrice = duration * getCarPrice(rental.carId, false)
  return [dailyPrice, duration];
};

///We get the price for the distance of the rental
function getKmPrice(rental) {
  var distance = rental.distance;
  var kmPrice = distance * getCarPrice(rental.carId, true);
  return kmPrice;
}

function showRentalPrice() {
  var result = [];
  for (let i = 0; i < rentals.length; i++) {
    let rentalCost = rentalPrice(rentals[i]);
    let json = {
      'idLocation': rentals[i].id,
      'driver': {
        'firstname': rentals[i].driver.firstName,
        'lastname': rentals[i].driver.lastName
      },
      'cost': rentalCost
    };
    result.push(json);
  }

  console.log(result);
}

showRentalPrice();