db = db.getSiblingDB('nbd');

printjson(db.people.aggregate({ 
			$group: {
				_id: "$sex",
				weight: { $avg: { $toDouble: "$weight" } },
				height: { $avg: { $toDouble: "$height" } }
			}
        }).toArray());