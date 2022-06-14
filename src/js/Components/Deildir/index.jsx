import React from 'react';

let deildirContent = '';

const Deildir = ()=>{
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
        deildirContent += '<h2>' + letter + ' - lið</h2>';
        deildirContent += '<ul>';
        for (let uindex = 9; uindex <= 12; uindex++) {
            let letter;
            switch (uindex) {
                case 9:
                    letter = '1';
                    break;
                case 10:
                    letter = '2';
                    break;
                case 11:
                    letter = '3';
                    break;
                case 12:
                    letter = '4';
                    break;
            }
            deildirContent += '<li><a href="/ridill/' + uindex + '/' + index + '/">Deild ' + letter + '</a></li>';
        }
        deildirContent += '</ul>';
        
    }
    return (<div>
        <h1>Deildir</h1>
        <div dangerouslySetInnerHTML={{__html: deildirContent}}></div>
    </div>)

}

export default Deildir;