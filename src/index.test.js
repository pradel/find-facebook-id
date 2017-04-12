const findFacebookId = require('./index.js');

test('should resolve facebook user', () => {
  return findFacebookId('zuck').then((id) => {
    expect(id).toBe('4');
  });
});

test('should resolve facebook page', () => {
  return findFacebookId('laurentgarnierofficial').then((id) => {
    expect(id).toBe('273706360456');
  });
});

test('should pass error', () => {
  return findFacebookId('404notexistonfacebook').then(() => {
    throw new Error();
  }).catch((err) => {
    expect(err.message).toBe('404: id not found for 404notexistonfacebook');
    expect(err.statusCode).toBe(404);
  });
});
