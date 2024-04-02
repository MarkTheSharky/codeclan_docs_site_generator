export function formatFolderName(folder) {

  let title = folder

  if (folder[folder.length-2] == 0) {
    title = folder.replace(/_0/g, ' ')
  } else {
    title = folder.replace(/_/g, ' ')
  }

  title = title.replace(/(^|\s)[a-z]/g,function(f){return f.toUpperCase();});

  return title

}