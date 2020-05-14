const btnCalcSregDOM = document.querySelector('#btn-calc-sreg');
const r16DOM = document.querySelector('#input-r16');
const r17DOM = document.querySelector('#input-r17');

r16DOM.addEventListener('input', filterHexBinDec);
r17DOM.addEventListener('input', filterHexBinDec);


function filterHexBinDec(e) {
    // this.value = this.value.replace(/[g-wy-zG-WY-Z\W+]/gm, '').toLocaleUpperCase();
    // this.value = this.value.replace(/[xX]/gm, 'x');
}


btnCalcSregDOM.addEventListener('click', function (e) {
    const r16 = inputToNumber(r16DOM.value);
    const r17 = inputToNumber(r17DOM.value);

    calcInfoR16R17(r16, r17);

    const SREG = calcSREG(r16, r17);

    const tbodyDOM = document.querySelector('#table-sreg tbody');
    const trFull = getTrFull(r16, r17, SREG);
    tbodyDOM.appendChild(trFull);
    
    // console.debug(r16, r17);
    console.log(SREG);
});


function calcInfoR16R17(r16, r17) {
    const infoR16DOM = document.querySelector('#p-info-r16');
    const infoR17DOM = document.querySelector('#p-info-r17');

    console.debug(getBinHexDec(r16));
    console.debug(getBinHexDec(r17));

    const nR16 = getBinHexDec(r16);
    const nR17 = getBinHexDec(r17);
    const r16Int = (new Int8Array([r16]))[0];
    const r16Uint = (new Uint8Array([r16]))[0];
    const r17Int = (new Int8Array([r17]))[0];
    const r17Uint = (new Uint8Array([r17]))[0];

    let infoR16 = `R16 -> Dec: ${nR16.dec} , Bin: ${nR16.bin} , Hex: ${nR16.hex} , Signed: ${r16Int} , Unsigned: ${r16Uint}`;
    let infoR17 = `R17 -> Dec: ${nR17.dec} , Bin: ${nR17.bin} , Hex: ${nR17.hex} , Signed: ${r17Int} , Unsigned: ${r17Uint}`;

    infoR16DOM.innerText = infoR16;
    infoR17DOM.innerText = infoR17;

}


function getTrFull(r16, r17, SREG) {

    let tr = document.createElement('tr');

    let tdR16 = document.createElement('td');
    let tdR17 = document.createElement('td');
    let tdDiff = document.createElement('td');
    let tdSignedRel = document.createElement('td');
    let tdUnsignedRel = document.createElement('td');
    let tdH = document.createElement('td');
    let tdS = document.createElement('td');
    let tdV = document.createElement('td');
    let tdN = document.createElement('td');
    let tdZ = document.createElement('td');
    let tdC = document.createElement('td');

    tdR16.append(getBinHexDec(r16).hex);
    tdR17.append(getBinHexDec(r17).hex);
    tdDiff.append(SREG.diff);
    tdSignedRel.append(SREG.signedRel);
    tdUnsignedRel.append(SREG.unsignedRel);
    tdH.append(SREG.H);
    tdS.append(SREG.S);
    tdV.append(SREG.V);
    tdN.append(SREG.N);
    tdZ.append(SREG.Z);
    tdC.append(SREG.C);
    
    tr.appendChild(tdR16);
    tr.appendChild(tdR17);
    tr.appendChild(tdDiff);
    tr.appendChild(tdSignedRel);
    tr.appendChild(tdUnsignedRel);
    tr.appendChild(tdH);
    tr.appendChild(tdS);
    tr.appendChild(tdV);
    tr.appendChild(tdN);
    tr.appendChild(tdZ);
    tr.appendChild(tdC);

    return tr;
}