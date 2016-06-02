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
/*
export const RECEIVE_ALBUM_STATS = 'RECEIVE_STATS'
function receiveStats(user, json) {
  return {
    type: RECEIVE_ALBUM_STATS,
    user,
    albumstats: json,
    receivedAt: Date.now()
  }
}

export function getAlbumStats(user) {
	return function (dispatch) {
		dispatch(requestStats(user)) //Request

		//user
		return fetch('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=rj&api_key=484711f72a2c24bf969ab0e30abe3d6a&format=json')
			.then(response => response.json())
			.then(json => dispatch(receiveAlbumStats(user, json))
	  	).catch(err => {
			console.log(err)
		});
	}
}
*/

export function getStats(user) {
	return function (dispatch) {
		dispatch(requestStats(user)) //Request

		let statlist = ['user.gettoptracks', 'user.gettopalbums']

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
			dispatch(receiveStats(user, values));
		});
	}
}