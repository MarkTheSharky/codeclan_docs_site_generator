module.exports = function unwantedFolderNames(file, path, stat) { 
    
    const unwanted = [
    // Hides everything that isn't a directory and isn't a .md file
    !stat.isDirectory() && !file.endsWith('.md'),
    // Hides everything that contains included string
    file.includes('start'),
    file.includes('end', 6), // This should keep folders titled 'weekend'
    // file.includes('start_point'),
    file.includes('end_point'),
    // file.includes('start_code'),
    file.includes('end_code'),
    file.includes('solution'),
    file.includes('tests'),
    // Hides everything that matches specifically to the given string
    file === 'src',
    file === 'images',
    file === 'img',
    file === 'code',
    file === 'start_code',
    file === 'start_point',
    file === 'lists_dictionaries_lab',
    file === 'presentation',
    file === 'EnumsEndPoint',
    file === 'airline_homework_mvp',
    file === 'airline_homework_advanced',
    
    
    // Hide the following README files located in week_** folders
    `${path}/${file}` === 'docs/codeclan/week_01/README.md'
    ]

    return unwanted.some(entry => entry === true)
}