import axios from 'axios';
import MonetaryHelp from '../models/MonetaryHelp.js';


export const getDatastore = (row, start) => {
    var config = {
        method: 'get',
        url: `https://api.iatistandard.org/datastore/activity/iati_json?q=recipient_country_code:%20SD%20AND%20transaction_transaction_date_iso_date:%20%5B2018-01-01T00:00:00Z%20TO%20*%5D&sort=transaction_value%20asc&start=${start}&rows=${row}`,
        headers: { 
          'Cache-Control': 'no-cache', 
          'Ocp-Apim-Subscription-Key': process.env.OcpApimSubscriptionKey
        }
      };

      return axios(config)
      .then(response => response)
      .catch(function (error) {
        console.log(error);
      });
}

export const saveMonetaryHelp = async (transaction_date, amount, reporting_org, last_start, rows) => {
  try {
    const monetaryHelp = new MonetaryHelp({
      transaction_date,
      amount,
      reporting_org,
      last_start,
      rows
    })
    await monetaryHelp.save();
  } catch(error) {
    console.log(error)
  }
}
export const getLastStart = async () => {
  let lastMonetaryHelp = await MonetaryHelp.find().sort({ _id: -1 }).limit(1);
  return lastMonetaryHelp;
} 
export const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
}

export const getFormatedMonetaryHelp = async () => {
  let monetaryObject = {};
  let monetaryHelp = await MonetaryHelp.find().sort({ amount: -1 });

  
  await monetaryHelp.map(mh => {
    
    let date = new Date(mh.transaction_date);
    let year = date.getUTCFullYear()

    
    if(monetaryObject[year] === undefined){

      monetaryObject[year] = {}
      monetaryObject[year][mh.reporting_org] = mh.amount;

      
    } else {

      if(isKeyInUse(monetaryObject[year], mh.reporting_org)){
        monetaryObject[year][mh.reporting_org] += mh.amount;
      }else {
        monetaryObject[year][mh.reporting_org] = mh.amount;
      }
      
    }
    
  })
  return monetaryObject;
} 

export const isYearInRange = (totalYearsOfData, year) => {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - totalYearsOfData;

  return year >= minYear && year <= currentYear;
}

export const isKeyInUse = (obj, key) => {
  return obj.hasOwnProperty(key);
}