import {useState} from 'react';
import './StockStyling.css';
import StockContext from './StockContext';
import StockList from './StockList';

function StockForm() {
    const [userInput, setUserInput] = useState({symbol: '', quantity: '', price: '', currentPrice: ''});
    const [stockData, setStockData] = useState([]);
    const [error, setError] = useState(false);

    const handleSymbolChange = (event) => {
        setUserInput({...userInput, symbol: event.target.value});
    };
    
    const handleQuantityChange = (event) => {
        setUserInput({...userInput, quantity: event.target.value});
    };
    
    const handlePriceChange = (event) => {
        setUserInput({...userInput, price: event.target.value});
    };

    const handleClick = async () => {
        if (!error) {
        try {
            const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${userInput.symbol}&apikey=7YU3TWMFKRJUG6XM`)
            const data = await response.json()
            const apiPrice = data["Global Quote"]["05. price"]

            const updatedUserInput = {...userInput, currentPrice : apiPrice}
            setUserInput(updatedUserInput)
                
            setStockData([...stockData, updatedUserInput])
            console.log('Updated stock data:', updatedUserInput);
            setUserInput({symbol: '', quantity: '', price: '', currentPrice: ''})
            setError(false)
            }
            catch (error) { 
                console.error('Error fetching data', error);
                setError(true)
            }
        } else {
            console.info('Invalid stock symbol')
        } 
    };

    return (
        <div>
            <input 
                value={userInput.symbol}
                placeholder="Input Stock Symbol"
                className="stock-input"
                onChange={handleSymbolChange}
                >
            </input>
            <input 
                value={userInput.quantity}
                placeholder="Input Quantity"
                className="stock-input"
                onChange={handleQuantityChange}
                >
            </input>
            <input 
                value={userInput.price}
                placeholder="Input Purchase Price"
                className="stock-input"
                onChange={handlePriceChange}
                >
            </input>
            <button onClick={handleClick}>Add Stock</button>
            <StockContext.Provider value={{stockData, setStockData}}>
                <StockList />
            </StockContext.Provider>
        </div>
    )
}

export default StockForm