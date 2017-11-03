const alerts = require('google-alerts-api');

const { HOW_OFTEN, DELIVER_TO, HOW_MANY } = alerts;


alerts.configure({
    mail: 'codelife345@gmail.com',
    password: 'shahules'
});

alerts.sync(() => {
    const alertToCreate = {
    	howOften: HOW_OFTEN.AT_MOST_ONCE_A_DAY,
	sources: [],
        lang: 'en',
        name: 'java',
        region: 'IN',
        howMany: HOW_MANY.BEST,
        deliverTo: DELIVER_TO.RSS,
        deliverToData: ''
    };

    alerts.create(alertToCreate, (err, alert) => {
        console.log("alert: ",alert);
    });
});
