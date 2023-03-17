import { getDatastore, saveMonetaryHelp, getLastStart, isEmpty, getFormatedMonetaryHelp, isYearInRange } from '../functions/iati-api.js';


export const getMonetaryHelp = async (req, res) => {
    let totalYearsOfData = 5
    let row = 10;
    let start = 0;
    let lastMonetaryHelp = await getLastStart()

    if(!isEmpty(lastMonetaryHelp)){
        let lastStart = await getLastStart()
        let newStart = lastStart[0].last_start;
        start = parseInt(newStart) + parseInt(lastStart[0].rows)
    }
    const response = await getDatastore(row, start);
    for(let i = 0; i < response.data.response.docs.length; i++){
        let organization_name = response.data.response.docs[i].iati_json['iati-activity'][0]['reporting-org'][0]['narrative'][0]['text()']
        let totalAmountPerDate = {}
        for(let j = 0; j < response.data.response.docs[i].iati_json['iati-activity'][0]['transaction'].length; j++){
            let transaction_date = response.data.response.docs[i].iati_json['iati-activity'][0]['transaction'][j]['transaction-date'][0]['@iso-date']
            let amount = response.data.response.docs[i].iati_json['iati-activity'][0]['transaction'][j]['value'][0]['text()']
            let date = new Date(transaction_date);
            let year = date.getUTCFullYear()

            if(totalAmountPerDate[year] === undefined){
                //it does not exists
                if(parseInt(amount) > 0) {
                    totalAmountPerDate[year] = parseInt(amount)
                }
                
            }else {
                //it allready exists
                if(parseInt(amount) > 0) {
                    totalAmountPerDate[year] += parseInt(amount)
                }
                
                
            }
        }
        for(let theYear in totalAmountPerDate) {
            
            let yearIsInRange = await isYearInRange(totalYearsOfData, theYear)
            if(yearIsInRange){
                await saveMonetaryHelp(theYear, totalAmountPerDate[theYear], organization_name, start, row)
            }
            
        }
        
    }

        let formattedMonetary = await getFormatedMonetaryHelp()

        res.status(200).json(formattedMonetary)
}