export const queryMaker = (object) => {
    let str = "";
    for (const key in object) {
        if (object[key]) {
            str += `${key}=${object[key]}&`;
        }
    }
    return str;
}


export const formerSingleFile = (object) => {
    const formData = new FormData();
    // console.log(object);
    for (const key in object) {
        if (typeof object[key] === "boolean") {
            let bool = object[key] ? 1 : 0;
            formData.append(`${key}`, bool);
            continue;
        }
        formData.append(`${key}`, object[key]);
    }
    for (var pair of formData.entries()) {
        // console.log(pair[0]+ ', ' + pair[1]); 
    }
    return formData;
}
