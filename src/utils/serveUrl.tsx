 const  serverURL = process.env.NODE_ENV === 'development' ?  'http://192.168.1.108:4000' : 'https://hammerhead-app-qoyr3.ondigitalocean.app';
 const  serverURLWS = process.env.NODE_ENV === 'development' ?  'ws://192.168.1.108:4000' : 'ws://hammerhead-app-qoyr3.ondigitalocean.app';
 const  serverImageKitAuth = process.env.NODE_ENV === 'development' ?  'http://192.168.1.113:4000/v1/authimagekit' : 'https://creo.red.up.railway.app/v1/authimagekit';
 export  { serverURL,serverURLWS,serverImageKitAuth};

 //