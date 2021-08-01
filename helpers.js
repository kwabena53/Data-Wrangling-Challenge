

const matchValueToHeader = (headerArray, valuesArray, excludeColumns)=>{
    let row = {}
    for (let i in headerArray){
        if(!excludeColumns.includes(parseInt(i))){
            let key = headerArray[i]
            let value = valuesArray[i]
            // let cleanVal = cleanValue(value)
            // console.log(cleanVal, value)
            row[key] = value
        }
    }
 return row
}

const cleanDataNBs = (data)=>{
    let cleanValue = data.replace(/†a/g, '')    //remove all quotes if any
     cleanValue = cleanValue.replace(/†b/g, '')  
     cleanValue = cleanValue.replace(/†c/g, '')  
     cleanValue = cleanValue.replace(/†d/g, '') 
     cleanValue = cleanValue.replace(/†e/g, '') 

     return cleanValue
}

const sortByParam = (objectData, param, order) =>{
    if(order === 'asc'){
        objectData.sort((a, b)=>{return a[param] - b[param]});
    }else if (order === 'desc'){
        objectData.sort((a, b)=>{return b[param] - a[param]});
    }else{
        objectData.sort((a, b)=>{return b[param] - a[param]});
    }
    return objectData
}
 

module.exports = { 
    matchValueToHeader,
    sortByParam,
    cleanDataNBs
}