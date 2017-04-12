const findFacebookId = require('./index.js');

test('should resolve facebook user', () =>
  findFacebookId('zuck').then((id) => {
    expect(id).toBe('4');
  }));

test('should resolve facebook page', () =>
  findFacebookId('laurentgarnierofficial').then((id) => {
    expect(id).toBe('273706360456');
  }));

test('should resolve facebook group', () =>
  findFacebookId('groupsatopenuniversity', 'token')
    .then(() => {
      throw new Error();
    })
    .catch((err) => {
      expect(err).toBe('Invalid OAuth access token.');
    }));

test('should pass error', () =>
  findFacebookId('404notexistonfacebook')
    .then(() => {
      throw new Error();
    })
    .catch((err) => {
      expect(err.message).toBe('404: id not found for 404notexistonfacebook');
      expect(err.statusCode).toBe(404);
    }));
