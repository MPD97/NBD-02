db = db.getSiblingDB('nbd');

printjson(
	db.people.mapReduce(
		function(){ 
			var value = {
				weight: parseFloat(this.weight),
				height: parseFloat(this.height)
			};
			emit(this.sex, value);
		},
		function(sex, values) {
			var reducedValues = {
				weight: 0.0,
				height: 0.0
			};
			
			for (var idx = 0; idx < values.length; idx++) {
			   reducedValues.weight += values[idx].weight;
			   reducedValues.height += values[idx].height;
			}
			
			reducedValues.weight = reducedValues.weight / values.length;
			reducedValues.height = reducedValues.height / values.length;

			return reducedValues;
		},
		{out: {inline: 1}}
	)
);

