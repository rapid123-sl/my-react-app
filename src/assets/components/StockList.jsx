import {useContext} from 'react';
import StockContext from './StockContext';
import './StockStyling.css';

function StockList() {
  const {stockData} = useContext(StockContext);

  return (
      <div className='list'>
        <h2>Stock List</h2>
        <ul>
          {stockData.map((stock, index) => (
            (stock.currentPrice !== null && stock.currentPrice !== undefined) ? (
            <li key={stock.symbol + index}>
              <h3>Symbol: {stock.symbol}</h3>
              <p>Quantity: {stock.quantity}</p>
              <p>Purchase Price: {stock.price}</p>
              <p>Current Price: {stock.currentPrice}</p>
              <h3 style={{color: ((stock.currentPrice*stock.quantity)-(stock.price*stock.quantity)) > 0 ? 'green' : 'red'}}>Profit/Loss: {
              ((stock.currentPrice*stock.quantity)-(stock.price*stock.quantity))
                }</h3>
            </li>
          ) : null
          ))}
        </ul>
        {stockData.length === 0 && <p>No stocks added yet.</p>}
  </div>
);
}

export default StockList