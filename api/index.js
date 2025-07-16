const data = {
  "payment-consents": [
    {
      "consentId": "pdc-001",
      "status": "AwaitingAuthorisation", 
      "creationDateTime": "2025-01-17T10:00:00Z",
      "amount": "2000.000",
      "currency": "AED",
      "creditorName": "John Doe",
      "creditorIBAN": "LT61900123456789"
    }
  ],
  "payments": [
    {
      "paymentId": "pmt-001",
      "status": "AcceptedSettlementInProcess",
      "creationDateTime": "2025-01-17T10:05:00Z", 
      "amount": "2000.000",
      "currency": "AED"
    }
  ],
  "consents": [
    {
      "consentId": "acc-consent-001",
      "status": "Authorised",
      "creationDateTime": "2025-01-17T09:00:00Z",
      "permissions": ["ReadAccounts", "ReadBalances"]
    }
  ]
}

export default function handler(req, res) {
  // Add UAE Open Banking compliant response headers
  res.setHeader('x-fapi-interaction-id', req.headers['x-fapi-interaction-id'] || 'default-interaction-id');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  
  const { method, query } = req
  const { path } = query
  
  if (method === 'GET') {
    if (path && path[0]) {
      const resource = path[0]
      if (data[resource]) {
        return res.status(200).json(data[resource])
      }
    }
    return res.status(200).json(data)
  }
  
  res.status(405).json({ message: 'Method not allowed' })
}
