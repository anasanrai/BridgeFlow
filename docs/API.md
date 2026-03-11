# BridgeFlow API Reference

**Last Updated:** March 11, 2026  
**API Version:** 1.0  
**Base URL:** `https://bridgeflow.agency/api`

---

## Table of Contents
1. [Authentication](#authentication)
2. [Rate Limiting](#rate-limiting)
3. [Response Format](#response-format)
4. [Admin Routes](#admin-routes)
5. [Public Routes](#public-routes)
6. [Payment Routes](#payment-routes)
7. [Integration Routes](#integration-routes)
8. [Webhooks](#webhooks)
9. [Error Codes](#error-codes)

---

## Authentication

### Admin Routes
Admin routes require a valid JWT token obtained via login.

**Login Endpoint**
```http
POST /api/admin/auth
Content-Type: application/json

{
  "email": "admin@bridgeflow.agency",
  "password": "your-password"
}

Response (200):
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "email": "admin@bridgeflow.agency",
    "role": "admin"
  }
}
```

**Usage in Requests**
```http
GET /api/admin/templates
Authorization: Bearer eyJhbGc...
```

### Public Routes
No authentication required, but rate-limited.

---

## Rate Limiting

Rate limits are applied per IP address using Upstash Redis.

| Endpoint | Limit | Window |
|----------|-------|--------|
| `/api/contact` | 5 | per hour |
| `/api/careers` | 5 | per hour |
| `/api/newsletter` | 10 | per day |
| `/api/audit` | 5 | per day |
| `/api/chat` | 30 | per hour |
| `/api/checkout` | 20 | per hour |

**Rate Limit Headers**
```http
X-RateLimit-Limit: 5
X-RateLimit-Remaining: 2
X-RateLimit-Reset: 1678992000
```

---

## Response Format

All API responses follow a consistent JSON structure:

### Success Response (2xx)
```json
{
  "success": true,
  "data": {
    // Resource data
  },
  "timestamp": 1678992000000
}
```

### Error Response (4xx, 5xx)
```json
{
  "success": false,
  "error": "Human-readable error message",
  "code": "ERROR_CODE",
  "timestamp": 1678992000000
}
```

---

## Admin Routes

All admin routes require authentication. Base path: `/api/admin`

### Content Management

#### Get Page Content
```http
GET /api/admin/content/[section]
Authorization: Bearer {token}

Parameters:
  section: string - Page section (e.g., "home", "services", "pricing")

Response (200):
{
  "success": true,
  "data": {
    "section": "home",
    "content": { /* page content */ },
    "updated_at": "2026-03-11T10:30:00Z"
  }
}
```

#### Update Page Content
```http
POST /api/admin/content/[section]
Authorization: Bearer {token}
Content-Type: application/json

{
  "content": {
    "hero": { /* updates */ },
    "features": [ /* updates */ ]
  }
}

Response (200):
{
  "success": true,
  "data": {
    "section": "home",
    "updated_at": "2026-03-11T10:31:00Z"
  }
}
```

### Settings Management

#### Get Site Settings
```http
GET /api/admin/settings
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "site_name": "BridgeFlow",
    "site_url": "https://bridgeflow.agency",
    "paypal_enabled": true,
    "stripe_enabled": true,
    "newsletter_enabled": true
  }
}
```

#### Update Site Settings
```http
POST /api/admin/settings
Authorization: Bearer {token}
Content-Type: application/json

{
  "paypal_enabled": true,
  "paypal_client_id": "new-client-id",
  "stripe_enabled": true
}

Response (200):
{
  "success": true,
  "data": { /* updated settings */ }
}
```

### Template Management

#### Get All Templates
```http
GET /api/admin/templates
Authorization: Bearer {token}

Query Parameters:
  page?: number (default: 1)
  limit?: number (default: 20)
  search?: string
  category?: string

Response (200):
{
  "success": true,
  "data": {
    "templates": [ /* template objects */ ],
    "total": 42,
    "page": 1,
    "limit": 20
  }
}
```

#### Create Template
```http
POST /api/admin/templates
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Lead Capture Workflow",
  "slug": "lead-capture-workflow",
  "description": "Capture leads and send email",
  "price": 19700,
  "difficulty": "beginner",
  "categories": ["Lead Management"],
  "nodes": ["Webhook", "Gmail", "Google Sheets"],
  "setup_time": "15 min",
  "image_url": "https://..."
}

Response (201):
{
  "success": true,
  "data": {
    "id": "uuid-123",
    "name": "Lead Capture Workflow",
    /* ... template data ... */
  }
}
```

#### Update Template
```http
PUT /api/admin/templates/:id
Authorization: Bearer {token}
Content-Type: application/json

{ /* template updates */ }

Response (200):
{
  "success": true,
  "data": { /* updated template */ }
}
```

#### Delete Template
```http
DELETE /api/admin/templates/:id
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": { "id": "uuid-123" }
}
```

### Workflow Management

#### Save Workflow
```http
POST /api/admin/templates/save-workflow
Authorization: Bearer {token}
Content-Type: application/json

{
  "template_id": "uuid-123",
  "workflow_json": { /* ReactFlow workflow data */ }
}

Response (200):
{
  "success": true,
  "data": { "template_id": "uuid-123", "saved_at": "2026-03-11T10:30:00Z" }
}
```

#### Process Template Image
```http
POST /api/admin/templates/process-image
Authorization: Bearer {token}
Content-Type: application/json

{
  "template_id": "uuid-123",
  "image_url": "https://...",
  "enhance": true
}

Response (200):
{
  "success": true,
  "data": {
    "processed_url": "https://cdn.bridgeflow.agency/..."
  }
}
```

### File Upload

#### Upload File
```http
POST /api/admin/upload
Authorization: Bearer {token}
Content-Type: multipart/form-data

File: [binary file data]

Response (200):
{
  "success": true,
  "data": {
    "url": "https://bridgeflow-storage.s3.amazonaws.com/...",
    "filename": "template-image.png",
    "size": 245000
  }
}
```

### Payment Data

#### Get Payments
```http
GET /api/admin/payments
Authorization: Bearer {token}

Query Parameters:
  page?: number
  limit?: number
  status?: "pending" | "completed" | "failed"
  start_date?: ISO string
  end_date?: ISO string

Response (200):
{
  "success": true,
  "data": {
    "payments": [ /* payment objects */ ],
    "total": 156,
    "total_revenue": 523400 // in cents
  }
}
```

#### Get Purchases
```http
GET /api/admin/purchases
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "purchases": [
      {
        "id": "uuid",
        "template_name": "Lead Capture Workflow",
        "buyer_email": "user@example.com",
        "amount": 19700,
        "purchased_at": "2026-03-11T10:30:00Z"
      }
    ]
  }
}
```

### AI Features

#### Enhance Image
```http
POST /api/admin/ai
Authorization: Bearer {token}
Content-Type: application/json

{
  "action": "enhance-image",
  "image_url": "https://...",
  "style": "professional"
}

Response (200):
{
  "success": true,
  "data": {
    "enhanced_url": "https://",
    "processing_time": 2500
  }
}
```

---

## Public Routes

### Contact Form

#### Submit Contact
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry about automation services",
  "message": "I would like to...",
  "phone": "+1-555-0123"  // optional
}

Response (200):
{
  "success": true,
  "data": {
    "id": "contact-123",
    "email_sent": true
  }
}
```

### Careers

#### Submit Application
```http
POST /api/careers
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "position": "Automation Engineer",
  "resume_url": "https://...",
  "cover_letter": "I am interested in..."
}

Response (200):
{
  "success": true,
  "data": {
    "application_id": "app-456"
  }
}
```

### Newsletter

#### Subscribe
```http
POST /api/newsletter
Content-Type: application/json

{
  "email": "subscriber@example.com"
}

Response (200):
{
  "success": true,
  "data": {
    "email": "subscriber@example.com",
    "subscribed_at": "2026-03-11T10:30:00Z"
  }
}
```

### Audit Requests

#### Request Free Audit
```http
POST /api/audit
Content-Type: application/json

{
  "company_name": "Acme Corp",
  "email": "contact@acme.com",
  "current_status": "We use multiple tools manually",
  "goals": "Automate lead management"
}

Response (200):
{
  "success": true,
  "data": {
    "audit_id": "audit-789",
    "scheduled_for": "2026-03-18T14:00:00Z"
  }
}
```

### Chat Widget

#### Send Message
```http
POST /api/chat
Content-Type: application/json

{
  "message": "How much does the lead capture template cost?",
  "conversation_id": "conv-123"  // optional, for multi-turn
}

Response (200):
{
  "success": true,
  "data": {
    "conversation_id": "conv-123",
    "response": "The lead capture template costs $197...",
    "timestamp": 1678992000000
  }
}
```

### Templates

#### Get Template Catalog
```http
GET /api/templates

Query Parameters:
  page?: number
  limit?: number
  category?: string
  difficulty?: "beginner" | "intermediate" | "advanced"
  search?: string
  sort?: "popular" | "newest" | "price"

Response (200):
{
  "success": true,
  "data": {
    "templates": [
      {
        "id": "uuid-1",
        "name": "Lead Capture Workflow",
        "slug": "lead-capture-workflow",
        "image_url": "https://...",
        "price": 19700,
        "difficulty": "beginner",
        "rating": 4.8,
        "purchases": 234
      }
    ],
    "total": 42,
    "page": 1
  }
}
```

#### Get Single Template
```http
GET /api/templates/:slug

Response (200):
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "name": "Lead Capture Workflow",
    "slug": "lead-capture-workflow",
    "description": "...",
    "content": { /* full template data */ },
    "reviews": [ /* user reviews */ ]
  }
}
```

#### Download Template
```http
POST /api/templates/:slug/download

Body (optional):
{
  "purchase_proof_id": "order-123"  // for purchased templates
}

Response (200):
{
  "success": true,
  "data": {
    "download_url": "https://cdn.bridgeflow.agency/templates/...",
    "filename": "lead-capture-workflow.json",
    "expires_at": "2026-03-11T21:30:00Z"
  }
}
```

### Checkout

#### Initialize Checkout
```http
POST /api/checkout
Content-Type: application/json

{
  "template_id": "uuid-1",
  "payment_method": "paypal",
  "email": "customer@example.com"
}

Response (200):
{
  "success": true,
  "data": {
    "order_id": "order-xyz",
    "amount": 19700,
    "currency": "USD"
  }
}
```

---

## Payment Routes

### PayPal

#### Create Order
```http
POST /api/paypal/create-order
Content-Type: application/json

{
  "packageSlug": "starter"  // or template_id
}

Response (200):
{
  "success": true,
  "data": {
    "orderId": "PAYPAL-ORDER-ID"
  }
}
```

#### Capture Order
```http
POST /api/paypal/capture-order
Content-Type: application/json

{
  "orderId": "PAYPAL-ORDER-ID",
  "packageSlug": "starter"
}

Response (200):
{
  "success": true,
  "data": {
    "success": true,
    "transactionId": "PAYPAL-TRANSACTION-ID",
    "buyerName": "John Doe",
    "buyerEmail": "john@example.com"
  }
}
```

---

## Integration Routes

### n8n Workflows

#### Get Workflow
```http
GET /api/n8n/workflow/:id

Response (200):
{
  "success": true,
  "data": {
    "id": "workflow-123",
    "name": "Lead Capture Workflow",
    "nodes": [ /* n8n nodes */ ],
    "connections": [ /* connections */]
  }
}
```

---

## Webhooks

### Stripe Payment Webhook

**Endpoint:** `POST /api/webhooks/stripe`

**Expected Headers:**
```
stripe-signature: t=timestamp,v1=signature
```

**Event Types:**
- `payment_intent.succeeded` - Payment completed
- `payment_intent.payment_failed` - Payment failed
- `charge.refunded` - Refund issued

**Response:**
```json
{
  "success": true,
  "event_id": "evt_1234567890"
}
```

### Moyasar Payment Webhook

**Endpoint:** `POST /api/webhooks/moyasar`

**Expected Headers:**
```
Authorization: Bearer {webhook_secret}
```

**Event Types:**
- `payment.paid` - Payment completed
- `payment.failed` - Payment failed

---

## Error Codes

| Code | Status | Description |
|------|--------|-------------|
| `AUTH_REQUIRED` | 401 | Authentication token missing or invalid |
| `RATE_LIMITED` | 429 | Rate limit exceeded |
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `RESOURCE_NOT_FOUND` | 404 | Requested resource does not exist |
| `CONFLICT` | 409 | Resource already exists (e.g., duplicate email) |
| `PAYMENT_FAILED` | 402 | Payment processing failed |
| `INTERNAL_ERROR` | 500 | Server error |

### Example Error Response
```json
{
  "success": false,
  "error": "Email is already subscribed",
  "code": "CONFLICT",
  "timestamp": 1678992000000
}
```

---

## Best Practices

### Request Formatting
- Use ISO 8601 for timestamps
- Use cents for currency values (e.g., $19.97 = 1997)
- Include proper Content-Type headers

### Error Handling
- Implement retry logic for transient failures
- Use exponential backoff for rate-limited requests
- Log all errors for debugging

### Security
- Always use HTTPS
- Never expose auth tokens in URLs
- Validate webhook signatures
- Use environment variables for sensitive data

---

## Postman Collection

A Postman collection with all endpoints is available in the `/docs` folder.

---

**For API support, contact:** [api-support@bridgeflow.agency](mailto:api-support@bridgeflow.agency)
