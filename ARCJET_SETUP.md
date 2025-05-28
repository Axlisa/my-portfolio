# Portfolio with Arcjet Protection

This portfolio now includes Arcjet protection for the contact form API.

## Setup

1. **Environment Variables**: Make sure you have your Arcjet key in `.env.local`:
   ```
   ARCJET_ENV=development
   ARCJET_KEY=your_arcjet_key_here
   ```

2. **Dependencies**: Install all dependencies:
   ```bash
   npm install
   ```

## Development

### Local Development (Full-stack)
```bash
# Build the React app first
npm run build

# Start the server with Arcjet protection
bun run index.ts
# or
npm run start
```

### Frontend Development Only
```bash
npm run dev
```

## Production Deployment

### Vercel (Recommended)
The project is configured for Vercel with Edge Functions:
```bash
npm run deploy:vercel
```

### Manual Server Deployment
1. Build the React app: `npm run build`
2. Start the server: `bun run index.ts`

## API Endpoints

- `POST /api/contact` - Protected contact form submission

## Arcjet Protection Features

- **Shield**: Protection against common attacks (SQL injection, etc.)
- **Bot Detection**: Blocks bots while allowing search engines
- **Rate Limiting**: 5 requests per minute per IP for contact form
- **Spoofed Bot Detection**: Advanced bot verification

## Testing the Protection

1. Submit the contact form normally - should work
2. Submit rapidly multiple times - should get rate limited
3. Bot requests will be blocked automatically
