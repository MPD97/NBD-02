db = db.getSiblingDB('nbd');

printjson(
	db.people.mapReduce(
		function(){ 
			emit(this.job, null);
		},
		function(job, values) {
			return job;
		},
		{out: {inline: 1}}
	)
);