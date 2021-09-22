import React, { useState, useEffect } from 'react';
import api from '../src/services/api'
import Coin from './Components/Coin';
import './App.css'

function App() {

  const [coin, setCoin] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('coins/markets?vs_currency=brl&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(res => {
        setCoin(res.data);
        
      })
      .catch(err => {
        console.log(err)
      })
  },[]);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filterCoins = coin.filter(coin =>
    coin.name.toLowerCase().includes(search.toLocaleLowerCase())
    )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>

        <form>
          <input className="coin-input" type="text" placeholder="Search" onChange={handleChange}></input>
        </form>
      </div>
     {filterCoins.map(coin =>{
       return(
         <Coin 
         key={coin.id} 
         name={coin.name}  
         image={coin.image}
         symbol={coin.symbol}
         marketcap={coin.market_cap}
         price={coin.current_price}
         priceChange={coin.price_change_percentage_24h}
         volume={coin.total_volume}
         />
       )
     })}
    </div>
  );
}

export default App;
