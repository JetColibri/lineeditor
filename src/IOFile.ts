import * as fs from 'fs';

export class IOFile {
    constructor(readonly filePath: string) {
    }

    public readFromFile(): string[] {
        let lines: string[] = [];
        let data;
        try {
            data = fs.readFileSync(this.filePath, 'utf8')
        } catch (err) {
            console.log(err.message);
            process.exit(0);
        }

        data.split(/\r?\n/).forEach(element => {
            lines.push(element);
        });

        return lines;
    }

    public saveCurrentFile(lines: string[]) {
        const data = lines.join("\r\n");
        fs.writeFileSync(this.filePath, data, 'utf-8');
        console.log(`Saved to file ${this.filePath}`);
    }
}

