import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    await saveFile(files.file);
    return res.status(201).send("");
  });
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/${file.name}`, data);
  fs.unlinkSync(file.path);
  return;
};

export async function POST(req, res) {
  const data = await post(req, res);
  return data;
}

export async function GET(req, res) {
  console.log("GET");
}

export async function PUT(req, res) {
  console.log("PUT");
}

export async function DELETE(req, res) {
  console.log("DELETE");
}
