
db = db.getSiblingDB('nbd');

printjson(db.people.mapReduce(
		function() {
			emit(this.nationality, parseFloat(this.weight) / Math.pow(parseFloat(this.height)/100, 2));
		},
		function(nationality, values) {
			var reducedVals = {
				minBMI: 0.0,
				avgBMI: 0.0,
				maxBMI: 0.0
			};
			for (var idx = 0; idx < values.length; idx++) {
			   reducedVals.avgBMI += values[idx];
			}
			reducedVals.avgBMI = reducedVals.avgBMI / values.length;
			reducedVals.minBMI = Math.min(...values);
			reducedVals.maxBMI = Math.max(...values);
			
            return reducedVals;
		},
		{
			out: { inline: 1 },
		}
	)
);