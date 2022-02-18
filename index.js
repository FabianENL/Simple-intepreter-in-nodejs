
const fs = require('fs');
const path = require('path')

try {
  const data = fs.readFileSync(__dirname + '/index.l', 'utf8')
  const rawFile = data.replace(/\n|\r/g, "")
  const File = rawFile.split(';')
  
  let lineNumber = 0
  for(i in File){

    lineNumber += 1

    if(File[i].startsWith("int")){
      try{
        let Line = File[i].split(" ")
        let intName = Line[1]
        let intValue = Line[3]
        eval('var ' + intName + ' = ' + intValue)
      } catch (err){
        console.error(err)
      } 

    }else if(File[i].startsWith("string")){
      try{
        var stringValue = File[i].substring(
          File[i].indexOf("\"") + 1, 
          File[i].lastIndexOf("\"")
        );
        var Line = File[i].split(" ")
        var stringName = Line[1]
        eval('var ' + stringName + ' = \"' + stringValue + '\"')
      }catch(err){
        console.error(err)
      }

    } else if(File[i].startsWith("log")){
      try{
        let rawLine = File[i].replace("(", "#")
        let rawrawLine = rawLine.replace(")", "")
        let Line = rawrawLine.split("#")
        eval("console.log(" + Line[1] +")")
      } catch(err){
        console.error(err)
      }


    }else if(File[i].startsWith("//")){
      let log = File[i].replace("//", "")
      console.log("[Log] " + log)
    } else{
      Line = File[i].split(" ")
      if(Line != ""){
        console.error("[Error] \"" + Line[0], "\" is not a function. \nAt line:", lineNumber)
        process.exit(1)
      }
    }
  }
} catch (err) {
  console.error(err)
}