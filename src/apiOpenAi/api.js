import { OPENAI_API_KEY } from '../../config-env.js';
const api_url = "https://api.openai.com/v1/chat/completions";


export async function getResponse (request){
    const msgContent = "extraia a data, produto, e a quantidade dessa frase e me de em Data: Produto: Quantidade, se não for possível retorne o que não conseguiu. : "+ request;
    try {

        const response = await fetch(api_url,{
            method: "POST",
            headers: {
                'Content-Type': 'application/json', 
                Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "user",
                    content: msgContent
                  },
                ]
              })
        });

        const data = await response.json();
        console.log("MSGCONTET: " + msgContent)
        console.log("API: " + data.choices[0].message.content)
        const content = data.choices[0].message.content
        return content
    }
    catch (e) {
        console.log(e);
    }
}