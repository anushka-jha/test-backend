const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3001;

app.use(bodyParser.json());

const API_URL =
  "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
const API_KEY =
  "VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM"; 

app.post("/generate-comic", async (req, res) => {
  try {
    const textInputs = req.body.inputs;
    const imageUrls = await makeApiCall(textInputs);
    res.json({ imageUrls });
  } catch (error) {
    console.error("Error generating comic:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const makeApiCall = async (textInputs) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        inputs: textInputs.join("\n"),
      },
      {
        headers: {
          Accept: "image/png",
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Error generating comic");
    }

    return response.data.imageUrls;
  } catch (error) {
    throw new Error("Error generating comic");
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
