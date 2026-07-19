export default {
  async fetch(request, env) {

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS"
    };


    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders
      });
    }


    if (request.method !== "POST") {

      return new Response(
        "Veltrix AI API is online!",
        {
          headers: corsHeaders
        }
      );

    }


    try {

      const body = await request.json();


      if (!env.OPENAI_API_KEY) {

        return new Response(
          JSON.stringify({
            error: "OPENAI_API_KEY missing"
          }),
          {
            status:500,
            headers:{
              "Content-Type":"application/json",
              ...corsHeaders
            }
          }
        );

      }



      const openaiResponse = await fetch(
        "https://api.openai.com/v1/responses",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json",
            "Authorization":
            `Bearer ${env.OPENAI_API_KEY}`
          },


          body:JSON.stringify({

            model:"gpt-4.1-mini",


            input:
`
You are V Veltrix.ai.

Create a complete website.

User request:

${body.prompt}


Return ONLY JSON.

Format:

{
 "files":{
   "index.html":"HTML CODE",
   "style.css":"CSS CODE",
   "app.js":"JAVASCRIPT CODE"
 }
}

No markdown.
No explanations.
`

          })

        }
      );



      const data =
      await openaiResponse.json();



      console.log(
        "OpenAI:",
        data
      );



      if(data.error){

        return new Response(
          JSON.stringify({
            error:data.error.message
          }),
          {
            status:500,
            headers:{
              "Content-Type":"application/json",
              ...corsHeaders
            }
          }
        );

      }



      return new Response(
        JSON.stringify(data),
        {
          headers:{
            "Content-Type":"application/json",
            ...corsHeaders
          }
        }
      );



    }


    catch(error){


      return new Response(

        JSON.stringify({
          error:error.message
        }),

        {

          status:500,

          headers:{
            "Content-Type":"application/json",
            ...corsHeaders
          }

        }

      );


    }

  }
};
