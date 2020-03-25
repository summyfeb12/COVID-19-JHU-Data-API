const gh = require('github-content');
const csv =require('csvtojson');

let strDate = (d) => {
   return  ((d.getMonth() > 8) ? (d.getMonth() + 1) : ('0' + (d.getMonth() + 1))) + '-' + ((d.getDate() > 9) ? d.getDate() : ('0' + d.getDate())) + '-' + d.getFullYear();
};

let GetDailyReportsFromJHU = async (dt) => {
    let GetFile = (date) =>{
        return new Promise(async (resolve,reject)=>{
            let  options = { owner: 'CSSEGISandData', repo: 'COVID-19',branch: 'master'};
            let  gc = new gh(options);
            gc.file('csse_covid_19_data/csse_covid_19_daily_reports/'+date+'.csv',async function(err, file) {
                if (err) return reject(err);
                const jsonArray = await csv().fromString(file.contents.toString());
                resolve(jsonArray);
            });   
        });
    } 
    if(dt==null){
        let d1 = new Date();
        let strDateToday = strDate(d1);
        let d2 = new Date();
        d2.setDate(d2.getDate()-1);
        let strDateYesterday = strDate(d2);
        let arr = await GetFile(strDateToday);
        if(arr.length!=0){
            return arr;
        }else{
            let arr2 = await GetFile(strDateYesterday);
            return arr2;
        }
    }else{
        let d1 = dt;
        let arr = await GetFile(d1);
        return arr;
    }
    
}

let GetTimeseriesFromJHU = async (t) => {
    let GetFile = (type) =>{
        return new Promise(async (resolve,reject)=>{
            let  options = { owner: 'CSSEGISandData', repo: 'COVID-19',branch: 'master'};
            let  gc = new gh(options);
            let  fName =  'csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_'+type+'.csv';
            console.log(fName);
            gc.file(fName,async function(err, file) {
                if (err) return reject(err);
                const jsonArray = await csv().fromString(file.contents.toString());
                resolve(jsonArray);
            });   
        });
    } 
    let arr = await GetFile(t);
    return arr;
}
exports.handler = async (event) => {
    console.log(event);
    let data = {}; 
    if(event.requestContext.http.method=='GET' && (event.requestContext.http.path=='/daily_reports/latest' || event.requestContext.http.path=='/daily_reports/latest/')){
       data =  await GetDailyReportsFromJHU();
    }else if(event.requestContext.http.method=='GET' && (event.requestContext.http.path=='/daily_reports/date')){
       let dateReq =  event.queryStringParameters.date;
       data =  await GetDailyReportsFromJHU(dateReq); 
    }else if(event.requestContext.http.method=='GET' && (event.requestContext.http.path=='/timeseries/confirmed' || event.requestContext.http.path=='/timeseries/confirmed/')){
       data =  await GetTimeseriesFromJHU('confirmed_global');
    }else if(event.requestContext.http.method=='GET' && (event.requestContext.http.path=='/timeseries/deaths' || event.requestContext.http.path=='/timeseries/deaths/')){
       data =  await GetTimeseriesFromJHU('deaths_global');
    } else{
        data =  await GetDailyReportsFromJHU();
    }
    const response = {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    return response;
};

