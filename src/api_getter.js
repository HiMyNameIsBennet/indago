const Web3 = require('web3')
const web3 = new Web3('http://127.0.0.1:8545')
const fs = require('fs')
const path = require('path')

const GetBlockData = async () => {
    let tx_array = []
    const block_data = await web3.eth.getBlock("latest")
    for(tx of block_data.transactions){
        const tx_data = await web3.eth.getTransaction(tx)
        if(tx_data?.value !== '0' && !isNaN(tx_data?.value)) {
            tx_array.push(parseInt(tx_data?.value?.substr(0,7)))
        }
    }
    var max = Math.max.apply(Math, tx_array)
    var min = Math.min.apply(Math, tx_array)
    tx_array = tx_array.map(tx => (tx - min) * (0.8 + 0.2) / (max - min) - 0.2)
    return tx_array.toString()
}

GetBlockData().then(data => {
    fs.writeFileSync('src/tx_stream.txt', data)
})
