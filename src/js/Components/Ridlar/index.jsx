import React from 'react';

let ridlarContent = '';

const Ridlar = ()=>{
    let ridlarArr = [];
    for (let index = 1; index <= 6; index++) {
        let letter;
        switch (index) {
            case 1:
                letter = 'A';
                break;
            case 2:
                letter = 'B';
                break;
            case 3:
                letter = 'C';
                break;
            case 4:
                letter = 'D';
                break;
            case 5:
                letter = 'E';
                break;
            case 6:
                letter = 'F';
                break;
        }
        ridlarContent += '<h2>' + letter + ' - lið</h2>';
        ridlarContent += '<ul>';
        for (let uindex = 1; uindex <= 8; uindex++) {
            ridlarContent += '<li><a href="/ridill/' + uindex + '/' + index + '/">Riðill ' + uindex + '</a></li>';
        }
        ridlarContent += '</ul>';
        
    }
    return (<div>
        <h1>Riðlar</h1>
        <div dangerouslySetInnerHTML={{__html: ridlarContent}}></div>
    </div>)

}

export default Ridlar;