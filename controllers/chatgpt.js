import { Configuration, OpenAIApi } from "openai"
const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
  })

const openai = new OpenAIApi(config)

const prompt = async (user_input, history)  => {
  
  const system_role = "I want you to act as an instructor in a university, teaching various topics in the field of computer science. You will be provided by a title of the course and optional history. You will create the first chapter (INTRODUCTION) of the course or if previous history is provided create the next chapter based on previous chapters and continue giving simple examples, Later, wait for my prompt for additional questions. I want you to provide the most correct and easy to digest course."
  const messages = []
  for ( const [input_text, completion_text] of history)  {
    messages.push({ role: "user", content: input_text });
    messages.push({ role: "assistant", content: completion_text });
  }

  messages.push({ role: "user", content: user_input })
  
  console.log(messages)
  try {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      })

    const completion_text = completion.data.choices[0].message.content;
    history.push([user_input, completion_text])

    return history

  } catch (error) {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
    } else {
        console.log(error.message);
    }
  }
}

const get_category = async (title) => {
  const categories = ["cyber security", "ai", "software engineering", "undefined"]
  const system_role = "I want you to receive a list of categories, and a course title, and choose the most appropriate category for that title. You have to choose only from the provided categories. You will return only the name of the chosen category A ONE WORD"
  const messages = []
  messages.push({
    role: "system", 
    content: system_role
  })
  const question = ` Given the title "${title}", IN ONE WORD what is the most appropriate category among the following options: ${categories}`
  messages.push({
    role: "user",
    content: question
  })
  try {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messages,
      })

    const category= completion.data.choices[0].message.content
    return category
  } catch (error) {
    if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
    } else {
        console.log(error.message);
    }
  }
}

export { get_category, prompt }
