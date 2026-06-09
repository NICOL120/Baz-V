# 🔌 BAZ API Routes - Vision 2.0

**Complete REST API Documentation for BAZ Fund Manager**

---

## Base URL

```
http://localhost:3000/api
```

---

## Endpoints

### 1. Status - Get Portfolio & Benchmark Data

**Endpoint:** `GET /api/status`

**Description:** Get current portfolio state and benchmark comparison

**Query Parameters:** None

**Response:**
```json
{
  "success": true,
  "portfolio": {
    "totalUsd": 1250.45,
    "holdings": {
      "BTCUSDT": {
        "asset": "BTC",
        "quantity": 0.02,
        "price": 63500,
        "value": 1270,
        "percent": 56
      },
      "ETHUSDT": {
        "asset": "ETH",
        "quantity": 0.2,
        "price": 3000,
        "value": 600,
        "percent": 24
      },
      "USDT": {
        "asset": "USDT",
        "quantity": 0,
        "price": 1,
        "value": 380.45,
        "percent": 20
      }
    },
    "lastUpdated": "2026-06-09T14:30:00Z"
  },
  "benchmarks": {
    "IHSG": {
      "name": "Indonesian Stock Index",
      "change24h": 0.5
    },
    "S&P500": {
      "name": "US Stock Index",
      "change24h": 0.3
    },
    "GOLD": {
      "name": "Gold (XAUUSD)",
      "change24h": -0.2
    },
    "BTC": {
      "name": "Bitcoin",
      "change24h": 2.1
    },
    "TOP100CRYPTO": {
      "name": "Top 100 Crypto Index",
      "change24h": 1.8
    },
    "USD": {
      "name": "USD/IDR Parity",
      "change24h": 0.1
    }
  },
  "performance": {
    "portfolio": {
      "value": 1250.45,
      "return": 25.0,
      "baselineValue": 1000
    },
    "comparison": {
      "vsIHSG": "+24.5%",
      "vsSP500": "+24.7%",
      "vsGold": "+25.2%",
      "vsBTC": "+22.9%",
      "vsTop100Crypto": "+23.2%",
      "vsUSD": "+24.9%"
    }
  },
  "analysis": {
    "marketPhase": "mid-bull",
    "riskStatus": "HIGH_CONFIDENCE",
    "confidence": 72,
    "benchmarkBeating": 5
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Portfolio fetch failed",
  "details": "Error message here"
}
```

---

### 2. Trade - Execute Manual Cycle or Get Info

**Endpoint:** `POST /api/trade`

**Description:** Manually trigger a fund manager cycle

**Request Body:** None (empty POST)

**Response:**
```json
{
  "success": true,
  "cycle": {
    "timestamp": "2026-06-09T14:35:00Z",
    "duration": 2340,
    "portfolio": {
      "totalUsd": 1280.50,
      "holdings": { }
    },
    "trades": [
      {
        "success": true,
        "symbol": "ETHUSDT",
        "action": "BUY",
        "quantity": 0.1,
        "price": 3005,
        "totalUsd": 300.50,
        "timestamp": "2026-06-09T14:35:30Z",
        "rationale": "DeFi expansion + bull market + whale accumulation"
      }
    ],
    "analysis": {
      "marketPhase": "mid-bull",
      "riskStatus": "HIGH_CONFIDENCE",
      "confidence": 72,
      "benchmarkBeating": 5
    }
  }
}
```

**Get Info:**

**Endpoint:** `GET /api/trade`

**Description:** Get API endpoint documentation

**Response:**
```json
{
  "endpoint": "/api/trade",
  "methods": ["GET", "POST"],
  "description": "Trigger autonomous fund manager cycle or get this info",
  "usage": {
    "GET": "Returns this documentation",
    "POST": "Manually triggers one cycle execution"
  },
  "examples": {
    "get": "curl http://localhost:3000/api/trade",
    "post": "curl -X POST http://localhost:3000/api/trade"
  }
}
```

---

### 3. Fund Manager - Get History, Performance, or Summary

**Endpoint:** `GET /api/fund-manager?section=SECTION`

**Query Parameters:**
- `section` (string): One of `history`, `performance`, `summary`
- `limit` (number): Max records to return (default: 50, max: 500)

**Subsection: History**

```
GET /api/fund-manager?section=history&limit=10
```

**Response:**
```json
{
  "success": true,
  "section": "history",
  "data": [
    {
      "cycleNumber": 50,
      "timestamp": "2026-06-09T14:35:00Z",
      "duration": 2340,
      "portfolio": {
        "totalUsd": 1280.50,
        "holdings": { }
      },
      "trades": [
        {
          "success": true,
          "symbol": "ETHUSDT",
          "action": "BUY",
          "quantity": 0.1,
          "price": 3005,
          "rationale": "DeFi expansion"
        }
      ]
    },
    {
      "cycleNumber": 49,
      "timestamp": "2026-06-09T14:20:00Z",
      "duration": 1890,
      "portfolio": { },
      "trades": []
    }
  ]
}
```

**Subsection: Performance**

```
GET /api/fund-manager?section=performance
```

**Response:**
```json
{
  "success": true,
  "section": "performance",
  "data": {
    "ytd": {
      "return": "+25.0%",
      "benchmarks": {
        "IHSG": "+0.5%",
        "S&P500": "+0.3%",
        "GOLD": "-0.2%",
        "BTC": "+2.1%",
        "TOP100CRYPTO": "+1.8%"
      },
      "beating": 5,
      "sharpeRatio": 1.23,
      "maxDrawdown": "-15.2%",
      "winRate": "68%"
    },
    "monthly": [
      {
        "month": "June 2026",
        "return": "+12.5%",
        "trades": 15,
        "winRate": "73%"
      }
    ]
  }
}
```

**Subsection: Summary**

```
GET /api/fund-manager?section=summary
```

**Response:**
```json
{
  "success": true,
  "section": "summary",
  "data": {
    "overview": {
      "portfolio_value": 1250.45,
      "starting_value": 1000,
      "total_return": "+25.0%",
      "days_running": 180
    },
    "benchmarks_beaten": 5,
    "market_phase": "mid-bull",
    "recent_cycles": 50,
    "total_trades": 45,
    "win_rate": "68%",
    "risk_metrics": {
      "max_drawdown": "-15.2%",
      "current_drawdown": "-2.1%",
      "volatility": "45.2%",
      "sharpe_ratio": 1.23
    }
  }
}
```

---

### 4. Settings - Get or Update Configuration

**Endpoint:** `GET /api/settings`

**Description:** Get current fund manager settings

**Response:**
```json
{
  "success": true,
  "settings": {
    "allocationPercent": 70,
    "stablePercent": 30,
    "riskProfile": "balanced",
    "engine": "openclaw",
    "workerIntervalMinutes": 15,
    "watchlist": ["BTCUSDT", "ETHUSDT", "BNBUSDT", "SOLUSDT", "ADAUSDT"],
    "lastUpdated": "2026-06-09T10:00:00Z"
  }
}
```

---

**Endpoint:** `POST /api/settings`

**Description:** Update fund manager settings

**Request Body:**
```json
{
  "allocationPercent": 75,
  "stablePercent": 25,
  "riskProfile": "aggressive",
  "workerIntervalMinutes": 30
}
```

**Response:**
```json
{
  "success": true,
  "message": "Settings updated successfully",
  "settings": {
    "allocationPercent": 75,
    "stablePercent": 25,
    "riskProfile": "aggressive",
    "workerIntervalMinutes": 30,
    "lastUpdated": "2026-06-09T14:45:00Z"
  }
}
```

**Validation:**
- `allocationPercent`: 0-100 (must + stablePercent = 100)
- `stablePercent`: 0-100 (must + allocationPercent = 100)
- `riskProfile`: "conservative" | "balanced" | "aggressive"
- `workerIntervalMinutes`: 5-60

**Error Response:**
```json
{
  "success": false,
  "error": "Invalid settings",
  "details": {
    "allocationPercent": "Must be 0-100",
    "stablePercent": "Sum must equal 100 with allocation"
  }
}
```

---

## Error Handling

### Common Error Codes

| Code | Status | Meaning |
|------|--------|---------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid parameters |
| 401 | Unauthorized | API authentication failed |
| 404 | Not Found | Endpoint not found |
| 500 | Server Error | Internal server error |

### Error Response Format

```json
{
  "success": false,
  "error": "Error type",
  "message": "Human-readable error message",
  "details": {
    "field": "error detail"
  },
  "timestamp": "2026-06-09T14:45:00Z"
}
```

---

## Rate Limiting

- No rate limits for local development
- Production: 100 requests per minute per IP

---

## Authentication

Currently **NO authentication** for local development.

For production, add:
```
Authorization: Bearer <your_api_token>
```

---

## Examples

### cURL

**Get Status:**
```bash
curl http://localhost:3000/api/status
```

**Trigger Trade:**
```bash
curl -X POST http://localhost:3000/api/trade
```

**Get History:**
```bash
curl http://localhost:3000/api/fund-manager?section=history&limit=20
```

**Update Settings:**
```bash
curl -X POST http://localhost:3000/api/settings \
  -H "Content-Type: application/json" \
  -d '{
    "allocationPercent": 75,
    "stablePercent": 25,
    "riskProfile": "aggressive"
  }'
```

### JavaScript/Node.js

**Fetch Status:**
```javascript
const response = await fetch('http://localhost:3000/api/status');
const data = await response.json();
console.log(data.portfolio.totalUsd);
```

**Trigger Cycle:**
```javascript
const response = await fetch('http://localhost:3000/api/trade', {
  method: 'POST'
});
const data = await response.json();
console.log(`Trades executed: ${data.cycle.trades.length}`);
```

### Python

**Get Status:**
```python
import requests

response = requests.get('http://localhost:3000/api/status')
data = response.json()
print(f"Portfolio: ${data['portfolio']['totalUsd']}")
```

---

## Response Formats

### Success Response Structure
```json
{
  "success": true,
  "data": { /* endpoint-specific data */ },
  "timestamp": "2026-06-09T14:45:00Z"
}
```

### Error Response Structure
```json
{
  "success": false,
  "error": "Error type",
  "message": "Error description",
  "timestamp": "2026-06-09T14:45:00Z"
}
```

---

## Data Types

### Portfolio Object
```typescript
{
  totalUsd: number,
  holdings: {
    [symbol: string]: {
      asset: string,
      quantity: number,
      price: number,
      value: number,
      percent: number
    }
  },
  lastUpdated: string (ISO 8601)
}
```

### Trade Object
```typescript
{
  success: boolean,
  symbol: string,
  action: "BUY" | "SELL" | "HOLD",
  quantity: number,
  price: number,
  totalUsd: number,
  timestamp: string (ISO 8601),
  rationale?: string
}
```

### Performance Object
```typescript
{
  vsIHSG: string (e.g., "+25.0%"),
  vsSP500: string,
  vsGold: string,
  vsBTC: string,
  vsTop100Crypto: string,
  vsUSD: string
}
```

---

## WebSocket Support (Future)

Real-time updates via WebSocket:
```
ws://localhost:3000/ws/live
```

Messages:
- `portfolio_update` - Portfolio changes
- `trade_executed` - New trade
- `cycle_complete` - Cycle finished
- `error` - Error occurred

---

## Testing API

### Health Check
```bash
# Check if API is running
curl http://localhost:3000/api/status
```

### Full Workflow Test
```bash
# 1. Get status
curl http://localhost:3000/api/status

# 2. Get settings
curl http://localhost:3000/api/settings

# 3. Trigger cycle
curl -X POST http://localhost:3000/api/trade

# 4. Check history
curl http://localhost:3000/api/fund-manager?section=history&limit=1
```

---

## Troubleshooting

### 404 Not Found
- Check endpoint spelling
- Verify API is running: `npm run dev`
- Check port: default is 3000

### 500 Server Error
- Check `.env.local` configuration
- Verify Binance API credentials
- Check server logs: `npm run dev`

### No Data
- Portfolio might be empty
- Need to deposit USDT to Binance
- Wait for first cycle to complete

---

**API Version:** 2.0  
**Status:** Production Ready  
**Last Updated:** 2026-06-09
