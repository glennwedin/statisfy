let LocalDatabase = function () {
	this.db = null;
}

LocalDatabase.prototype.open = function (databasename) {
	return new Promise((resolve) => {
		let request = indexedDB.open(databasename, 1);
		
		request.onerror = (err) => {
			console.log(err)
		}

		request.onsuccess = (e) => {
			console.log('opened');
			this.db = e.target.result;
			resolve(true);
		}

		request.onupgradeneeded = (e) => {
	        console.log ("Going to upgrade our DB");
	        this.db = e.target.result;
	        if(this.db.objectStoreNames.contains("artists")) {
	    	    this.db.deleteObjectStore("artists");
	        }
	        let store = this.db.createObjectStore("artists", {autoIncrement: true});

	        request.onfailure = this.onerror;
	        request.onerror = function(e) {
	        	console.error("Err:"+e);
	        }
	    }
    })
}

LocalDatabase.prototype.add = function (databasename, data) {
	//console.log('add', this.db)
	let trans = this.db.transaction(['artists'], 'readwrite');
	let objectStore = trans.objectStore("artists");

	data.forEach((d, i) => {
		console.log(d);
		let request = objectStore.put(d);
	    request.onsuccess = function(e) {
	    	console.log('data added');
	    };
	    request.onerror = function(e) {
	        console.error("Error Adding an item: ", e);
	    };
	});
}

LocalDatabase.prototype.get = function (databasename) {
	return new Promise((resolve) => {
		console.log(this.db)
		let finalResult = [];
		let trans = this.db.transaction(["artists"], "readwrite");
	    let store = trans.objectStore("artists");

	    let keyRange = IDBKeyRange.lowerBound(0);
	    let cursorRequest = store.openCursor(keyRange);

	    cursorRequest.onsuccess = function(e) {
	        var result = e.target.result;
	        if(!!result == false) {
	        	resolve(finalResult);
	        	return;
	        }
	        //console.log(result.value);
	        finalResult.push(result.value);
	    	result.continue();
	    };
	});
}

LocalDatabase.prototype.resetTopArtists = function () {
	window.indexedDB.deleteDatabase("artists");
	
}

export default LocalDatabase;