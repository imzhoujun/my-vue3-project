const db = uniCloud.database();

add(dbname, addObj) {
	db.collection(dbname)
		.add(addObj)
		.then((res: Response) => {
			resolve(res)
		})
		.catch((err: ErrorEvent) => {
			reject(err)
		})
}