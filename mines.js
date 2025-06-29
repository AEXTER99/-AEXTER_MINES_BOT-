const crypto = require('crypto');

function generateMines(serverSeed, clientSeed, nonce, mineCount) {
    const hmac = crypto.createHmac('sha256', serverSeed).update(`${clientSeed}:${nonce}`).digest('hex');
    let floats = [];
    for (let i = 0; i < hmac.length; i += 8) {
        const segment = hmac.slice(i, i + 8);
        const float = parseInt(segment, 16) / 0xffffffff;
        floats.push(float);
    }
    const sorted = floats.map((v, i) => ({ i, v })).sort((a, b) => a.v - b.v);
    return sorted.slice(0, mineCount).map(obj => obj.i);
}

module.exports = { generateMines };