import { NextResponse } from "next/server";
//import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (file) {
      const fileInfo = `FileName: ${file.name}, size: ${file.size}, type: ${file.type}`;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const pathname = `${process.cwd()}/public/uploads/${file.name}`;

      fs.writeFile(pathname, buffer, (err) => {
        if (err) {
          throw err;
        }
        console.log("File saved successfully");
      });
      //await writeFile(pathname, buffer);
      return NextResponse.json({ messege: fileInfo }, { status: 200 });
    } else {
      return NextResponse.json(
        { messege: "File Not Uploaded!" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ messege: `from backend: ${error}` });
  }
}
