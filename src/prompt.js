// Load environment variables from a local `.env` file (if present).
// Note: `.env` is gitignored, so each dev machine should create its own.
require("dotenv").config();

const OpenAI = require("openai");

exports.openai = function(system, text, opts={})
{
    var content = [{type:"input_text", text:text}]
    const input = [
        {role:'system', content:system},
        {role:'user', content:content}
    ];
    var options = {input, ...opts};

    if (!process.env.OPENAI_API_KEY) {
        throw new Error(
            "Missing OPENAI_API_KEY. Set it in your environment or create a .env file in the repo root with OPENAI_API_KEY=..."
        );
    }

    var openai = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
    return openai.responses.create(options).then(rsp=>rsp.output_text)
    .catch(error => console.error('Error:', error));
}
