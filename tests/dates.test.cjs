const {makeServer,client,clone}=require('./test-support.cjs');const assert=require('assert');
(async()=>{
let n=0;function check(code,expected){const c=client(makeServer());assert.deepStrictEqual(c.get(code),expected);n++;}
check("thaiToday(new Date('2026-10-26T18:30:00Z'))",'2026-10-27');
check("thaiToday(new Date('2026-12-31T17:00:00Z'))",'2027-01-01');
check("dueDateInMonth('2028-02',31)",'2028-02-29');check("dueDateInMonth('2027-02',31)",'2027-02-28');
check("dueDateInMonth('2026-04',31)",'2026-04-30');
check("dueReminders('2026-12-30').filter(x=>x.status==='schedule').length",0);
const s=makeServer();s.data.creditCards[1].dueday=5;const c=client(s);
assert.equal(c.get("dueReminders('2026-12-30')[0].date"),'2027-01-05');n++;
s.data.monthlyExpenses[5]={id:5,name:'Bill',amount:100,month:'2026-10',dueday:31,targetType:'cc',targetId:1};c.root({val:()=>clone(s.data)});
c.run('requestMonthlyPayment(5)');assert.equal(s.queue.length,0);n++;
c.field('monthly-payment-date','2026-11-02');let p=c.run('confirmMonthlyPayment()');s.flush();await p;
assert.equal(s.data.creditCards[1].debt,900);assert.equal(Object.values(s.data.transactions)[0].monthKey,'2026-11');assert.equal(s.data.monthlyExpenses[5].payments['2026-10-5'].date,'2026-11-02');n++;
assert(c.get("dueReminders('2026-11-02')").some(x=>x.status==='paid'&&x.name==='Bill'));n++;
p=c.run('toggleMonthlyPaid(5)');s.flush();await p;assert.equal(s.data.creditCards[1].debt,1000);assert.equal(Object.keys(s.data.transactions).length,0);n++;
assert(c.get("dueReminders('2026-11-02')").some(x=>x.status==='overdue'&&x.diff===-2));n++;
c.run('requestMonthlyPayment(5)');c.field('monthly-payment-date','2026-02-30');await c.run('confirmMonthlyPayment()');assert.equal(s.queue.length,0);n++;
c.field('monthly-payment-date','2026-11-02');c.run('state.monthlyExpenses[0].amount=101');await c.run('confirmMonthlyPayment()');assert.equal(s.queue.length,0);n++;
const cash=makeServer();cash.data.monthlyExpenses[6]={id:6,name:'Rent',amount:40,month:'2026-10',dueday:1};const d=client(cash);d.run('requestMonthlyPayment(6)');d.field('monthly-payment-date','2026-11-03');p=d.run('confirmMonthlyPayment()');cash.flush();await p;assert.equal(Object.values(cash.data.transactions)[0].monthKey,'2026-11');n++;
console.log('ALL '+n+' DATE TESTS PASSED');
})().catch(e=>{console.error(e);process.exitCode=1;});
