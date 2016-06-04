let LocalDatabase = function (databasename, data) {
	this.data = data;
	this.db = window.indexedDB.open(databasename, 4);
	this.db.onerror = function (err) {
		console.log(err)
	}
	this.db.onsuccess = function () {
		console.log('Data inserted')
	}

	this.db.onupgradeneeded = (evt) => {
		var db = evt.target.result;

		var objectStore = db.createObjectStore("artists", { keyPath: "name" });
		// Create an index to search customers by name. We may have duplicates
		// so we can't use a unique index.
		objectStore.createIndex("name", "name", { unique: false });

		// Use transaction oncomplete to make sure the objectStore creation is 
		// finished before adding data into it.
		objectStore.transaction.oncomplete = (event) => {
		// Store values in the newly created objectStore.
			console.log('transaction complete')
			this.customerObjectStore = db.transaction("artists", "readwrite").objectStore("artists");
			for (var i in this.data) {
				//console.log(this.data[i]);
			    this.customerObjectStore.add(this.data[i]);
			}
		};
	}
}

export default LocalDatabase;