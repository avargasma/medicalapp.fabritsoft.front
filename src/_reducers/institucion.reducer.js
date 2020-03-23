import { institucionConstants } from '../_constants';

export function instituciones(state = {}, action) {
    switch (action.type) {
        case institucionConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case institucionConstants.GETALL_SUCCESS:
            return {
                items: action.instituciones
            };
        case institucionConstants.GETALL_FAILURE:
            return {
                error: action.instituciones
            };
        default:
            return state
    }
}