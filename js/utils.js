/**
 * Recebe um numero e retorna um dicionario com String em HEX e o numero decimal
 * @param {Number} n 
 */
function getBinHexDec(n) {
    let bin = (n >>> 0).toString(2);
    let hex = (n >>> 0).toString(16).toLocaleUpperCase();

    if (n < 0) {
        bin = bin.substring(bin.length - 8);
        hex = hex.substring(hex.length - 2);
    }

    bin = "0".repeat(8 - bin.length) + bin;
    hex = "0".repeat(2 - hex.length) + hex;

    const res = {
        dec: n,
        bin: `0b${bin}`,
        hex: `0x${hex}`,
    };
    
    // Retorna o numero com a representacao em 8bits
    // console.debug(`${n} \t 0b${bin} \t 0x${hex}`)
    return res;
}


/**
 * Le um input e retorna um numero
 * @param {String} str 
 */
function inputToNumber(str) {
    let number;

    if (str.length > 2) {
        switch (str[1].toLowerCase()) {
            case 'b':
                // let bin = str.replace(/[^10bB]/gm, '');
                // if (bin.length !== str.length) {
                //     alert('Numero binario invalido')
                // } 
                number = parseInt(str.substring(2), 2);
                // console.debug('BIN', bin)
                break;
            case 'x':
                // let hex = str.replace(/[^0-9xXA-Za-z]/gm, '');
                // if (hex.length !== str.length) {
                //     alert('Numero Hexadecimal invalido')
                // }
                number = parseInt(str.substring(2), 16);
                // console.debug('HEX', hex)
                break;
            default:
                // let dec = str.replace(/[\D]/gm, '');
                // if (dec.length !== str.length) {
                //     alert('Numero decimal invalido')
                // }
                number = parseInt(str, 10);
                // console.debug('DEC', dec)
                break;
        }
    } else {
        // let dec = str.replace(/[\D]/gm, '');
        // if (dec.length !== str.length) {
        //     alert('Numero decimal invalido')
        // }
        number = parseInt(str, 10);
        // console.debug('DEC', dec)
    }
    

    return number;
}