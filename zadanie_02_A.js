db = db.getSiblingDB('nbd');

printjson(db.people.aggregate(
		[
			{
				$unwind: "$credit"
			},
			{
				$group: {
					_id: "$credit.currency",
					balance: { $sum: { $toDouble: "$credit.balance" } }
				}
			}
		]
	).toArray()
);