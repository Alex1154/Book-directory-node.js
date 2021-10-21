import express from "express"
import bookRoute from "./routes/index.js"
const app = express()

app.use(express.json())
// Routes
app.use("/", bookRoute)
app.listen(3000, () => {
  console.log("server listening on http://localhost:3000")
})
