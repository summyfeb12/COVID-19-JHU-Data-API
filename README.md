# COVID-19 JHU Data API
 JSON Wrapper API around the COVID-19 data from Johns Hopkins CSSE https://github.com/CSSEGISandData/COVID-19 ,which is an aggregated data source from multiple sources.This is the data that powers the very famous visualization: https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6. Data is maintained and distributed in a GitHub repository via csv files, the files are updated daily, for the end of the day updates and whenever there are changes to the data or there are any corrections.

# What does it do ?
 Who ever is building any applications, they have to update their app's csv whenever Johns Hopkins CSSE updates their repository, what I built is a an API endpoint that gets the file directly from JHU CSSE's Github and converts that csv into a json and serves it over REST API, whenever the request is made. I am not storing the data anywhere, not even caching the files because I want it to be up to date with JHU CSSE data whenever they chose to update the only components I am using are AWS API Gateway and AWS Lambda. I also attached the Lambda code in case you want to deploy it on your own aws account.

 My API makes it easy for people who are building client-side applications, not to worry about getting the latest data and instead focus on building the app/visualization of their choice.

# API URL 
 https://rlp60sprib.execute-api.us-east-1.amazonaws.com

 -- No API Key Required
 
 -- Allow Control Allow Origin: *  // header added in the response. 

# Endpoints 
 ## GET /daily_reports/latest 

    https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports

 ## GET /daily_reports/date?date=mm-dd-yyyy

    https://github.com/CSSEGISandData/COVID-19/tree/master/csse_covid_19_data/csse_covid_19_daily_reports

 ## GET /timeseries/confirmed

    https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv


 ## GET /timeseries/deaths

    https://github.com/CSSEGISandData/COVID-19/blob/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv


P.S. I throttled my AWS API Gateway limits, just to make sure I dont get a huge bill from AWS, please do not abuse this. Any pledges for AWS credits are welcome , wont use them unless I see a ridiculous bill.

# Thanks 
 Johns Hopkins CSSE - https://github.com/CSSEGISandData/COVID-19
 Github Content - https://github.com/doowb/github-content
 CSVTOJSON - https://github.com/Keyang/node-csvtojson
















