import LocalDatabase from '../data/LocalDatabase';
import fetch from 'isomorphic-fetch';

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

export function getTopArtists(user) {
	return function (dispatch) {
		//Dispatch building indexes notification
		dispatch(requestStats(user))

		let page = 1,
		total = 1,
		result = [];


		let db = new LocalDatabase();
		db.open(user).then(() => {

			let recursive = () => {
				fetch('http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user='+user+'&limit=200&page='+page+'&api_key=484711f72a2c24bf969ab0e30abe3d6a&format=json')
				.then(response => response.json())
				.then(json => {
					total = json.topartists['@attr'].totalPages;
					result = result.concat(json.topartists.artist);
					if(page < total) {
						page++;
						recursive();
					} else {
						db.add('artists', result);
						db.close();
						dispatch(receiveTopArtists(user, result))
						//console.log(result)
					}
				}).catch(err => {
					console.log(err);
				})
			}

			//request data from localdb and dispatch
			db.get(user).then((result) => {
				if(result.length > 0) {
					console.log('res', user, result.length)
					db.close();
					dispatch(receiveTopArtists(user, result))
				} else{
					console.log('kjør recursive')
					recursive();
				}
			});
			
			//or fetch and insert
			
		});
	}
}


export function resetTopArtists(user) {
	return function (dispatch) {
		window.indexedDB.deleteDatabase('artists');
		dispatch(getTopArtists(user));
	}
}



/**
*	Fetch friends
*/
export const REQUEST_FRIENDS = 'REQUEST_FRIENDS'
function requestFriends(user) {
  return {
    type: REQUEST_FRIENDS,
    user
  }
}

//deprecated ?
export const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS'
function receiveFriends(user, json) {
  return {
    type: RECEIVE_FRIENDS,
    user,
    friends: json,
    receivedAt: Date.now()
  }
}


export function getFriends(user) {
	return function (dispatch) {
		dispatch(requestFriends(user));
		fetch('http://ws.audioscrobbler.com/2.0/?method=user.getfriends&user='+user+'&api_key=484711f72a2c24bf969ab0e30abe3d6a&format=json')
		.then(response => response.json())
		.then(json => {
			console.log(json.friends.user)
			dispatch(receiveFriends(user, json.friends.user));
		}).catch(err => {
			console.log(err);
		})
	}
}