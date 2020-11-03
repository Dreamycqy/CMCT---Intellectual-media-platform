import request from '../utils/request'

export function search(body, rSymbol) {
  return request.get({
    url: '/cmct/api/search',
    data: body,
    rSymbol,
  })
}

export function infoByUri(body, rSymbol) {
  return request.get({
    url: '/cmct/api/infoByUri',
    data: body,
    rSymbol,
  })
}

export function querygraphByUri(body, rSymbol) {
  return request.get({
    url: '/cmct/api/querygraphByUri',
    data: body,
    rSymbol,
  })
}

export function getClassTree(body, rSymbol) {
  return request.get({
    url: '/cmct/api/getClassTree',
    data: body,
    rSymbol,
  })
}
