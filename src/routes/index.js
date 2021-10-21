import { Router } from "express"
import { v4 } from "uuid"

const routes = Router()

const books = []

function logRequest(req, res, next) {
  const { method, url } = req

  const logLabel = `[${method.toUpperCase()}] ${url}`

  console.log(logLabel)
  return next()
}
routes.use(logRequest)

routes.get("/books", (req, res) => {
  return res.json(books)
  const { name } = req.query

  const results = name
    ? books.filter((book) => book.name.includes(name))
    : books
  return res.json(results)
})

routes.post("/books", (req, res) => {
  const { id, name } = req.body
  const book = {
    id: v4(),
    name,
  }

  const bookExists = books.find(
    ((book) => book.id === id) && ((book) => book.name === name)
  )
  if (bookExists) {
    return res.status(409).send("Book already exists")
  }
  books.push(book)

  return res.status(201).json(book)
})

routes.put("/books/:id", (req, res) => {
  const { id } = req.params
  const { name } = req.body

  const newBook = {
    id,
    name,
  }
  const bookIndex = books.findIndex((book) => book.id === id)
  books[bookIndex] = newBook

  return res.json([newBook])
})

routes.delete("/books/:id", (req, res) => {
  const { id } = req.params
  const bookIndex = books.findIndex((book) => book.id === id)
  books.pop(bookIndex)
  return res.status(204).send()
})

export default routes
