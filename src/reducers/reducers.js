import { 
	REQUEST_STATS,
	RECEIVE_STATS,
	REQUEST_TOP_ARTISTS,
	RECEIVE_TOP_ARTISTS,
	SET_USER,
	REQUEST_FRIENDS,
	RECEIVE_FRIENDS
} from "../actions/actions.js";
import { combineReducers } from 'redux';


function stats(state = {
	isFetching: false,
	didInvalidate: false,
	userstats: [],
	topartiststats: []
}, action) {
	switch(action.type) {
		case REQUEST_STATS:
			return Object.assign({}, state, { 
				isFetching: true, 
				didInvalidate: false 
			});
		case RECEIVE_STATS:
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				userstats: action.userstats,
				lastUpdated: action.receivedAt
			});
		case REQUEST_TOP_ARTISTS:
			return Object.assign({}, state, { 
				isFetching: true, 
				didInvalidate: false 
			});
		case RECEIVE_TOP_ARTISTS:
		console.log(action.artiststats)
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				topartiststats: action.artiststats,
				lastUpdated: action.receivedAt
			});
		default: 
			return state;
	}
}

function user(state = {
	username: null,
	friends: null,
}, action) {
	switch(action.type) {
		case SET_USER:
			return Object.assign({}, state, {
				username: action.username
			});
		case REQUEST_FRIENDS:
			return Object.assign({}, state, { 
				isFetching: true, 
				didInvalidate: false 
			});
		case RECEIVE_FRIENDS: 
			return Object.assign({}, state, {
				friends: action.friends
			});
		default:
			return state;
	}
}

const MainAppReducer = combineReducers({
	stats,
	user
});

export default MainAppReducer;





