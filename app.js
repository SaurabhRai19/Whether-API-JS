//from Youtube build a wether app : Dev Ed
window.addEventListener("load",function(){
    let long;
    let lat;

    let temperatureDescription=document.querySelector(".temperature-description");
    let temperatureDegree=document.querySelector(".temperature-degree");
    let locationTimeZone=document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan=document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            //console.log(position) here i can check for all the position realted information
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/a4782615cb16a09f3fdafdb7b507342e/${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature , summary, icon} = data.currently;

                    //set DOM elements from the api
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent= summary;
                    locationTimeZone.textContent= data.timezone;
                   
                    //calculating celcius
                    let celsius= (temperature - 32) * (5/9);

                    //set Icon
                    setIcons(icon, document.querySelector(".icon"));
                   
                    //Change temp to cel/feh
                    temperatureSection.addEventListener("click",()=>{
                        if(temperatureSpan.textContent === "F"){
                            temperatureSpan.textContent ="C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });

                });
            
            
        });

    }
//getting all this from skycons "icon" is icon id and other paramenter is the svg
function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}

})