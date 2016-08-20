require('should');
var Persistency = require('../src/persistency-module');

describe('persistencyModule test', () => {

	it('should insert mock documents and remove them using the ids', () => {
		let mockFlights = [{
			"from": "LIS",
			"to": "PAR",
			"airline": "Iberia, Vueling Airlines",
			"stops": 1,
			"test": true,
			"time": {
				"date": "21-08-2016",
				"departure": "17:15",
				"duration": "15h 45m",
				"queried": "2016-08-19T14:16:55.505Z"
			},
			"price": {
				"amount": "277",
				"currency": "USD"
			}
		}, {
			"from": "LIS",
			"to": "PAR",
			"airline": "Ryanair",
			"stops": 0,
			"test": true,
			"time": {
				"date": "21-08-2016",
				"departure": "06:40",
				"duration": "2h 30m",
				"queried": "2016-08-19T14:16:55.505Z"
			},
			"price": {
				"amount": "324",
				"currency": "USD"
			}
		}];
		let persistFlightPromise = Persistency.insertFlights(mockFlights);
		let ids;
		let removeFlightPromise = persistFlightPromise.then((idsArray) => {
			ids = idsArray;
			(idsArray.length).should.be.exactly(2);
			return Persistency.removeFlights(idsArray);
		});
		return removeFlightPromise.then((deleted) => {
			(deleted).should.be.exactly(ids.length).which.is.a.Number();
		});
	});

	it('should retrieve [] if there is no data to insert', () => {
		let persistencyPromise = Persistency.insertFlights([]);
		return persistencyPromise.then((result) => {
			result.length.should.be.exactly(0);
		});
	});

});