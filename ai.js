const { generateMines } = require('./mines');
const { getMemory, saveMemory } = require('./firebase');

function verifyPrediction(serverSeed, clientSeed, nonce, mineCount, tiles) {
    const mineIndexes = generateMines(serverSeed, clientSeed, nonce, mineCount);
    const tileIndices = tiles.map(t => {
        const letter = t[0].toUpperCase();
        const number = parseInt(t.slice(1)) - 1;
        return (letter.charCodeAt(0) - 65) * 5 + number;
    });
    return tileIndices.every(i => !mineIndexes.includes(i));
}

function addMemory(serverSeed, clientSeed, nonce, mineCount) {
    const mines = generateMines(serverSeed, clientSeed, nonce, mineCount);
    const entry = { serverSeed, clientSeed, nonce, mines };
    saveMemory(entry);
}

async function predictSafeTiles(serverSeed, clientSeed, nonce, mineCount) {
    const memory = await getMemory();
    const freq = Array(25).fill(0);
    memory.forEach(m => m.mines.forEach(i => freq[i]++));
    const safest = freq
        .map((count, i) => ({ i, count }))
        .sort((a, b) => a.count - b.count)
        .slice(0, 25 - mineCount)
        .map(obj => `${String.fromCharCode(65 + Math.floor(obj.i / 5))}${(obj.i % 5) + 1}`);
    return safest.slice(0, 3);
}

module.exports = { verifyPrediction, predictSafeTiles, addMemory };