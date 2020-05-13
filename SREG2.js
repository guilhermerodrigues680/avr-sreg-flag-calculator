// const r16 = 0b101
// const r17 = 0b111
const r16 = 0x3b
const r17 = 0x15

calcSREG(r16, r17);

function calcSREG(r16, r17) {
    printBinHexDec(r16);
    printBinHexDec(r17);

    const op = '-'; // - , + , * ou /
    
    console.log("Difference .:"     , calcDifferenceHex(r16, r17));
    console.log("Signed Rel .:"     , calcSignedRel(r16, r17));
    console.log("Unsigned Rel .:"   , calcUnsignedRel(r16, r17));
    console.log("H .:"              , calcH(r16, r17));
    console.log("S .:"              , calcS(r16, r17));
    console.log("V .:"              , calcV(r16, r17));
    console.log("N .:"              , calcN(r16, r17));
    console.log("Z .:"              , calcZ(r16, r17));
    console.log("C .:"              , calcC(r16, r17));
}

function calcDifferenceHex(r16, r17) {
    const diff = (r16 - r17).toString(16).toUpperCase();
    return `0x${diff}`;
}

function calcSignedRel(r16, r17) {
    const n1 = new Int8Array([r16]);
    const n2 = new Int8Array([r17]);
    let t1,ts,t2;

    console.log(n1, n2);

    t1 = n1[0] > 0 ? '+' : (n1[0] < 0 ? '-' : 0);
    t2 = n2[0] > 0 ? '+' : (n2[0] < 0 ? '-' : 0);
    ts = n1[0] == n2[0] ? '=' : (n1[0] > n2[0] ? '>' : '<');

    return `${t1} ${ts} ${t2}`;
}

function calcUnsignedRel(r16, r17) {
    const n1 = new Uint8Array([r16]);
    const n2 = new Uint8Array([r17]);
    let ts;

    console.log(n1, n2);

    ts = n1[0] == n2[0] ? '=' : (n1[0] > n2[0] ? '>' : '<');

    return ts;
}

function calcH(r16, r17) { // Calcula o Half Carry Flag
    let br16 = calculaNibbles(r16);
    let br17 = calculaNibbles(r17);

    const nbMenorR16 = parseInt(br16[1], 2);
    const nbMenorR17 = parseInt(br17[1], 2);

    const H = (nbMenorR16 - nbMenorR17) < 0x00 ? 1 : 0;

    return H;
}

function calcS(r16, r17) {
    const N = calcN(r16, r17);
    const V = calcV(r16, r17);
    return N ^ V; // XOR
}

function calcV(r16, r17) {
    const n1 = new Int8Array([r16]);
    const n2 = new Int8Array([r17]);

    const r16Signed = n1[0] & 0x7F;
    const r17Signed = n2[0] & 0x7F;

    // const V = (r16Signed + r17Signed) > 0x7F ? 1 : 0;
    const V = (r16Signed - r17Signed) > 0x00 ? 1 : 0;

    // console.log(r16Signed.toString(2), r17Signed.toString(2), V)

    return V;
}

function calcN(r16, r17) {
    // const N = (r16 + r17) < 0 ? 1 : 0;
    const N = (r16 - r17) < 0 ? 1 : 0;
    return N;
}

function calcZ(r16, r17) {
    const Z = (r16 - r17) == 0 ? 1 : 0;
    return Z;
}

function calcC(r16, r17) {
    // const C = (r16 + r17) > 0xFF ? 1 : 0;
    const C = (r16 - r17) < 0 ? 1 : 0;
    return C;
}

function calculaNibbles(n) {
    let bin = (n >>> 0).toString(2);

    bin = n < 0 ? bin.substring(bin.length - 8) : bin;

    switch (bin.length) {
        case 1:
            bin = "0000000" + bin;
            break;
        case 2:
            bin = "000000" + bin;
            break;
        case 3:
            bin = "00000" + bin;
            break;
        case 4:
            bin = "0000" + bin;
            break;
        case 5:
            bin = "000" + bin;
            break;
        case 6:
            bin = "00" + bin;
            break;
        case 7:
            bin = "0" + bin;
            break;
    }

    let nibbles = [];
    nibbles.push(bin.substring(0,4)); // Nibble maior
    nibbles.push(bin.substring(4)); // Nible menor

    return nibbles;
}


function printBinHexDec(n) {
    let bin = (n >>> 0).toString(2);
    let hex = (n >>> 0).toString(16).toLocaleUpperCase();

    if (n < 0) {
        bin = bin.substring(bin.length - 8);
        hex = hex.substring(hex.length - 2);
    }

    switch (bin.length) {
        case 1:
            bin = "0000000" + bin;
            break;
        case 2:
            bin = "000000" + bin;
            break;
        case 3:
            bin = "00000" + bin;
            break;
        case 4:
            bin = "0000" + bin;
            break;
        case 5:
            bin = "000" + bin;
            break;
        case 6:
            bin = "00" + bin;
            break;
        case 7:
            bin = "0" + bin;
            break;
    }

    console.log(`${n} \t 0b${bin} \t 0x${hex}`)
}