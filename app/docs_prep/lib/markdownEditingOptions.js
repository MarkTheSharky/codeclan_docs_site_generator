const fileSpecificFrom = (file) => {
  switch (file.match(/app\/docs\/codeclan\/.*/gi)[0]) {
    case 'app/docs/codeclan/week_11/day_2/arrays_and_arraylists.md':
      return /(?<=So )ArrayList<Integer>(?= would)/i
    case 'app/docs/codeclan/week_14/day_4/react_router.md':
      return /(?<=Neither )<Router> or <Route>(?= are)/i
    case 'app/docs/codeclan/week_11/day_4/cc_towers.md':
      return /(?<! )<\/details>/i
    case 'app/docs/codeclan/week_03/day_3/flask_models_lab.md':
    case 'app/docs/codeclan/week_03/day_4/flask_templates_lab.md':
      return /(?<=the )<HEAD>(?= tag)/ig
    default:
      return /[]/
  }	
}

const fileSpecificTo = (match) => {
  switch (match) {
    case 'ArrayList<Integer>':
      return '`ArrayList<Integer>`'
    case '<Router> or <Route>':
      return '`<Router>` or `<Route>`'
    case '</details>':
      return '  </details>'
    case '<HEAD>':
      return '`<HEAD>`'
    default:
      console.log('Error in "to" callback, default called and match copied back');
      return match
  }	
}

module.exports = { fileSpecificFrom, fileSpecificTo }