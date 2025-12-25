/* ---------------- GOVT IDS (SEQUENTIAL) ---------------- */
const govtIds = [
"UIM3443959","UIM3474236","UIM3342185","UIM3377470","UIM2033678",
"UIM2779577","UIM3373081","UIM2520088","UIM2806404","UIM1207703",
"UIM3365178","UIM2907087","UIM2897262","UIM2637668","UIM2637676",
"UIM2637684","UIM0651117","UIM1149061","UIM1894997","UIM1149228",
"UIM2497352","UIM2497287","UIM3219839","UIM1459734","UIM0856344",
"UIM3010535","UIM1894823","UIM2497311","UIM3010436","UIM0856385",
"UIM3391307","UIM0856393","UIM2809259","UIM1895010","UIM2497667",
"UIM2802205","UIM2028769","UIM0856401","UIM3340742","UIM3340759",
"UIM3340734","UIM2028777","UIM1149053","UIM1460195","UIM2806347",
"UIM0856435","UIM0779751","UIM0856427","UIM1898626","UIM2497675",
"UIM2497758","UIM1460203","UIM1899384","UIM2033587","UIM2809754",
"UIM2805943","UIM0856443",
"LBN5606751","LBN5606744","LBN1283993","LBN5596226","LBN1283969",
"LBN5607882","LBN5606843","LBN5606835","LBN1283381","LBN5607494",
"LBN5596028","LBN1284181","LBN1282797","LBN5606942","LBN1283803",
"LBN1282763","LBN5606405","LBN5607015","LBN1284017","LBN1282326",
"BR/01/002/021481","BR/01/002/021482","BR/01/002/021505",
"BR/01/002/021498","BR/01/002/021001","BR/01/002/021348",
"BR/01/002/021223","BR/01/002/021352","BR/01/002/021513",
"BR/01/002/021497","BR/01/002/021507","BR/01/002/021487",
"BR/01/002/021485","BR/01/002/021495","BR/01/002/021503",
"BR/01/002/021295","BR/01/002/021299","BR/01/002/021452",
"BR/01/002/021439","BR/01/002/021084","BR/01/002/021283",
"BR/01/002/021281","BR/01/002/021330","BR/01/002/021515",
"BR/01/002/021304"
];

let idIndex = localStorage.getItem("idIndex")
    ? parseInt(localStorage.getItem("idIndex")) : 0;

/* ---------------- ADDRESS DATA ---------------- */
const streets=["House","Flat","Plot","H.No","Apartment","Villa"];
const areas=["MG Road","Nehru Nagar","Gandhi Chowk","Civil Lines","Indiranagar"];
const cities=[
 {c:"Delhi",s:"Delhi",a:110000,b:110999},
 {c:"Mumbai",s:"Maharashtra",a:400000,b:400999},
 {c:"Bengaluru",s:"Karnataka",a:560000,b:560999},
 {c:"Chennai",s:"Tamil Nadu",a:600000,b:600999}
];

/* ---------------- STATE ---------------- */
let soundEnabled=true;
let counter=localStorage.getItem("genCount")
    ? parseInt(localStorage.getItem("genCount")):0;
updateCounter();

/* ---------------- FUNCTIONS ---------------- */
function nextGovtId(){
    if(idIndex >= govtIds.length) idIndex = 0; // loop safe
    let id = govtIds[idIndex];
    idIndex++;
    localStorage.setItem("idIndex",idIndex);
    return id;
}

function generateAddress(){
    let st=streets[Math.floor(Math.random()*streets.length)];
    let ar=areas[Math.floor(Math.random()*areas.length)];
    let ct=cities[Math.floor(Math.random()*cities.length)];
    let num=Math.floor(Math.random()*900)+100;
    let pin=(Math.floor(Math.random()*(ct.b-ct.a+1))+ct.a)
            .toString().padStart(6,"0");
    return {addr:`${st} ${num}, ${ar}, ${ct.c}, ${ct.s}`,pin};
}

function generateData(){
    document.getElementById("govtId").value = nextGovtId();
    let d=generateAddress();
    document.getElementById("address").value=d.addr;
    document.getElementById("zip").value=d.pin;

    counter++;
    localStorage.setItem("genCount",counter);
    updateCounter();
}

function updateCounter(){
    document.getElementById("counter").innerText="Generated: "+counter;
}

function copyText(id,btn){
    let el=document.getElementById(id);
    el.select();document.execCommand("copy");
    btn.parentElement.classList.add("copied");
    setTimeout(()=>btn.parentElement.classList.remove("copied"),500);
    if(soundEnabled) document.getElementById("copySound").play();
}

function toggleSound(){
    soundEnabled=!soundEnabled;
    document.querySelector(".mute").innerText = soundEnabled?"🔊":"🔇";
}

/* INIT */
generateData();
