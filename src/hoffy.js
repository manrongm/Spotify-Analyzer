// hoffy.js
import fs from 'fs';

function getEvenParam(...args){
    return args.filter((element,index) =>{
        return index % 2 === 0;
    });
}

function myFlatten(arr2d){
    return arr2d.reduce((flattened, subarray) =>{
        return flattened.concat(subarray);
    }, []);
}

function maybe(fn){
    return function(...args){
        if (args.includes(null)||args.includes(undefined)){
            return undefined;
        }
        return fn(...args);
    };
}

function filterWith(fn){
    return function(arr){
        return arr.reduce((newa, ele) =>{
            if(fn(ele)){
                return newa.concat(ele);
            }
            return newa;
        },[]);
    };
}

function repeatCall(fn,n,arg){
    function help(num){
        if (num <= 0){
            return;
        }
        fn(arg);
        help(num-1);
    }
    help(n);
}

function limitCallsDecorator(fn, n){
    let count = 0;
    return function(...args){
        if (count<n){
            count++;
            return fn(...args);
        }
        return undefined;
    };
}

function myReadFile(fileName, successFn, errorFn){
    fs.readFile(fileName, 'utf-8', (err,data)=>{
        if (err){
            errorFn(err);
        }
        else{
            successFn(data);
        }
    });
}

function stringFieldToList(data, key){
    const updated = {...data};
    if (typeof updated[key] === "string"){
        updated[key] = updated[key].split(',').map(i => i.trim());
    }
    return updated;
}

function rowsToObjects(data){
    const{ headers, rows } = data;
    return rows.map(row=> headers.reduce((obj,header,index)=>{
        obj[header] = row[index];
        return obj;
    },{})
);
}
export {getEvenParam, myFlatten, maybe, filterWith, repeatCall, limitCallsDecorator, myReadFile, stringFieldToList, rowsToObjects};




