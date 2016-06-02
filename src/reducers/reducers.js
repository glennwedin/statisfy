import { 
	REQUEST_STATS,
	RECEIVE_STATS,
	REQUEST_TOP_ARTISTS,
	RECEIVE_TOP_ARTISTS
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

const MainAppReducer = combineReducers({
	stats
});

export default MainAppReducer;





