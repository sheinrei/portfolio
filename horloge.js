
function timeSynchro () {
    
    let currentTime = new Date();
    let real_hours = currentTime.getHours();
    let real_minutes = currentTime.getMinutes();
    let real_secondes = currentTime.getSeconds();
    //console.log(`${real_hours}h - ${real_minutes}m - ${real_secondes}s`);
    
    let deg_secondes = real_secondes * 6;
    let deg_minutes = real_minutes * 6;
    let deg_hours = real_hours * 30;
    
   
    document.getElementById('secondes_needle').style.transform = `rotate(${deg_secondes}deg)`;
    document.getElementById('minutes_needle').style.transform = `rotate(${deg_minutes}deg)`;
    document.getElementById('hours_needle').style.transform = `rotate(${deg_hours}deg)`;   
}

setInterval(timeSynchro,1000)
