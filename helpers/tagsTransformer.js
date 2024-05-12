const tagsTransformer = (tagStr) => {
  if (typeof tagStr !== undefined) {
      const fixedTags = tagStr.replaceAll("~", ",").replaceAll("+", " ").split(",")
  return fixedTags
  }
  return "No tags"

}

module.exports = { tagsTransformer };