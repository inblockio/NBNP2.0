let arg = require('yargs').argv;
let fs = require('fs');
let setGas = require('./util/set_gas');
let setContract = require('./util/set_contract');

if (!(arg.f && arg.t)) {
  throw('usage: truffle exec scripts/change_owner.js -f original_owner.txt -t address_to_change.txt');
}
module.exports = async function() {
  let gas = await setGas(web3);

  let from = fs.readFileSync(arg.f, 'utf8').trim().split('\n')[0];
  let to = fs.readFileSync(arg.t, 'utf8').trim().split('\n')[0];
  console.log('Changing ownership from ', from, ' to ', to);
  const conference = await setContract(artifacts, 'Conference');
  let owner = await conference.owner.call();
  console.log('owner', owner, from, owner === from)
  if (owner != from) {
    throw('current owner', owner, ' does not match with', from);
  }
  var result = await conference.transferOwnership(to, {from:from, gasPrice:gas})
  let new_owner = await conference.owner.call();
  if (new_owner != to) {
    throw('new owner', new_owner, ' does not match with', to);
  }
}
