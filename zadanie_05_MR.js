db = db.getSiblingDB('nbd');

printjson(db.people.mapReduce(
		function() {
			for (var idx = 0; idx < this.credit.length; idx++) {
			   var credit = this.credit[idx];
			   emit(credit.currency, parseFloat(credit.balance));
			}
		},
		function(currency, balances) {
			var reducedVals = {
				sumBalance: 0.0,
				avgBalance: 0.0
			};
			for (var idx = 0; idx < balances.length; idx++) {
			   reducedVals.sumBalance += balances[idx];
			}
			reducedVals.avgBalance = reducedVals.sumBalance / balances.length;
			
            return reducedVals;
		},
		{
			out: { inline: 1 },
			query: { sex: "Female", nationality: "Poland" }
		}
	)
);