const { time } = require('console');
var os = require('os');

const {InfluxDB} = require('@influxdata/influxdb-client')
const {Point} = require('@influxdata/influxdb-client')


// You can generate a Token from the "Tokens Tab" in the UI
const token = '7LkLnEkQfBXaCZNJNnEhcCqTiRrLrifZqr6R9nAU0sAJVXhajJQWxyca9Zdi7JPTK-uLmjbjRCRP-RU1vzS66Q=='
const org = 'hello'
const bucket = 'mybucket'

const client = new InfluxDB({url: 'http://localhost:8086', token: token})

const writeApi = client.getWriteApi(org, bucket)
writeApi.useDefaultTags({host: 'host1'})


setInterval( ()=>{
    const point = new Point('mem').floatField('used_percent', (os.freemem()/ os.totalmem() )*100)
    writeApi.writePoint(point)

    console.log( (os.freemem()/ os.totalmem() )*100)
}, 1000)    

