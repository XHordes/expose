const fetch = require("node-fetch")
const md5 = require("md5")
const fs = require("fs")

const checksum = fs.readFileSync("build/checksum", "utf-8")

fetch("https://hordes.io/client.js").then(r=>r.text()).then((script)=>{
    let newSum = md5(script) 
    if (newSum !== checksum) {
        //remove the enclosing function
        script = script.replace("!function(){", "")
        script = script.replace("}();")
        fs.writeFileSync("build/client.js", script)
    }
})