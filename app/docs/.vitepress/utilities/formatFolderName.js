export function formatFolderName(folder) {

  let title = folder;


  if (folder.endsWith('.md')) {
    title = folder.slice(0, -3)
  } else if (folder[folder.length-2] == 0) {
    title = folder.replace(/_0/g, ' ')
  }

  title = title.replace(/_/g, ' ')
  title = title.replace(/(^|\s)[a-z]/g,(m) => m.toUpperCase());

  return title

}