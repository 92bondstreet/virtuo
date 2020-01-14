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
  'carId': 'a9c1b91b-5e3d-4cec-a3cb-ef7eebb4892e' ,
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

//console.log(cars);
//console.log(rentals);
//console.log(actors);



/*STEP 1 : Euro-Kilometers*/
//rental price = time + distance

function RentalPrice(oneRent,PricePerDay,PricePerKm)
{
    var rentalDay= RentalDay(oneRent.pickupDate,oneRent.returnDate);
    return rentalDay*PricePerDay+ oneRent.distance*PricePerKm;
}
function Checkcars(cars,IDcar)
{
  var index =0;
  while(cars[index].id != IDcar)
  {
    index+=1;
  }
  return ([cars[index].pricePerDay,cars[index].pricePerKm])
}
function RentalDay(pickupDate,returnDate)
{

    var pickupD =pickupDate.split('-');
    // JavaScript counts months from 0:
    var mydate = new Date(pickupD[0], pickupD[1] - 1, pickupD[2]);

    var returnD =returnDate.split('-');
    var mydate2 = new Date(returnD[0], returnD[1] - 1, returnD[2]); 

    //var mydate = new Date(pickupDate,"yyyy-mm-dd");
    //var mydate2 = new Date(returnDate,"yyyy-mm-dd");

    //Différence en jours
    return mydate2.getDate()-mydate.getDate()+1;
}


//rent = index 
for (const rent in rentals)
{
  var prices = Checkcars(cars,rentals[rent].carId)
  rentals[rent].price=RentalPrice(rentals[rent],prices[0],prices[1]);
}



/*STEP 2 : Drive more, pay less

decreases by 10% after 1 day
decreases by 30% after 4 days
decreases by 50% after 10 days*/ 

function promo(oneRent)
{
  var numberOfDay = RentalDay(oneRent.pickupDate,oneRent.returnDate);
  
  if (numberOfDay>10)
  {
    return ((1-0.5)*oneRent.price );
  }
  if (numberOfDay>4)
  {
    return (  (1-0.3)*oneRent.price) ;
  }
  if (numberOfDay>1)
  {
    return ( (1-0.1)*oneRent.price) ;
  }
  return (oneRent.price);
  

}
for (const rent in rentals)
{
  rentals[rent].price = promo(rentals[rent]);
}

/*STEP 3 : Commission

There is a 30% commission on the rental price to cover the costs.

    insurance: half of commission
    the Treasury: 1€ by day
    Virtuo: the rest
 */
console.log(rentals);
function commission(rentalprice,numberOfDay)
{
  var comm = 0.3*rentalprice;

  return ([0.5*comm,numberOfDay,comm-0.5*comm-numberOfDay])
}

for (const rent in rentals)
{
 var numberOfDay = RentalDay(rentals[rent].pickupDate,rentals[rent].returnDate);
 var comms = commission(rentals[rent].price,numberOfDay)
 rentals[rent].commission.insurance = comms[0];
 rentals[rent].commission.treasury = comms[1];
 rentals[rent].commission.virtuo = comms[2];
}


/*STEP 4 : The famous deductible
 */
function Deductible(numberOfDay)
{
  return 4*numberOfDay
}
for (const rent in rentals)
{
 if(rentals[rent].options.deductibleReduction)
 {
   //treasury parts = number of rental days 
   var option = Deductible(rentals[rent].commission.treasury);
   rentals[rent].commission.virtuo+= option ;
   //Add option to the global bill
   rentals[rent].price+= option ;
  }
}

console.log(rentals);

/*STEP 5 : Pay the actors
 */
function BillPartner(Globalbill,numberOfDay)
{
  //Partner recives 0.7 of the rental price (don't forget to substract option)
  var bill = (Globalbill - Deductible(numberOfDay))*0.7;
  return bill;
}
for (const rent in actors)
{
  actors[rent].payment[0].amount=rentals[rent].price;
  actors[rent].payment[1].amount=BillPartner(rentals[rent].price,rentals[rent].commission.treasury);
  actors[rent].payment[2].amount=rentals[rent].commission.insurance;
  actors[rent].payment[3].amount=rentals[rent].commission.treasury;
  actors[rent].payment[4].amount=rentals[rent].commission.virtuo;
  console.log(actors[rent].payment);

}


