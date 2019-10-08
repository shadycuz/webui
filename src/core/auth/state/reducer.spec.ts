import statusActions from 'core/status/state/actions';
import versionActions from 'core/version/state/actions';
import { StatusError } from 'utils/fetch';
import reducer from './reducer';
import actions from './actions';

describe('core/auth/state/reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {} as any)).toEqual({ loggedIn: false });
  });

  it('should login on LOGIN', () => {
    expect(reducer(undefined, actions.login.success())).toEqual({ loggedIn: true });
  });

  it('should login on GET_VERSION', () => {
    expect(
      reducer(
        undefined,
        versionActions.getVersion.success({
          apiVersion: '1.1.1',
          flexgetVersion: '1.1.1',
          latestVersion: '1.1.1',
        }),
      ),
    ).toEqual({ loggedIn: true });
  });

  it('should logout on LOGOUT', () => {
    expect(reducer({ loggedIn: true }, actions.logout.success())).toEqual({});
  });

  it('should logout on a 401 ERROR_STATUS', () => {
    expect(
      reducer(
        { loggedIn: true },
        statusActions.error('TEST', new StatusError('Unauthorized', 401)),
      ),
    ).toEqual({});
  });

  it('should stay logged In on a non 401 ERROR_STATUS', () => {
    expect(
      reducer({ loggedIn: true }, statusActions.error('TEST', new StatusError('Not Found', 404))),
    ).toEqual({
      loggedIn: true,
    });
  });
});