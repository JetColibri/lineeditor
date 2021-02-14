# Requirements:
Before you start make sure node.js is installed.

# Quick start: 
1) Clone the project to your machine.
2) After that run the following command to download dependencies: `npm install`.
3) Run the `tsc --init` command to generate and auto-populate the tsconfig.json file.
4) Now you can build a project with a `npm run build` command.
5) After that you can run the project with the command `npm run lineeditor <file path>`.


# List of command:
* `list` - output all lines in a file in n:xxx format.
* `del n` - delete line N, records after N are shifted by one position to the left.
* `ins n` -  insert new text into the line N. Existed text on the line N will be shifted to the right.
Note: if cursor inserted into a position larger than the last line, the existing space between last line and new one will be populated with empty lines.
* `save` - save changes to file.
* `quit` - exit the application and return to the command line.

# Note:
There is a problem with data types I haven't fixed yet. It is annotated with `@ts-ignore`.
This issue doesn't affect program's performance but could be fixed if needed.
