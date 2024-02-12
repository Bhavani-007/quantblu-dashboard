import React, { useState } from 'react';
import Data from './data.json'; 
import './new.css'
import red from './red.svg'
import green from './green.svg'
import Dropdown from './new-dropdown/CustomDropdown';


const Table = ({ data }) => {
  const getTextColorClass = (change) => {
    const numericChange = parseFloat(change);
    return numericChange > 0 ? 'green-text' : numericChange < 0 ? 'red-text' : '';
  };
  return (
    <div className="table">
      {data.map((item, index) => (
        <div key={index} className="table-row">
          <div className={`${getTextColorClass(item.CHANGE)} table-data`}>{item.NAME}</div>
          <div className='table-data' style={{ color: '#9095A0' }}>{item.CMP}</div>
          <div className='table-data' style={{ color: '#9095A0' }}>{item.CHANGE_PCT}</div>
          <div className={`${getTextColorClass(item.CHANGE)} table-data`}>
            <div>
              {item.CHANGE}
              {getTextColorClass(item.CHANGE) === 'green-text' ? (
                <img src={green} alt="Red SVG" style={{padding: '0px 2px 1px 4px'}}/>
              ) : (
                <img src={red} alt="Green SVG" style={{padding: '0px 2px 1px 4px'}}/>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};




const App = () => {
  const [activeTab, setActiveTab] = useState('Indices');
  const [selectedStock, setSelectedStock] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedStock(''); 
  };

  const handleStockChange = (e) => {
    setSelectedStock(e.target.value);
    setActiveTab('Stocks');
  };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];


  return (
    <div>
      
      
    <div className='dashboard'>
      <div className='content-wrapper'>
      <div className='navbar'>
        <button className= {`${activeTab === 'Indices' ? ('active-tab-button') : 'nav-button'}`} onClick={() => handleTabChange('Indices')}>Indices</button>
        
        <div className='select'>
        <select className= {`${activeTab === 'Stocks'  ? ('active-tab-button') : 'nav-button'} custom-select`} value={selectedStock} onChange={handleStockChange}>
          <option  value="" disabled>Stocks</option>
          <option  value="Nifty50">Nifty50</option>
          <option  value="NiftyNext50">NiftyNext50</option>
      </select>
      </div>

        <button className= {`${activeTab === 'Watchlist' ? ('active-tab-button') : 'nav-button'}`} onClick={() => handleTabChange('Watchlist')}>Watchlist</button>
      </div>
      <div className='table'>
        {activeTab === 'Indices' && <Table data={Data.Indices} />}
        {activeTab === 'Stocks' && selectedStock === 'Nifty50' && <Table data={Data.Nifty50} />}
        {activeTab === 'Stocks' && selectedStock === 'NiftyNext50' && <Table data={Data.NiftyNext50} />}
        {activeTab === 'Watchlist' && <Table data={Data.Watchlist} />}
      </div>
  </div>
  </div>
  
</div>
  );
};

export default App;
