


    if(selectedFile){
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(selectedFile);
        fileReader.onload = (event)=>{
         let data = event.target.result;
         let workbook = XLSX.read(data,{type:"binary"});
         console.log(workbook);
         workbook.SheetNames.forEach(sheet => {
              let rowObject = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheet]);
              console.log(rowObject);
              document.getElementById("jsondata").innerHTML = JSON.stringify(rowObject,undefined,4);
             


//         function convertExcelFileToJsonUsingXlsx() {
//     // Read the file using pathname
//     const file = xlsx.readFile('out.xlsx');
//     // Grab the sheet info from the file
//     const sheetNames = file.SheetNames;
//     const totalSheets = sheetNames.length;
//     // Variable to store our data 
//     let parsedData = [];
//     // Loop through sheets
//     for (let i = 0; i < totalSheets; i++) {
//         // Convert to json using xlsx
//         const tempData = xlsx.utils.sheet_to_json(file.Sheets[sheetNames[i]]);
//         // Skip header row which is the colum names
//         tempData.shift();
//         // Add the sheet's json to our data array
//         parsedData.push(...tempData);
//     }
//  // call a function to save the data in a json file
//  generateJSONFile(parsedData);
// }
// function generateJSONFile(data) {
//     try {
//         fs.writeFileSync('data.json', JSON.stringify(data))
//     } catch (err) {
//         console.error(err)
//     }
// }

// convertExcelFileToJsonUsingXlsx();
         });
         const fs = require('fs')
         fs.writeFileSync('data.json', JSON.stringify(rowObject,null,2));

        }
    }
 ;
    
