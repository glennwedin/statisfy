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
* Fetch stats for user	
*/

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