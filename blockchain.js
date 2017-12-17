const crypto = require('crypto');
const blocks = [];

module.exports = {
  add,
  init,
  list
}

function init(hash) {
  let data = 'In the beginning...';
  let seedHash = hash || '00001234';

  return add(data, seedHash);
}

function add(data, lastHash) {
  return hashData(data, lastHash)
          .then(function(hash){
            return blocks.push(hash);
          });
}

function hashData(data, lastHash) {
  let index = blocks.length;
  lastHash = (lastHash || list(-1, 1)).toString();
  let input = `${data}${Date.now()}${lastHash}${index}`;

  return new Promise(function(resolve, reject){
    calculateHash(0);

    function calculateHash(nonce) {
      let hash = crypto.createHmac('sha256', lastHash)
                  .update(input + nonce)
                  .digest('hex');

      if (hashIsValid(hash)) {
        console.log(nonce)
        return resolve(hash);
      }
      process.nextTick(function () {
         calculateHash(nonce + 1);
      });
    }
  });
}

function list(offset, items) {
  if (offset === undefined) {
    return blocks;
  }
  if (items === undefined) {
    return blocks.slice(offset)
  }
  return blocks.slice(offset, offset + items);
}

function hashIsValid(hash) {
  return hash.substring(0, 4) === '0000'; // Difficulty
}
