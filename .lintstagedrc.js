module.exports = {
  '*.{vue,htm,html,css,sss,less,scss,sass}': ['npm run fix:style', 'npm run prettier'],
  '*.{ts,tsx}': ['npm run fix:script', 'npm run prettier']
}
