# Local Vercel Test Commands

## Install Vercel CLI (if not installed):
```bash
npm i -g vercel
```

## Test locally:
```bash
# Run Vercel dev server
vercel dev

# Test API endpoints:
curl http://localhost:3000/api/test
curl -X POST http://localhost:3000/api/check-protection-simple
```

## Or just deploy and test:
```bash
git add .
git commit -m "Fix: Use proper Vercel API directory structure"
git push origin main
```

## Expected API URLs after deployment:
- https://your-project.vercel.app/api/test
- https://your-project.vercel.app/api/check-protection-simple

## File Structure:
```
api/
  test.js                      ← /api/test
  check-protection-simple.js   ← /api/check-protection-simple
src/
  components/
    Contact.jsx               ← Uses /api/check-protection-simple
dist/                        ← Static site files
```
