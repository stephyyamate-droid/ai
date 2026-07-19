export default {

async fetch(request, env) {


const cors = {

"Access-Control-Allow-Origin": "*",

"Access-Control-Allow-Headers":
"Content-Type"

};



// Allow browser checks

if(request.method === "OPTIONS"){

return new Response(null,{
headers:cors
});

}




if(request.method !== "POST"){


return new Response(
"V Veltrix.ai API Online",
{
headers:cors
}
);


}




try {



const body =
await request.json();





const ai =
await fetch(
"https://api.openai.com/v1/responses",
{


method:"POST",


headers:{


"Content-Type":
"application/json",


"Authorization":
`Bearer ${env.OPENAI_API_KEY}`


},



body:JSON.stringify({



model:
"gpt-4.1-mini",



input:
`

You are V Veltrix.ai,
an advanced AI website builder.


Create a complete website from this idea:


${body.prompt}



Return ONLY valid JSON.

No markdown.

No explanations.



Format:



{

"files":{

"index.html":"",

"style.css":"",

"app.js":""

}

}



Make the website:

- modern

- responsive

- animated

- professional

- production quality



`

})

}

);






const result =
await ai.json();





return new Response(

JSON.stringify(result),

{

headers:{

"Content-Type":
"application/json",

...cors

}

}

);




}

catch(error){


return new Response(

JSON.stringify({

error:
error.message

}),

{

status:500,

headers:{

"Content-Type":
"application/json",

...cors

}

}

);


}



}

};
