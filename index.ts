
import ari from "ari-client"
import { config } from "process"
//let ari = require("ari-client")
import * as confs from "./global/global-config"

export async function startService() {
    let config = await confs.getConfing()

    let client = await ari.connect(config.ariUrl, config.ariUserName, config.ariPassword)

    console.log("deneme")

    //let app = await client.applications.get({ applicationName: "Queue" })
    //let appList = app.subscribe

    let channel = await client.Channel()
    channel.on("StasisStart", function (event, channelInstance) {
        console.log(event, channelInstance)
    })

    channel.on('ChannelDtmfReceived', function (event, channelInstance) {
        console.log(event, channelInstance)

    });

    channel.on("ChannelCreated", function (event, channelInstance) {
        console.log(event, channelInstance)

    });
    channel.on("ChannelConnectedLine", function (event, channelInstance) {
        console.log(event, channelInstance)

    });
    channel.on("ChannelStateChange", function (event, channelInstance) {
        console.log(event, channelInstance)

    });



    console.log("elma")

}


//startService()

confs.getConfing().then(function (config) {
    ari.connect(config.ariUrl, config.ariUserName, config.ariPassword).then(function (client) {
        let channel = client.Channel()

        client.applications.list().then(function (list) {
            //console.log("app list", list)
        })
        client.asterisk.ping().then(function (val) {
            console.log("ping:", val)
        }).catch(function (err) {
            console.log("err:", err)
        })
        client.on('ChannelDtmfReceived', function (event, channelInstance) {
            console.log(event, channelInstance)

        });
        client.on("StasisStart", function (event, channelInstance) {
            console.log(event, channelInstance)

        });

        client.on("StasisEnd", function (event, channelInstance) {
            console.log(event, channelInstance)

        });

        client.on("ChannelCreated", function (event, channelInstance) {
            console.log(event, channelInstance)

        });
        client.on("ChannelConnectedLine", function (event, channelInstance) {
            console.log(event, channelInstance)

        });
        client.on("ChannelStateChange", function (event, channelInstance) {
            console.log(event, channelInstance)

        })
        console.log("basladi")
        client.start("channel-state", true)

    })
})