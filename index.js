const blockchain = require('./blockchain')

blockchain.init()
  .then(() => { return blockchain.add('First new block'); })
  .then(() => { return blockchain.add('I love blockchains'); })
  .then(() => { return blockchain.add('Make me a new hash!!'); })
  .then(() => {
    console.log(blockchain.list());
  });
