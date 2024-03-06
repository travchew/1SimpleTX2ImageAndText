const replicateProxy = "https://replicate-api-proxy.glitch.me"

var counter = 0;
//////This is all vanilla javascript, no p5.js form making two fields and a listener for when the user hits enter
const image_container = document.getElementById("image_container");
var input_image_field = document.createElement("input");
input_image_field.type = "text";
input_image_field.id = "input_image_prompt";
input_image_field.value = "a cartoon house";
//input_image_field.value = counter;
input_image_field.size = 100;
image_container.prepend(input_image_field);
input_image_field.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        askForPicture(input_image_field.value + "and a happy puppy");
    }
});

// const text_container = document.getElementById("text_container");
// var input_field = document.createElement("input");
// input_field.type = "text";
// input_field.id = "input_prompt";
// input_field.value = "Why should learn to use a machine learning API?";
// input_field.size = 100;
// text_container.prepend(input_field);
// input_field.addEventListener("keyup", function (event) {
//     if (event.key === "Enter") {
//         askForWords(input_field.value);
//     }
// });



async function askForPicture(p_prompt) {
    const imageDiv = document.getElementById("resulting_image");
    imageDiv.innerHTML = "Waiting for materials to arrive...";
    let data = {
       //"version": "da77bc59ee60423279fd632efb4795ab731d9e3ca9705ef3341091fb989b7eaf",
       "version": "dee76b5afde21b0f01ed7925f0665b7e879c50ee718c5f78a9d38e04d523cc5e",
        input: {
            "prompt": p_prompt,
            "width": 512,
            "height": 512,
        },
    };
    console.log("BUILDING........", data);
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    const url = replicateProxy + "/create_n_get/"
    console.log("url", url, "options", options);
    const picture_info = await fetch(url, options);
    //console.log("picture_response", picture_info);
    const proxy_said = await picture_info.json();

    if (proxy_said.output.length == 0) {
        imageDiv.innerHTML = "UH OH.";
    } else {
        imageDiv.innerHTML = "";
        let img = document.createElement("img");
        img.src = proxy_said.output[0];
        imageDiv.appendChild(img);
    }
}

async function askForWords(p_prompt) {

    document.body.style.cursor = "progress";
    const textDiv = document.getElementById("resulting_text");
    textDiv.innerHTML = "Waiting for reply from Replicate...";
    const data = {
        "version": "35042c9a33ac8fd5e29e27fb3197f33aa483f72c2ce3b0b9d201155c7fd2a287",
        input: {
            prompt: p_prompt,
            max_tokens: 100,
            max_length: 100,
        },
    };
    console.log("Asking for Words From Replicate via Proxy", data);
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
        },
        body: JSON.stringify(data),
    };
    const url = replicateProxy + "/create_n_get/"
    console.log("words url", url, "words options", options);
    const words_response = await fetch(url, options);
    console.log("words_response", words_response);
    const proxy_said = await words_response.json();
    if (proxy_said.output.length == 0) {
        textDiv.innerHTML = "Something went wrong, try it again";
    } else {
        textDiv.innerHTML = proxy_said.output.join("");
        console.log("proxy_said", proxy_said.output.join(""));
    }
}

