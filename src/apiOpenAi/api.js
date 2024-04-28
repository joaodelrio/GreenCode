const api_url = "https://api.openai.com/v1/chat/completions"
const api_key = "sk-proj-oWL0JQe9HWH5V4GmII6uT3BlbkFJiDQIyxsm6ZYo9Bcg9eEP"

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