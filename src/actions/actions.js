import LocalDatabase from '../data/LocalDatabase';

/*
	Set USER
*/
export const SET_USER = 'SET_USER'
export function setUser(username) {
	return {
		type: SET_USER,
		username
	}
}

/*
* Fetch stats for user	
*/

export const REQUEST_STATS = 'REQUEST_STATS'
function requestStats(user) {
  return {
    type: REQUEST_STATS,
    user
  }
}

export const RECEIVE_STATS = 'RECEIVE_STATS'
function receiveStats(user, json) {
  return {
    type: RECEIVE_STATS,
    user,
    userstats: json,
    receivedAt: Date.now()
  }
}

export function getStats(user) {
	return function (dispatch) {
		dispatch(requestStats(user))

		//List which endpoints to fetch
		let statlist = ['user.gettoptracks', 'user.gettopalbums', 'user.getrecenttracks']

		let promises = statlist.map((type) => {
			return new Promise((resolve) => {
				fetch('http://ws.audioscrobbler.com/2.0/?method='+type+'&user='+user+'&api_key=484711f72a2c24bf969ab0e30abe3d6a&format=json')
					.then(response => response.json())
					.then(json => {
						resolve(json)
					}
			  	).catch(err => {
					console.log(err)
				});
			})
		})	

		Promise.all(promises).then((values) => {
			let data = {
				toptracks: values[0].toptracks,
				topalbums: values[1].topalbums,
				recenttracks: values[2].recenttracks,
			}
			dispatch(receiveStats(user, data));
		});
	}
}

/*
*	Fetch top artists with pagination
*/

export const REQUEST_TOP_ARTISTS = 'REQUEST_TOP_ARTISTS'
function requestTopArtists(user) {
  return {
    type: REQUEST_TOP_ARTISTS,
    user
  }
}

//deprecated ?
export const RECEIVE_TOP_ARTISTS = 'RECEIVE_TOP_ARTISTS'
function receiveTopArtists(user, json) {
  return {
    type: RECEIVE_TOP_ARTISTS,
    user,
    artiststats: json,
    receivedAt: Date.now()
  }
}

//Deprecated
/*
export function getTopArtists(user, count, page) {
	return function (dispatch) {
		dispatch(requestTopArtists(user))
		return fetch('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+user+'&limit='+count+'&page='+page+'&api_key=484711f72a2c24bf969ab0e30abe3d6a&format=json')
			.then(response => response.json())
			.then(json => {
				new LocalDatabase('artists', json);
				dispatch(receiveTopArtists(user, json.topartists))
			}).catch(err => {
			console.log(err)
		});
	}
}
*/

export function getTopArtists(user) {
	let db = new LocalDatabase('artists');
	return function (dispatch) {
		let page = 1,
		total = 1,
		result = [];

		let recursive = () => {
			fetch('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+user+'&limit=200&page='+page+'&api_key=484711f72a2c24bf969ab0e30abe3d6a&format=json')
			.then(response => response.json())
			.then(json => {
				total = json.topartists['@attr'].totalPages;
				result = result.concat(json.topartists.artist);
				if(page < total && page < 2) { //FIKS
					page++;
					recursive();
				} else {
					db.add(result);
					//dispatch(receiveTopArtists(user, json.topartists))
					//console.log(result)
				}
			}).catch(err => {
				console.log(err);
			})
		}

		//request data from localdb

		//or fetch and insert
		recursive();

	}
}

/*
export function getFriends(user) {
	return function (dispatch) {
		fetch('http://ws.audioscrobbler.com/2.0/?method=user.getfriends&user='+user+'&api_key=484711f72a2c24bf969ab0e30abe3d6a&format=json')
		.then(response => response.json())
		.then(json => {

		}).catch(err => {
			console.log(err);
		})
	}
}
*/