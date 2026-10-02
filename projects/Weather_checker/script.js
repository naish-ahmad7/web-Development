let data = document.querySelector(".place");
let button = document.querySelector(".btn");
let cont = document.querySelector(".cont");

let weather_Info = document.createElement("div");
let heading = document.createElement("h3");
let para1 = document.createElement("p");
let para2 = document.createElement("p");
let para3 = document.createElement("p");
let para4 = document.createElement("p");
let para5 = document.createElement("p");
let para6 = document.createElement("p");

cont.append(weather_Info);

weather_Info.append(heading);
weather_Info.append(para1);
weather_Info.append(para2);
weather_Info.append(para3);
//   weather_Info.append(para4);
//   weather_Info.append(para5);
//   weather_Info.append(para6);

weather_Info.setAttribute("class", "result");

button.addEventListener("click", (event) => {
  event.preventDefault();

  let city = data.value;

  console.log(city);

  let getWeather = async () => {
    try {
      if (city != "") {
        let first_api = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5`,
        );
        let response = await first_api.json();

        console.log(response);

        if (!response.results) {
          throw new Error("Please write a correct city name.");
        }

        let exact_name = response.results.find((checkName) => {
          return city.trim().toLowerCase() === checkName.name.toLowerCase();
        });

        if (!exact_name) {
          throw new Error("Please write a correct city name.");
        }
        console.log(exact_name.name);

        let latitude = exact_name.latitude;
        let longitude = exact_name.longitude;

        let second_api = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`,
        );

        let second_response = await second_api.json();

        // console.log(second_response);

        heading.innerHTML = `Details of your City...`;
        para1.innerHTML = `City Name: ${exact_name.name}`;
        para2.innerHTML = `Country: ${exact_name.country}`;
        para3.innerHTML = `Temperature: ${second_response.current.temperature_2m}°C`;
      } else {
        throw new Error("Please write the city name first");
      }
    } catch (error) {
      let err = document.createElement("h3");
      weather_Info.append(err);
      err.innerHTML = error.message;
      console.log(error);
    }
  };

  getWeather();
});
