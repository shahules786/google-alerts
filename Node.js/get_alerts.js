
const alerts = require('google-alerts-api');
alerts.configure({
    mail: 'codelife345@gmail.com',
    password: 'shahules'
});


const { HOW_OFTEN, DELIVER_TO, HOW_MANY } = alerts;
 
alerts.configure({
    mail: 'codelife345@gmail.com',
    password: 'shahules'
});
 
alerts.sync((err) => {
    if(err) return console.log(err);
    const alertList = alerts.getAlerts();
    console.log(alertList);
    alertList.forEach(alert => printAlertInfo);
});
 
function printAlertInfo(alert){
    console.log('name:', alert.name);
    //'How Many' property information:
    if (alert.howMany === HOW_MANY.BEST) {
    	console.log('How many: Only the best results');
    } else if (alert.howMany === HOW_MANY.ALL) {
    	console.log('How many: All Results');
    }
}
