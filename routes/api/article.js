// GET articles API.
exports.list = (req, res, next) => {
req.collections.articles.find({}).toArray((error, articles) => {
    if (error) return next(error)
    res.send({articles: articles})
})
}
  
// POST article API.
exports.add = (req, res, next) => {
if (!req.body.article) return next(new Error('No article payload.'))
let article = req.body.article
article.published = false
req.collections.articles.insert(article, (error, articleResponse) => {
    if (error) return next(error)
    res.send(articleResponse)
})
}

// PUT article API.
exports.edit = (req, res, next) => {
if (!req.params.id) return next(new Error('No article ID.'))
req.collections.articles.updateById(req.params.id, {$set: req.body.article}, (error, count) => {
    if (error) return next(error)
    res.send({affectedCount: count})
})
}
  
// DELETE article API.
exports.del = (req, res, next) => {
if (!req.params.id) return next(new Error('No article ID.'))
req.collections.articles.removeById(req.params.id, (error, count) => {
    if (error) return next(error)
    res.send({affectedCount: count})
})
}