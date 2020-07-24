const TuyAPI = require('tuyapi');
const rpi433 = require('rpi-433-v2');
const { checkIfAllEnvironmentVariablesAreSet } = require('./utils');

checkIfAllEnvironmentVariablesAreSet([
    'TUYA_ID', 'TUYA_KEY', 'RF_EMITTER_GPIO', 'PLUG_ONCODE', 'PLUG_OFFCODE'
]);

const tuyaDevice = new TuyAPI({
    id: process.env.TUYA_ID,
    key: process.env.TUYA_KEY
});

const rfEmitter = rpi433.emitter({
    pin: process.env.RF_EMITTER_GPIO,
    pulseLength: 350
});

function lookupTuyaDevice() {
    console.log('Lookup tuya device!');
    tuyaDevice.find().then(() => {
        console.log('Found tuya device!');
        tuyaDevice.connect();
    }).catch(() => {
        console.log('Not found tuya device!');
        lookupTuyaDevice();
    });
}

lookupTuyaDevice();

tuyaDevice.on('connected', () => {
    console.log('Connected to tuya device!');
});

tuyaDevice.on('disconnected', () => {
    console.log('Disconnected from tuya device!');
});

tuyaDevice.on('error', (err) => {
    console.log('Error with tuya device!', err);
});

tuyaDevice.on('data', (data) => {
    console.log('Received data from tuya device!');

    if (data.dps.hasOwnProperty('1')) {
        if (data.dps['1']) {
            console.log('Tuya device is on, try to turn on the fan!');
            rfEmitter.sendCode(process.env.PLUG_ONCODE);
        } else {
            console.log('Tuya device is off, try to turn of the fan!');
            rfEmitter.sendCode(process.env.PLUG_OFFCODE);
        }
    }
});
