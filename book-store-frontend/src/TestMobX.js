import React from 'react'
import { action, autorun, computed, observable, reaction, remove, toJS, when } from 'mobx'

function TestMobX (props) {

  const items = observable([]);
  let cancelTracker = null;

  function trackerAvailability(name) {
    cancelTracker = when(
      () => {
        const item = items.find(x => x.name === name);
        return item ? item.quantity > 0: false;
      },
      () => {
        console.log(`${name} is now available`);
      }
    )
  }

  let addItem = action((name, quantity) => {
    const item = items.find(x => x.name === name);
    if(item){
      item.quantity += quantity;
    } else {
      items.push({name, quantity});
    }
  })

  addItem('Shoes', 0);
  trackerAvailability('Shoes');
  addItem('Shoes', 2);
  addItem('Shoes', 5);
  console.log(toJS(items)[0]);

  return (
    <div>AAA</div>
  )
}

export default TestMobX