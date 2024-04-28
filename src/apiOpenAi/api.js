const api_url = process.env.API_URL;
const api_key = process.env.API_KEY;


export async function getResponse (request){
    
    try {

        const response = await fetch(api_url,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${api_key}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "user",
                    content: request
                  },
                ]
              })
        });

        const data = await response.json();
        console.log(data.choices[0].message.content)
        const content = data.choices[0].message.content
        return content
    }
    catch (e) {
        console.log(e);
    }
}