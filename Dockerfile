FROM raspbian/stretch

RUN apt-get update
RUN apt-get install -y --no-install-recommends \
        git \
        wget \
        wiringpi \
        make \
        g++ \
        python3 \
        python3-pip
RUN apt-get clean && \
    rm -r /var/lib/apt/lists/*
RUN wget -q https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-armv7l.tar.gz && \
    tar xf node-v12.18.3-linux-armv7l.tar.gz && \
    cp -R node-v12.18.3-linux-armv7l/* /usr/local/ && \
    rm -rf node-v12.18.3-linux-armv7l.tar.gz node-v12.18.3-linux-armv7l

WORKDIR /app
COPY package* ./
RUN npm ci --production
COPY . ./

ENV TUYA_ID=""
ENV TUYA_KEY=""
ENV RF_EMITTER_GPIO=""
ENV PLUG_ONCODE=""
ENV PLUG_OFFCODE=""

EXPOSE 6666/udp
EXPOSE 6667/udp
EXPOSE 6668/udp

ENTRYPOINT npm run start
