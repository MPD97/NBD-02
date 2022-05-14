db = db.getSiblingDB('nbd');

printjson(db.people.aggregate(
		[
			{
				$unwind: "$job"
			},
			{
				$group: {
					_id: "$job"
				}
			}
		]
	).toArray()
);