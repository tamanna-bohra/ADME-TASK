const express = require('express');
const cors = require('cors');
const parse = require('csv-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8000;
import path from 'path';
import {fileURLToPath} from "url";

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

app.use(cors());

let data = [];

// Read and parse the CSV file
fs.createReadStream('./bank_branches.csv')
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', (row) => {
    let bank = data.find(b => b.bank_id === row.bank_id);

    if (!bank) {
      bank = {
        bank_id: row.bank_id,
        bank_name: row.bank_name,
        branches: []
      };
      data.push(bank);
    }

    bank.branches.push({
      ifsc: row.ifsc,
      branch: row.branch,
      address: row.address,
      city: row.city,
      district: row.district,
      state: row.state
    });
  })
  .on('end', () => {
    console.log('Finished parsing CSV data');
    // console.log(data);  // Debug: print the parsed data
  })
  .on('error', (error) => {
    console.log('Error reading CSV:', error.message);
  });

// Endpoint to get all banks
app.get('/api/banks', (req, res) => {
  const banks = data.map(bank => ({ bank_id: bank.bank_id, bank_name: bank.bank_name ,branches:bank.branches}));
  res.json(banks);
});

// Endpoint to get branches by bank ID
app.get('/api/branches/:bankId', (req, res) => {
  const bankId = req.params.bankId;
  // console.log(`Received request for bank ID: ${bankId}`);  // Debug log
  
  const bank = data.find((b) => String(b.bank_id) === bankId);
  // console.log(`Found bank: ${JSON.stringify(bank)}`);  // Debug log
  
  // Transforming bank into an array
  const banksArray = bank ? [bank] : [];
  
  if (banksArray.length === 0) {
    res.status(404).json({ message: 'Bank not found' });
  } else {
    res.json(banksArray[0].branches);
  }
});


  app.use(express.static(path.join(__dirname,'/client/build')));

  app.get('*',(req,res)=>
  res.sendFile(path.join(__dirname,'/client/build/index.html')));


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
