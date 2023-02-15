type ResponseData = {
  statusCode: number
  body: any
}

interface IController<RequestData> {
  handle(request: RequestData): Promise<ResponseData>
}

export { ResponseData, IController }