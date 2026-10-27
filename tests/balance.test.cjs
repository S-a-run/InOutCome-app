const {makeServer,client}=require('./test-support.cjs'),assert=require('assert');
const c=client(makeServer());let n=0;
function expect(code,want){assert.deepStrictEqual(c.get(code),want);n++;}
c.run(`state.transactions=[{id:1,type:'income',amount:28000,monthKey:'2026-05'},{id:2,type:'expense',amount:30000,monthKey:'2026-07'},{id:3,type:'income',amount:99999,monthKey:'2027-01'}]`);
expect('overviewTotals(2026,4)',{income:28000,expense:0,monthNet:28000,balance:28000});
expect('overviewTotals(2026,5)',{income:0,expense:0,monthNet:0,balance:28000});
expect('overviewTotals(2026,6)',{income:0,expense:30000,monthNet:-30000,balance:-2000});
expect('overviewTotals(2026,11).balance',-2000);
expect('overviewTotals(2027,0).balance',97999);
expect('overviewTotals(2026,3).balance',0);
expect('signedMoney(-2000)','−฿2,000');expect('signedMoney(2000)','฿2,000');expect('signedMoney(-0,true)','฿0');expect('signedMoney(10,true)','+฿10');expect('signedMoney(-10,true)','−฿10');
c.run(`state.transactions=[{type:'income',amount:0.1,monthKey:'2026-10'},{type:'income',amount:0.2,monthKey:'2026-10'},{type:'expense',amount:0.3,monthKey:'2026-10'}]`);
expect('overviewTotals(2026,9)',{income:0.3,expense:0.3,monthNet:0,balance:0});
c.run(`state.transactions=[{type:'expense',amount:45,monthKey:'2026-11',date:'2026-10-31'}]`);
expect('overviewTotals(2026,9).balance',0);expect('overviewTotals(2026,10).balance',-45);
const before=c.get('state.transactions');c.run('overviewTotals(2026,9);overviewTotals(2027,0)');assert.deepStrictEqual(c.get('state.transactions'),before);n++;
console.log('ALL '+n+' BALANCE TESTS PASSED');

