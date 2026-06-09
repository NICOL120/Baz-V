# ✅ Pre-Deployment Checklist

## System Readiness

- [x] Fund manager V2 implemented
- [x] All API endpoints created
- [x] Dashboard updated
- [x] Worker configured
- [x] Build verification passed
- [x] Documentation complete

---

## Before You Start

### Binance Account Preparation

- [ ] Have Binance account
- [ ] Verified identity
- [ ] 2FA enabled on account
- [ ] Withdrawal restrictions enabled (security)
- [ ] Ready to deposit USDT

### Binance API Setup

- [ ] Go to Binance Settings → API Management
- [ ] Create new API key with label "BAZ Fund Manager"
- [ ] **Permissions enabled:**
  - [ ] Enable Spot Trading
  - [ ] Enable Reading Account Trade History
  - [ ] Enable User Stream
  - [ ] **Disable:** Withdraw permissions
- [ ] Copy API Key
- [ ] Copy API Secret
- [ ] Set IP whitelist (recommended)
- [ ] Confirm in email

### Optional: OpenAI API (if using GPT-4)

- [ ] OpenAI account created
- [ ] API key generated
- [ ] Credit balance added
- [ ] Rate limit sufficient for trading

### Optional: OpenClaw Access

- [ ] Account created (if required)
- [ ] API access verified
- [ ] Testing passed

---

## Setup Steps

### Step 1: Environment Configuration

- [ ] Navigate to workspace root: `cd /workspaces/Baz-V`
- [ ] Create `.env.local` file:
  ```bash
  touch .env.local
  ```
- [ ] Add required variables:
  ```bash
  BINANCE_API_KEY=your_binance_api_key
  BINANCE_API_SECRET=your_binance_api_secret
  ```
- [ ] Add optional variables:
  ```bash
  OPENAI_API_KEY=sk-...
  USE_OPENCLAW=true
  ENGINE=openclaw
  WORKER_INTERVAL_MINUTES=15
  ALLOCATION_PERCENT=70
  STABLE_PERCENT=30
  RISK_PROFILE=balanced
  ```
- [ ] Verify no syntax errors

### Step 2: Dependencies

- [ ] Run `npm install`
- [ ] Wait for completion (2-5 minutes)
- [ ] Verify no errors

### Step 3: Build Verification

- [ ] Run `npm run build`
- [ ] Verify success message
- [ ] Check: "Compiled successfully"
- [ ] Note down build size info

### Step 4: Local Testing

- [ ] Terminal 1: `npm run dev`
- [ ] Wait for "ready on http://localhost:3000"
- [ ] Terminal 2: `npm run worker`
- [ ] Wait for "BAZ Fund Manager Worker dimulai"
- [ ] Open browser: http://localhost:3000
- [ ] See dashboard loading
- [ ] Check for errors in console

### Step 5: API Testing

- [ ] Test status endpoint:
  ```bash
  curl http://localhost:3000/api/status
  ```
- [ ] Should return JSON (might show errors without Binance balance)
- [ ] Test fund manager endpoint:
  ```bash
  curl http://localhost:3000/api/fund-manager?section=summary
  ```
- [ ] Should return JSON structure

### Step 6: Fund Your Account

- [ ] Go to Binance website
- [ ] Deposit USDT to spot wallet
- [ ] Minimum: $100 (recommended: $1,000+)
- [ ] Wait for confirmation (usually instant)
- [ ] Refresh dashboard: http://localhost:3000
- [ ] Should see portfolio value update within 5 minutes

### Step 7: Monitor First Cycle

- [ ] Wait 15 minutes for first trade cycle
- [ ] Check worker terminal for logs:
  ```
  🤖 BAZ Fund Manager - Autonomous Cycle
  📊 Fetching market data...
  💰 Portfolio Value: $...
  ```
- [ ] Refresh dashboard
- [ ] Should see "Recent Cycles" populated
- [ ] Check trades were executed
- [ ] Holdings should appear in Holdings table

---

## Monitoring

### Daily Checks

- [ ] Dashboard accessible at http://localhost:3000
- [ ] Portfolio Value showing correct USD amount
- [ ] Recent cycles executing (every 15 min)
- [ ] No error messages
- [ ] Worker process running in terminal

### Weekly Checks

- [ ] Total cycles increasing (should be ~670 per week)
- [ ] Performance vs benchmarks displayed
- [ ] Holdings updated with latest prices
- [ ] No accumulating errors in logs

### Monthly Review

- [ ] Portfolio value trend
- [ ] Which benchmarks you're beating
- [ ] Which benchmarks underperforming
- [ ] Consider adjusting risk profile if needed

---

## Troubleshooting Checklist

### Dashboard Not Loading

- [ ] Check: `npm run dev` still running (Terminal 1)
- [ ] Check: http://localhost:3000 (not other port)
- [ ] Check: Browser refresh
- [ ] Check: Console for errors (F12)
- [ ] Restart: Kill and `npm run dev` again

### Worker Not Trading

- [ ] Check: `npm run worker` still running (Terminal 2)
- [ ] Check: API keys in `.env.local` correct
- [ ] Check: Binance account has USDT balance
- [ ] Check: Binance API permissions enabled
- [ ] Check: Worker logs for error messages

### API Endpoints Returning Errors

- [ ] Check: Binance API key format
- [ ] Check: Binance API secret format
- [ ] Check: Network connection to Binance
- [ ] Check: Binance API status page
- [ ] Try: `curl -I https://api.binance.com/api/v3/ping`

### No Holdings Showing

- [ ] Check: USDT balance in Binance
- [ ] Check: Wait ~20 minutes for first trade
- [ ] Check: Verify trades executing in worker logs
- [ ] Check: Manually trigger: `curl -X POST http://localhost:3000/api/trade`

### Performance Data Missing

- [ ] Check: At least 1 cycle completed (15+ minutes running)
- [ ] Check: Dashboard tab: "Performance"
- [ ] Check: API endpoint: `curl http://localhost:3000/api/fund-manager?section=performance`
- [ ] Check: History tab refreshing

---

## Scaling Up

### When Confident (Week 2+)

- [ ] Increase USDT deposit in Binance
- [ ] Monitor system running smoothly
- [ ] No major errors or crashes
- [ ] Performance vs benchmarks acceptable

### Optimization Options

- [ ] Change `RISK_PROFILE` based on performance
- [ ] Adjust `ALLOCATION_PERCENT` if too conservative/aggressive
- [ ] Change `WORKER_INTERVAL_MINUTES` for faster/slower trading
- [ ] Monitor and gather 30 days data before major changes

---

## Production Considerations

### Before Moving to Production

- [ ] System running stable for 48+ hours
- [ ] All error cases handled gracefully
- [ ] Portfolio accumulated sufficient trades (50+)
- [ ] Comfortable with trading strategy
- [ ] Backup of `.env.local` in secure location

### Production Deployment

- [ ] Use production Binance account or bot-only account
- [ ] Enable all security measures:
  - [ ] IP whitelist on API
  - [ ] 2FA enabled
  - [ ] Withdrawal restrictions
  - [ ] Regular monitoring

### Ongoing Maintenance

- [ ] Daily monitoring (2 minutes)
- [ ] Weekly review (10 minutes)
- [ ] Monthly optimization (30 minutes)
- [ ] Quarterly audit (1 hour)

---

## Documentation Reference

| Document | Purpose | When to Read |
|----------|---------|------|
| QUICK_START.md | 60-second setup | First time setup |
| SETUP_FUND_MANAGER.md | Detailed setup | Troubleshooting |
| IMPLEMENTATION_SUMMARY.md | Technical details | Understanding system |
| DEPLOYMENT_READY.md | What's implemented | Project overview |
| This file | Checklist | During setup |

---

## Success Criteria

### Week 1
- [ ] System deployed and running
- [ ] Dashboard showing live data
- [ ] At least 50+ cycles executed
- [ ] Portfolio value updated
- [ ] No persistent errors

### Month 1
- [ ] 2,000+ cycles executed
- [ ] Holdings show real assets
- [ ] Performance data accumulated
- [ ] Comparing vs benchmarks
- [ ] System stability proven

### Quarter 1
- [ ] 26,000+ cycles executed
- [ ] Portfolio performance tracking
- [ ] Identifying best performing strategy
- [ ] Ready for increased funding

---

## Emergency Procedures

### Stop Everything Immediately

```bash
# Terminal 1: Stop dashboard
Ctrl+C

# Terminal 2: Stop worker
Ctrl+C
```

### Emergency Sell All

If market crash and need to liquidate:
```bash
# Manually via Binance app or website
# Or via API (add endpoint if needed)
```

### System Issues

```bash
# Check logs
cat logs.txt

# Restart clean
npm run build
npm run dev
npm run worker
```

---

## Contact & Support

- **Binance Issues:** https://www.binance.com/support
- **OpenAI Issues:** https://platform.openai.com/account/rate-limits
- **System Logs:** Check terminal output
- **API Debugging:** Use curl commands from QUICK_START.md

---

## ✅ Ready to Deploy!

- [ ] All checklist items completed
- [ ] System tested and verified
- [ ] Fund manager ready to trade
- [ ] Dashboard monitoring active
- [ ] Documentation reviewed

**Status: READY FOR DEPLOYMENT** ✅

---

*Use this checklist each time you deploy or troubleshoot*

*Last Updated: 2024-06-09*  
*Version: BAZ Fund Manager V2*
