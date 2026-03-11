# Contributing to BridgeFlow

**Last Updated:** March 11, 2026

---

## Welcome!

We appreciate your interest in contributing to BridgeFlow. This document provides guidelines and instructions for contributing to the project.

---

## Code of Conduct

- Be respectful and professional
- Provide constructive feedback
- Give credit and acknowledge contributions
- Report security issues privately (don't use public issues)

---

## Getting Started

### Prerequisites
- Node.js 18.x or later
- pnpm package manager
- GitHub account
- Text editor (VS Code recommended)

### Setup Development Environment

```bash
# Clone your fork
git clone git@github.com:YOUR-USERNAME/BridgeFlow.git
cd BridgeFlow

# Add upstream remote
git remote add upstream git@github.com:anasanrai/BridgeFlow.git

# Install dependencies
pnpm install

# Create .env.local (copy from .env.example)
cp .env.example .env.local

# Start development server
pnpm dev
```

Visit `http://localhost:3000` to see your changes.

---

## Development Workflow

### 1. Create a Branch
```bash
# Fetch latest changes
git fetch upstream

# Create feature branch from upstream/main
git checkout -b feature/your-feature-name upstream/main
```

### 2. Make Changes

**Code Standards:**
- Use TypeScript (no `any` types)
- Write functional React components with hooks
- Use PascalCase for component names
- Use camelCase for functions/variables
- Add JSDoc comments for public functions

**Component Example:**
```tsx
'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

/**
 * Reusable button component
 * @param children - Button text or content
 * @param onClick - Click handler
 * @param variant - Visual variant
 */
export default function Button({ 
  children, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition',
        variant === 'primary' ? 'bg-gradient-to-r from-amber-400 to-orange-500' : 'bg-gray-700'
      )}
    >
      {children}
    </button>
  )
}
```

### 3. Test Your Changes

```bash
# Run linting
pnpm lint

# Build locally (catches TypeScript errors)
pnpm build

# Test specific sections
# - Manual testing in browser
# - Check console for errors
# - Test on different screen sizes
```

### 4. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with descriptive message
git commit -m "feat: add new payment method support

- Implement Crypto wallet integration
- Add TypeScript types for wallet data
- Update API endpoint for wallet checkout"
```

**Commit Message Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Tests
- `chore`: Maintenance

### 5. Keep Your Branch Updated

```bash
# Fetch latest upstream changes
git fetch upstream

# Rebase your branch on upstream/main
git rebase upstream/main

# If conflicts, resolve them and continue
git rebase --continue
```

### 6. Push and Create Pull Request

```bash
# Push to your fork
git push origin feature/your-feature-name

# Go to GitHub and create a Pull Request
# against anasanrai/BridgeFlow:main
```

**PR Description Template:**
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation update
- [ ] Breaking change

## Related Issue
Fixes #123

## Changes
- Change 1
- Change 2

## Testing
How to test these changes

## Screenshots (if UI changes)
[Add screenshots]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests pass
- [ ] No breaking changes
```

### 7. Address Review Feedback

```bash
# Make requested changes
# Commit with descriptive message
git commit -m "refactor: address PR feedback on payment modal"

# Push updated commits
git push origin feature/your-feature-name
```

---

## File Structure & Organization

### Adding Components

Place components in appropriate folder:
- **Root level** (`components/`) - Shared across entire app
- **`components/admin/`** - Admin-only components
- **`components/templates/`** - Template marketplace
- **`components/forms/`** - Form components
- **`components/payments/`** - Payment-related
- **`components/ui/`** - UI primitives

**Component File Pattern:**
```
MyComponent.tsx (2-300 lines max)
├─ Props interface
├─ Component function
└─ Export default
```

### Adding API Routes

Place in `src/app/api/`:
- `admin/` - Protected admin endpoints
- `public/` - Public endpoints (rate-limited)
- `webhooks/` - External service webhooks

**API Route Pattern:**
```typescript
export async function POST(request: Request) {
  try {
    // Validate input
    // Process request
    // Return response
    return Response.json({ success: true, data: {} })
  } catch (error) {
    return Response.json(
      { success: false, error: 'Error message' },
      { status: 500 }
    )
  }
}
```

---

## Testing

### Manual Testing Checklist
- [ ] Test on Chrome/Firefox/Safari
- [ ] Test on mobile (responsive design)
- [ ] Test with JavaScript disabled (basic functionality)
- [ ] Test forms with invalid input
- [ ] Test payment flows in sandbox mode

### Error Cases to Test
- Network timeouts
- Invalid API responses
- Missing environment variables
- Rate limits
- Database connection failures

---

## Documentation

### Update When:
- Adding new API endpoint → Update [API.md](../docs/API.md)
- Changing architecture → Update [ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- Fixing deployment issue → Update [TROUBLESHOOTING.md](../docs/TROUBLESHOOTING.md)
- Adding new feature → Update relevant docs

### Code Comments Guide
```typescript
// Use for brief explanations
const data = processData(input) // Normalize to lowercase

// Use JSDoc for functions
/**
 * Retrieves user profile and purchase history
 * @param userId - User's unique identifier
 * @returns Promise resolving to user profile object
 * @throws Error if user not found
 */
async function getUserProfile(userId: string) {
  // Implementation
}

// Use for complex logic explanations
// Calculate total with tax: subtotal * (1 + tax_rate)
// This approach is used due to floating point precision
const total = Math.round(subtotal * (100 + taxRate)) / 100
```

---

## Performance Considerations

### Before Submitting:
- [ ] Checked bundle size impact (`next/image` for images)
- [ ] Used dynamic imports for large components
- [ ] Avoided unnecessary re-renders (memoization)
- [ ] Optimized database queries
- [ ] Added proper error boundaries

### Common Optimizations:
```tsx
// Use dynamic imports for heavy components
const PaymentModal = dynamic(() => import('@/components/PaymentModal'), {
  loading: () => <LoadingSkeleton />,
  ssr: false
})

// Memoize expensive computations
const totalPrice = useMemo(() => calculateTotal(items), [items])

// Use useCallback for event handlers
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies])
```

---

## Security Guidelines

When contributing:
- Never commit `.env.local` or secrets
- Validate all user input server-side
- Use parameterized queries (Supabase handles this)
- Implement rate limiting for public endpoints
- Sanitize output to prevent XSS
- Use HTTPS for external requests
- Don't hardcode API keys or tokens

---

## Reporting Bugs

### Create an Issue if:
- You found a bug
- Feature not working as expected
- Documentation is unclear
- Performance issue

### Issue Template:
```markdown
## Description
Clear description of the issue

## Steps to Reproduce
1. Go to...
2. Click on...
3. See the error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Screenshots
[If applicable]

## Environment
- OS: [e.g. macOS]
- Browser: [e.g. Chrome]
- Version: [e.g. 1.0.0]

## Additional Context
Any other relevant info
```

---

## Feature Requests

### Create a Discussion or Issue if:
- You have an idea for improving BridgeFlow
- A feature would benefit the project

**Include:**
- Use case for the feature
- Expected behavior
- Why it's important
- Examples if applicable

---

## Release Process

### Version Numbering
Uses Semantic Versioning: `MAJOR.MINOR.PATCH`
- `MAJOR` - Breaking changes
- `MINOR` - New features (backward compatible)
- `PATCH` - Bug fixes

### Release Checklist
- [ ] All PRs merged and tested
- [ ] CHANGELOG.md updated
- [ ] Version number bumped in package.json
- [ ] Documentation updated
- [ ] Built and tested locally
- [ ] Tag created in GitHub
- [ ] Release notes written
- [ ] Deployed to production

---

## Getting Help

- **Questions about contributing?** Open an issue labeled "question"
- **Need help with setup?** Check [docs/TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Want to discuss ideas?** Start a GitHub Discussion
- **Found a security issue?** Email: [security@bridgeflow.agency](mailto:security@bridgeflow.agency)

---

## Thank You!

Your contributions help make BridgeFlow better for everyone. We appreciate your time and effort!

---

**Happy coding! 🚀**
