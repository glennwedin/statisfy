let LocalDatabase = function (databasename) {
	this.db = indexedDB.open(databasename, 1);
	this.db.onerror = function (err) {
		console.log(err)
	}
	this.db.onsuccess = function () {
		//console.log('Data inserted')
	}

	this.db.onupgradeneeded = (evt) => {
		var db = evt.target.result;

		let objectStore = db.createObjectStore("artists", { autoIncrement: true });
		// Create an index to search customers by name. We may have duplicates
		// so we can't use a unique index.
		objectStore.createIndex("name", "name", { unique: false });

		// Use transaction oncomplete to make sure the objectStore creation is 
		// finished before adding data into it.
		objectStore.transaction.oncomplete = (event) => {
		// Store values in the newly created objectStore.
			console.log('transaction complete')
			objectStore = db.transaction("artists", "readwrite").objectStore("artists");
		};
	}
}

LocalDatabase.prototype.add = function (databasename, data) {
	let db = indexedDB.open(databasename, 1);
	for (var i in data) {
		console.log(data[i]);
		let transaction = db.transaction(['artists']);
	    let objectStore = transaction.objectStore("artists")
	    objectStore.add(data[i]).onsuccess = () => {
	    	console.log('Lagrer '+data[i].name);
	    };
	}
}

LocalDatabase.prototype.get = function (databasename) {
	let db = indexedDB.open(databasename, 1);
	return new Promise((resolve, reject) => {
		let transaction = db.transaction([databasename]);
		var objectStore = transaction.objectStore(databasename);
		var request = objectStore.get().onsuccess = function (event) {
			console.log('jmm')
			resolve(request.result);
		}
	})
}

LocalDatabase.prototype.resetTopArtists = function () {
	window.indexedDB.deleteDatabase("artists");
}


export default LocalDatabase;