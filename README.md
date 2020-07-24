fan-sync
========
Sync my Clatronic tuya climate device with my 433mhz plug, to control the fan.

## Build
```
docker build \
    --tag fan-sync .
```

## Run
```
docker run \
    --name fan-sync \
    --device /dev/gpiomem:/dev/gpiomem \
    --env-file .dockerenv \
    -p 6666:6666/udp \
    -p 6667:6667/udp \
    -p 6668:6668/udp \
    -d \
    fan-sync
```

## Environment Variables
```
TUYA_ID=XXX
TUYA_KEY=XXX
RF_EMITTER_GPIO=XXX
PLUG_ONCODE=XXX
PLUG_OFFCODE=XXX
```
* TUYA_ID, TUYA_KEY: [setup guide](https://github.com/codetheweb/tuyapi/blob/master/docs/SETUP.md)
* PLUG_ONCODE, PLUG_OFFCODE: Your sniffed codes