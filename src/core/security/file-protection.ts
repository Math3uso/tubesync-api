import { env } from "@/env";
import fs from "fs";
import path from "path";

function isFileAllowed(filePath: string): boolean {
    // 🔹 Normaliza o caminho pra evitar caminhos relativos tipo ../
    const normalized = path.resolve(filePath);

    const allowedExtensions: string[] = [];

    const allowedDirs = ["./temp", "./cache"];

    // 🔹 Verifica se a extensão é permitida
    const ext = path.extname(normalized);
    if (allowedExtensions.includes(ext)) return true;

    // 🔹 Verifica se o arquivo está dentro de alguma pasta liberada
    for (const dir of allowedDirs) {
        const absDir = path.resolve(dir);
        if (normalized.startsWith(absDir)) return true;
    }

    // 🔹 Tudo o que não passou pelos filtros é bloqueado
    return false;
}

function protectFileSystem() {
    const methodsToPatch = [
        "writeFile",
        "writeFileSync",
        "appendFile",
        "appendFileSync",
    ] as const;

    for (const method of methodsToPatch) {
        const original = (fs as any)[method];
        (fs as any)[method] = (...args: any[]) => {
            const target = args[0];
            if (!isFileAllowed(target)) {
                console.error("🚫 Tentativa de escrita bloqueada:", target);
                throw new Error(`Escrita bloqueada: ${target}`);
            }
            return original.apply(fs, args);
        };
    }

    const originalStream = fs.createWriteStream;
    fs.createWriteStream = (filePath: any, ...args: any[]) => {
        if (!isFileAllowed(filePath)) {
            console.error("🚫 Tentativa de criação de stream bloqueada:", filePath);
            throw new Error(`Criação de stream bloqueada: ${filePath}`);
        }
        return originalStream.call(fs, filePath, ...args);
    };
}


if (env.READ_ONLY == "true") {
    protectFileSystem();
    console.log("🛡️ Proteção de escrita ativada!");
}
