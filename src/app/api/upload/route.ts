import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define o diretório de destino
    const uploadDir = path.join(process.cwd(), "public/images/fotos");
    fs.mkdirSync(uploadDir, { recursive: true });

    // Gera um nome único
    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

    // Salva o arquivo no diretório público
    fs.writeFileSync(filePath, buffer);

    // Caminho acessível via browser
    const imageUrl = `/images/fotos/${fileName}`;

    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("Erro no upload:", error);
    return NextResponse.json({ error: "Erro ao fazer upload" }, { status: 500 });
  }
}
