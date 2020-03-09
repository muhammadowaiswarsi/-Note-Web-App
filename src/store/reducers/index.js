import { combineReducers } from 'redux'
import routeReducer from './RouteReducer'
import NoteReducer from './NoteReducer'

const rootReducer = combineReducers({
    routeReducer,
    NoteReducer
})

export default rootReducer