import {CustomLinkedList} from "./LinkedList/CustomLinkedList";
import {INode} from "./LinkedList/Interface/INode";
import {IOFile} from "./IOFile";
import express from "express";

class EditMode {
    enable: boolean = false
    lineNumber?: number
}

const filePath = initPathFile()
const ioFile = new IOFile(filePath)
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);
let linesFromFile = initCustomLinkedList()
let editMode = new EditMode()
let prefix = '>> ';


rl.on('line', function(line: string) {
    const args = line.trim().split(" ")
    const lineValue = args[0]
    const lineNumber: number = +args[1]

    if (!editMode.enable) {
        switch (lineValue) {
            case 'list':
                CommandManager.list()
                break;
            case 'del':
                CommandManager.delete(lineNumber)
                break;
            case 'ins':
                CommandManager.enableEditMode(lineNumber)
                break;
            case 'save':
                CommandManager.save()
                break;
            case 'quit':
                CommandManager.quit()
            default:
                CommandManager.default(lineValue)
                break;
        }
    } else {
        CommandManager.insert(line)
    }
    rl.setPrompt(prefix, prefix.length);
    rl.prompt();
}).on('close', function() {
    process.exit(0);
});

rl.setPrompt(prefix, prefix.length);
rl.prompt();

function initCustomLinkedList(): CustomLinkedList {
    let lines = ioFile.readFromFile()
    let list = new CustomLinkedList()
    list.fromArray(lines)

    return list;
}

function initPathFile(): string {
    let filePath = process.argv.slice(2)[0];
    if(filePath === undefined) {
        console.log("The file path is not entered");
        process.exit(0);
    }
    return filePath;
}

class CommandManager {
    static list() {
        let items = linesFromFile.items()
        let index = 1
        while (true) {
            const next = items.next();
            if (next.done) {
                break
            }
            let val = next.value as INode
            console.log(`${index}: ${val.value}`)
            index++
        }
    }

    static delete(lineNumber: number) {
        if(typeof lineNumber === "number" && lineNumber>0) {
            linesFromFile.delete(lineNumber)
        }
    }

    static enableEditMode(lineNumber: number) {
        if(typeof lineNumber === "number" && lineNumber>0) {
            prefix = "Enter your new line >> "
            editMode.enable = true
            editMode.lineNumber = lineNumber
        }
    }
    static insert(lineValue: string) {
        if(editMode.enable && editMode.lineNumber) {
            linesFromFile.insert(lineValue, editMode.lineNumber);
            editMode = new EditMode();
            prefix = '>>'
        }
    }

    static save() {
        ioFile.saveCurrentFile(linesFromFile.toArray())
    }

    static quit() {
        process.exit(0);
    }

    static default(line: string) {
        console.log('This command is not included: `' + line + '`');
    }
}