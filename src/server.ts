import 'express-async-errors'
import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'

import {AppError} from "./errors/app.error";
import {router} from "./routes";

const app = express()
const PORT = 3333

app.use(express.json())

app.use(cors({
    origin: "*"
}))


app.use('/api', router)

function isAppError(err: any): err is AppError {
  return err instanceof AppError;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (isAppError(err)) {
    return res.status(err.status).json({
      error: true,
      message: err.message
    })
  }

  console.log(err)
  return res.status(500).json({
    error: 'Internal server error',
    message: err.message
  })
})

app.listen(PORT, () => {
      console.log(`Server running in port: ${PORT}`)
  }
)

export { app }