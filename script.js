var paintings = [];
function load(){
fetch("https://cors-anywhere.herokuapp.com/clouddata.scratch.mit.edu/logs?projectid=219974802&limit=40&offset=0").then(function (j){return j.json()}).then(function (j){
for(var i = 0;i < j.length;i++){
var p = {};
if(j[i].verb === "create_var" || j[i].name === "☁ count"){continue;};
p.user = j[i].user;
p.code = j[i].value.toString();
p.id = p.code.slice(0,2);
p.colors = [];
for(var x = 2;x < p.code.length;x += 3){
p.colors.push(p.code[x] + p.code[x + 1] + p.code[x + 2]);
};
var c = document.createElement("CANVAS");
var t = c.getContext("2d");
c.width = "300";
c.height = "300";
var s = 0;
for(var f = 0;f < 6;f++){
for(var y = 0;y < 6;y++){
var color;
if(p.colors[s][2] === "9"){
color = "hsl(" + (parseFloat(p.colors[s][0] + p.colors[s][1]) * 13).toString() + ", 100%, 100%)"
}else{
color = "hsl(" + (parseFloat(p.colors[s][0] + p.colors[s][1]) * 13).toString() + ", 100%, " + (parseFloat(p.colors[s][2]) * 10).toString() + "%)"};
t.fillStyle = color;
t.fillRect(y * 50,f * 50,50,50);
s++;
}};
p.url = c.toDataURL();
paintings.push(p);
};
var htm = "";
for(var i = 0;i < paintings.length;i++){
var phtm = "<div id='" + paintings[i].id + "'><h3>" + paintings[i].id + " by <a href='https://scratch.mit.edu/users/" + paintings[i].user + "'>@" + paintings[i].user + "</a></h3>";
phtm += "<img src='" + paintings[i].url + "'><br>";
phtm += "<a href='" + paintings[i].url + "' download='" + paintings[i].id + "by" + paintings[i].user + ".png'>Download</a>";
phtm += "</div>";
htm += phtm;
};
document.getElementById("paintings").innerHTML = htm;
});
};
window.addEventListener("load",load);
