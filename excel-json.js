const xlsx=require("xlsx");
const fs=require("fs");

const wb=xlsx.readFile("./public/data.xlsx");
// console.log(wb.SheetNames);
const ws=wb.Sheets["Sheet1"];
// console.log(ws);
const data=xlsx.utils.sheet_to_json(ws);
// console.log(data);
fs.writeFileSync("./public/datajason.json",JSON.stringify(data,null,2));

