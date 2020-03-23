import { institucionConstants } from '../_constants';
import { institucionService } from '../_services';
import { alertActions } from './';

export const institucionActions = {    
    register,
    getAll,
    getById
};

function register(institucion) {
    return dispatch => {
        dispatch(request(institucion));

        institucionService.register(institucion)
            .then(
                institucion => { 
                    dispatch(success());                   
                    dispatch(alertActions.success({message:'Inserción correcta', open: true}));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error({message:error.toString(), open: true}));
                }
            );
    };

    function request(institucion) { return { type: institucionConstants.REGISTER_REQUEST, institucion } }
    function success(institucion) { return { type: institucionConstants.REGISTER_SUCCESS, institucion } }
    function failure(error) { return { type: institucionConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());
        institucionService.getAll()
            .then(                
                instituciones => dispatch(success(instituciones)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: institucionConstants.GETALL_REQUEST } }
    function success(instituciones) { return { type: institucionConstants.GETALL_SUCCESS, instituciones } }
    function failure(error) { return { type: institucionConstants.GETALL_FAILURE, error } }
}

function getById() {
    return dispatch => {
        dispatch(request());

        institucionService.getById()
            .then(
                institucion => dispatch(success(institucion)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: institucionConstants.GETALL_REQUEST } }
    function success(institucion) { return { type: institucionConstants.GETALL_SUCCESS, institucion } }
    function failure(error) { return { type: institucionConstants.GETALL_FAILURE, error } }
}