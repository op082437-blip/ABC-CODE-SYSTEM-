const letters={A:"A",B:"B",C:"C",D:"AB",E:"AC",F:"BA",G:"BB",H:"BC",I:"CA",J:"CB",K:"CC",L:"ABA",M:"ABB",N:"ABC",O:"ACA",P:"ACB",Q:"ACC",R:"BAA",S:"BAB",T:"BAC",U:"BBA",V:"BBB",W:"BBC",X:"BCA",Y:"BCB",Z:"BCC"};
const numbers={"0":"X","1":"Y","2":"Z","3":"XX","4":"XY","5":"XZ","6":"YX","7":"YY","8":"YZ","9":"ZX"};
const letterCodes=Object.fromEntries(Object.entries(letters).map(([k,v])=>[v,k]));
const numberCodes=Object.fromEntries(Object.entries(numbers).map(([k,v])=>[v,k]));
let mode="encode";
const encodeTab=document.getElementById("encodeTab"),decodeTab=document.getElementById("decodeTab"),inputLabel=document.getElementById("inputLabel"),inputText=document.getElementById("inputText"),outputText=document.getElementById("outputText"),status=document.getElementById("status");

function setMode(m){mode=m;encodeTab.classList.toggle("active",m==="encode");decodeTab.classList.toggle("active",m==="decode");inputLabel.textContent=m==="encode"?"Normal text":"ABC–XYZ code";inputText.placeholder=m==="encode"?"Example: HELLO BRO":"Example: BC AC ABA ABA ACA | BAA BBA ACA";inputText.value="";outputText.value="";status.textContent=""}
function encode(text){return [...text.toUpperCase()].map(c=>c===" "?"|":letters[c]||numbers[c]||c).join(" ")}
function decode(code){return code.split("|").map(word=>word.trim().split(/\s+/).filter(Boolean).map(s=>letterCodes[s]||numberCodes[s]||s).join("")).join(" ")}

document.getElementById("convertButton").onclick=()=>{if(!inputText.value.trim()){status.textContent="Type something first!";return}outputText.value=mode==="encode"?encode(inputText.value):decode(inputText.value);status.textContent="Converted successfully!"};
document.getElementById("clearButton").onclick=()=>{inputText.value="";outputText.value="";status.textContent=""};
document.getElementById("copyButton").onclick=async()=>{if(outputText.value){await navigator.clipboard.writeText(outputText.value);status.textContent="Copied!"}};
encodeTab.onclick=()=>setMode("encode");decodeTab.onclick=()=>setMode("decode");
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js"));