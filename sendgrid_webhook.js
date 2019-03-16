const localtunnel = require('localtunnel');

localtunnel(5000, { subdomain: 'gsdiosdnjz' }, (err, tunnel) => {
  console.log('LT running');
});
