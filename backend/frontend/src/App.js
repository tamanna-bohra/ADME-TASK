import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);
  const [branches, setBranches] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBanks, setShowBanks] = useState(false);

  const fetchBanks = () => {
    if (showBanks) {
      setShowBanks(false);
      return;
    }
    axios.get('http://localhost:8000/api/banks')
      .then(response => {
        console.log('Banks data:', response.data); // Logging the banks data
        setBanks(response.data);
        setShowBanks(true);
      })
      .catch(error => {
        console.error("There was an error fetching the bank list!", error);
        setShowBanks(false);
        alert('Error fetching banks');
      });
      
      
  };

  const fetchBranches = (bankId) => {
    axios.get(`http://localhost:8000/api/branches/${bankId}`)
      .then(response => {
        console.log('Response data:', response.data);
        setSelectedBank(bankId);
        setBranches(response.data);
      })
      .catch(error => {
        console.error(`There was an error fetching the branches for bank ID ${bankId}!`, error);
        setSelectedBank(null);
        setBranches([]);
        alert('Bank not found');
      });
  };

  const handleSearch = () => {
    if (searchQuery) {
      fetchBranches(searchQuery);
    } else {
      alert('Please enter a bank ID');
    }
  };

  return (
    <div className="App">
      <h1>Bank List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter Bank ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {selectedBank && (
        <div>
          <h2>Branches of Bank ID: {selectedBank}</h2>
          <ul>
            {branches.length > 0 ? (
              branches.map((branch, index) => (
               <div>
                <li key={index}>{branch.branch}</li>
                </div>
              ))
            ) : (
              <p>No branches found for this bank.</p>
            )}
          </ul>
        </div>
      )}

      {/* <div>
        <button className='view' onClick={fetchBanks}>View All Banks</button>
        {showBanks && (
          <div>
            <h2>All Banks</h2>
            <ul>
              {banks.length > 0 ? (
                banks.map((bank, index) => (<div>
                  <li key={index}>
                    {bank.bank_name} (ID: {bank.bank_id})
                  </li>
                  
                  </div>
                ))
              ) : (
                <p>No banks found.</p>
              )}
            </ul>
         
          </div>
        )}
      </div> */}
       <div>
        <button className='view' onClick={fetchBanks}>
          {showBanks ? 'Close Banks' : 'View All Banks'}
        </button>
        {showBanks && (
          <div>
            <h2>All Banks</h2>
            <ul>
              {banks.length > 0 ? (
                banks.map((bank, index) => (
                  <li key={index}>
                    {bank.bank_name} (ID: {bank.bank_id})
                  </li>
                ))
              ) : (
                <p>No banks found.</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [selectedBank, setSelectedBank] = useState(null);
//   const [branches, setBranches] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   const fetchBranches = (bankId) => {
//     axios.get(`http://localhost:8000/api/branches/${bankId}`)
//       .then(response => {
//         console.log('Response data:', response.data);
//         setSelectedBank(bankId);
//         setBranches(response.data);
//       })
//       .catch(error => {
//         console.error(`There was an error fetching the branches for bank ID ${bankId}!`, error);
//         setSelectedBank(null);
//         setBranches([]);
//         alert('Bank not found');
//       });
//   };

//   const handleSearch = () => {
//     if (searchQuery) {
//       fetchBranches(searchQuery);
//     } else {
//       alert('Please enter a bank ID');
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Bank List</h1>
      // <div>
      //   <input
      //     type="text"
      //     placeholder="Enter Bank ID"
      //     value={searchQuery}
      //     onChange={(e) => setSearchQuery(e.target.value)}
      //   />
      //   <button onClick={handleSearch}>Search</button>
      // </div>

      // {selectedBank && (
      //   <div>
      //     <h2>Branches of Bank ID: {selectedBank}</h2>
      //     <ul>
      //       {branches.length > 0 ? (
      //         branches.map((branch, index) => (
      //          <div>
      //           <li key={index}>{branch.branch}</li>
      //           </div>
      //         ))
      //       ) : (
      //         <p>No branches found for this bank.</p>
      //       )}
      //     </ul>
      //   </div>
      // )}
//     </div>
//   );
// }

// export default App;
