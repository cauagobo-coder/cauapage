import { execFileSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import ffmpegPath from 'ffmpeg-static';

const __dirname = dirname(fileURLToPath(import.meta.url));
const videosDir = resolve(__dirname, '../public/videos');

const videos = ['hero-mobile', 'hero-tablet', 'hero-desktop'];

for (const name of videos) {
    const input = `${videosDir}/${name}.webm`;
    const output = `${videosDir}/${name}.mp4`;

    if (!existsSync(input)) {
        console.log(`⚠️  Não encontrado: ${input}`);
        continue;
    }

    if (existsSync(output)) {
        console.log(`✅ Já existe: ${output}`);
        continue;
    }

    console.log(`🎬 Convertendo ${name}.webm → ${name}.mp4 ...`);
    try {
        execFileSync(ffmpegPath, [
            '-i', input,
            '-c:v', 'libx264',     // codec H.264 — suportado por iOS
            '-preset', 'fast',
            '-crf', '23',          // qualidade boa sem arquivo pesado
            '-an',                 // sem áudio (vídeo mudo de fundo)
            '-movflags', '+faststart', // otimizado para streaming
            '-y',                  // sobrescrever se existir
            output,
        ], { stdio: 'inherit' });
        console.log(`✅ Concluído: ${output}`);
    } catch (err) {
        console.error(`❌ Falha ao converter ${name}:`, err.message);
    }
}
