const request = require('request');

module.exports = function findFacebookId(name, token) {
  return new Promise((resolve, reject) => {
    let type = 'user';
    if (token) {
      type = 'group';
    }
    if (!name) {
      reject('Invalid url');
      return;
    }
    let url;
    switch (type) {
      case 'user':
      case 'page':
        url = `https://www.facebook.com/${name}`;
        break;
      case 'group':
        url = `https://graph.facebook.com/v2.8/search?q=${name}&type=group&access_token=${token}`;
        break;
      default:
        reject('Invalid type');
        return;
    }
    request({
      method: 'GET',
      uri: url,
      headers: {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',
      },
    }, (err, res, body) => {
      if (err) {
        reject(err);
      } else if (res.statusCode === 200) {
        if (type === 'group') {
          try {
            body = JSON.parse(body); // eslint-disable-line
          } catch (parseError) {
            reject('Error when parsing json response');
            return;
          }
          if (body.data.length > 0) {
            resolve(body.data[0].id);
            return;
          }
        } else {
          const arrMatches = body.match(/entity_id":"\d*/i);
          if (arrMatches && arrMatches.length > 0) {
            const id = arrMatches[0].split('"').pop();
            resolve(id);
            return;
          }
        }
        reject(`Id not found for ${name}`);
      } else {
        const error = new Error(`${res.statusCode}: id not found for ${name}`);
        error.statusCode = res.statusCode;
        error.body = body;
        if (type === 'group') {
          try {
            body = JSON.parse(body); // eslint-disable-line
          } catch (parseError) {
            reject('Error when parsing json response');
            return;
          }
          reject(body.error.message);
        } else {
          reject(error);
        }
      }
    });
  });
};
