import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

describe('auth reducer', () => {
  const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
  }

  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should store token upon login', () => {
    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-id'
    })).toEqual(updateObject(initialState, {
      token: 'some-token',
      userId: 'some-user-id'
    }));
  })
});
