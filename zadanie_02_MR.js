db = db.getSiblingDB('nbd');

printjson(
	db.people.mapReduce(
		function(){ 
			for (var idx = 0; idx < this.credit.length; idx++) {
				var credit = this.credit[idx];
				emit(credit.currency, parseFloat(credit.balance));
			}
		},
		function(currency, values) {
			var reducedValues = {
				balance: 0.0
			};
			
			for (var idx = 0; idx < values.length; idx++) {
			   reducedValues.balance += values[idx];
			}
			
			return reducedValues;
		},
		{out: {inline: 1}}
	)
);