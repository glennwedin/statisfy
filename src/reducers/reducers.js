import { 
	REQUEST_STATS,
	RECEIVE_STATS
} from "../actions/actions.js";
import { combineReducers } from 'redux';


function stats(state = {
	isFetching: false,
	didInvalidate: false,
	userstats: []
}, action) {
	switch(action.type) {
		case REQUEST_STATS:
			return Object.assign({}, state, { 
				isFetching: true, 
				didInvalidate: false 
			});
		case RECEIVE_STATS:
			console.log(action)
			return Object.assign({}, state, {
				isFetching: false,
				didInvalidate: false,
				userstats: action.userstats,
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





