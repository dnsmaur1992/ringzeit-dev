import test from 'node:test';
import assert from 'node:assert/strict';
import { nextSessionStep } from '../src/core/session-progression.js';
const entry = (id,date,extra={}) => ({id,date,inputConfirmed:true,completed:true,minutes:40,rpe:4,tHi:6,
  progression:{eligible:true},difficulty:'easy',fast:{eligible:true,v:1,key:'k',level:0,basis:[]},...extra});
const decide = (entries,extra={}) => nextSessionStep({entries,key:'k',date:'2026-11-09',today:'2026-11-09',eligible:true,...extra});
const a=()=>entry('a','2026-11-02'), b=()=>entry('b','2026-11-05');

test('short loop: two distinct full easy sessions, not the first, enable one small step',()=>{
  assert.equal(decide([]).level,0);
  assert.equal(decide([a()]).level,0);
  assert.deepEqual(decide([a(),b()]),{level:1,basis:['a','b'],increased:true});
});
test('short loop: missing/right/hard/contradictory/incomplete feedback never supplies a second success',()=>{
  for(const patch of [{difficulty:undefined},{difficulty:'right'},{difficulty:'hard'},{rpe:8},
    {completed:false},{inputConfirmed:false},{minutes:0},{rpe:null},{progression:{eligible:false}},
    {fast:undefined},{fast:{eligible:true,v:1,key:'other',level:0}},{perf:[{effort:'hard'}]}]) {
    assert.equal(decide([a(),b(),entry('c','2026-11-06',patch)]).level,0,JSON.stringify(patch));
  }
});
test('short loop: same evidence is not compounded; two NEW easy sessions at the raised dose enable the second step only',()=>{
  const c=entry('c','2026-11-06',{fast:{eligible:true,v:1,key:'k',level:1,basis:['a','b']}});
  assert.equal(decide([a(),b(),c]).level,1);
  const d=entry('d','2026-11-07',{fast:{eligible:true,v:1,key:'k',level:1,basis:['a','b']}});
  assert.deepEqual(decide([a(),b(),c,d]),{level:2,basis:['c','d'],increased:true});
  const e=entry('e','2026-11-08',{fast:{eligible:true,v:1,key:'k',level:2,basis:['c','d']}});
  assert.equal(decide([c,d,e]).level,2);
  const right=entry('r','2026-11-08',{difficulty:'right',fast:{eligible:true,v:1,key:'k',level:1,basis:['a','b']}});
  assert.equal(decide([a(),b(),right]).level,1,'maintain, never add for about-right');
});
test('short loop: pause/recovery, future entries, duplicate dates, changed baseline and stale evidence do not increase',()=>{
  assert.equal(decide([a(),b()],{eligible:false}).level,0);
  assert.equal(decide([a(),b()],{key:'new-cycle'}).level,0);
  assert.equal(decide([a(),entry('b','2026-11-10')]).level,0);
  assert.equal(decide([a(),entry('b','2026-11-02')]).level,0);
  assert.equal(decide([entry('old','2026-10-01'),b()]).level,0);
  assert.equal(decide([a(),b()],{accepts:e=>e.id!=='b'}).level,0);
});

test('short loop: the two-raise cap covers the full cycle, even after a baseline change or a long gap',()=>{
  const old1=entry('old1','2026-10-13',{fast:{eligible:true,v:1,key:'old',cycle:'cycle',raised:true,level:1}});
  const old2=entry('old2','2026-10-16',{fast:{eligible:true,v:1,key:'old',cycle:'cycle',raised:true,level:2}});
  assert.equal(decide([old1,old2,a(),b()],{cycle:'cycle'}).level,0);
  assert.equal(decide([old1,a(),b()],{cycle:'cycle'}).level,1);
  assert.equal(decide([old1,old2,a(),b()],{cycle:'new-cycle'}).level,1);
});
