/**
 * =============================================
 *  TEMPLATES CONFIG — Edit this file to add
 *  new n8n workflow templates weekly.
 *  No page code changes needed — just add
 *  a new object to the `templates` array.
 * =============================================
 */

export interface Template {
    id: string;
    name: string;
    slug: string;
    categories: string[];
    difficulty: "Beginner" | "Intermediate" | "Advanced";
    nodes: string[];
    nodeCount: number;
    setupTime: string;
    value: number;
    description: string;
    whatItDoes: string[];
    featured: boolean;
    /** Raw n8n workflow JSON — stored after admin upload */
    workflowJson?: Record<string, any> | null;
}

export const templates: Template[] = [
    {
        id: "1",
        name: "Real Estate Lead Capture & Notification",
        slug: "real-estate-lead-capture",
        categories: ["Real Estate", "Lead Management"],
        difficulty: "Beginner",
        nodes: ["Webhook", "Google Sheets", "Telegram", "Gmail"],
        nodeCount: 4,
        setupTime: "20 min",
        value: 200,
        description:
            "Instantly capture leads from any source, save to Google Sheets, and notify your team via Telegram and email.",
        whatItDoes: [
            "Receives leads via webhook from any website or form",
            "Saves lead data to Google Sheets automatically",
            "Sends instant Telegram alert to agent",
            "Sends welcome email to lead within seconds",
        ],
        featured: false,
        workflowJson: {
        "name": "Real Estate - AI Lead Scoring - v1",
        "nodes": [
            {
                "parameters": {
                    "httpMethod": "POST",
                    "path": "lead-scoring",
                    "options": {}
                },
                "type": "n8n-nodes-base.webhook",
                "typeVersion": 2.1,
                "position": [
                    0,
                    0
                ],
                "id": "287161ad-43ae-48f1-adda-79ab862949ce",
                "name": "Webhook",
                "webhookId": "552e9c22-3549-4e66-8e72-1bc1776a7646"
            },
            {
                "parameters": {
                    "promptType": "define",
                    "text": "=Score this real estate lead:\n\nName: {{ $json.body.name }}\nBudget: {{ $json.body.budget }}\nTimeline: {{ $json.body.timeline }}\nLocation: {{ $json.body.location }}\nMessage: {{ $json.body.message }}\nPre-approved: {{ $json.body.preapproved }}",
                    "messages": {
                        "messageValues": [
                            {
                                "message": "=You are a real estate lead qualification expert. Score leads from 1-10 based on buying readiness.  Scoring criteria: - Budget clearly stated and realistic = +3 points - Timeline is within 3 months = +3 points   - Specific location preference = +2 points - Has financing ready or pre-approved = +2 points - Vague budget or \"just looking\" = -3 points - Timeline more than 6 months = -2 points - No specific requirements = -2 points  You MUST respond with ONLY valid JSON. No explanation. No markdown. No extra text. Exactly this format: {\"score\": 8, \"reason\": \"Pre-approved buyer, 30-day timeline, specific area\", \"category\": \"HOT\"}  Category rules: - score 7-10 = HOT - score 4-6 = WARM   - score 1-3 = COLD"
                            }
                        ]
                    },
                    "batching": {}
                },
                "type": "@n8n/n8n-nodes-langchain.chainLlm",
                "typeVersion": 1.9,
                "position": [
                    208,
                    0
                ],
                "id": "3346b090-e5b3-4821-9eb3-18c904a805fa",
                "name": "Basic LLM Chain"
            },
            {
                "parameters": {
                    "model": "arcee-ai/trinity-large-preview:free",
                    "options": {}
                },
                "type": "@n8n/n8n-nodes-langchain.lmChatOpenRouter",
                "typeVersion": 1,
                "position": [
                    208,
                    96
                ],
                "id": "d66536c0-b496-4a0b-a6fc-3fbec7e9d09d",
                "name": "OpenRouter Chat Model",
                "credentials": {
                    "openRouterApi": {
                        "id": "d2qczGeArSVtsV1I",
                        "name": "OpenRouter account"
                    }
                }
            },
            {
                "parameters": {
                    "jsCode": "const items = $input.all();\nconst rawText = items[0].json.text || \n                items[0].json.output || \n                items[0].json.message?.content || \n                items[0].json.content || '';\n\n// Clean the response\nconst cleaned = rawText\n  .replace(/```json/g, '')\n  .replace(/```/g, '')\n  .trim();\n\ntry {\n  const parsed = JSON.parse(cleaned);\n  \n  // Visual score bar\n  const score = parseInt(parsed.score);\n  const safeScore = Math.max(0, Math.min(10, score)); // clamp 0-10\n  const bars = '🟩'.repeat(safeScore) + '⬜'.repeat(10 - safeScore);\n  \n  // Category emoji\n  const categoryEmoji = \n    parsed.category === 'HOT' ? '🔥' :\n    parsed.category === 'WARM' ? '🌤️' : '🧊';\n\n  return [{\n    json: {\n      score: score,\n      safeScore: safeScore,\n      bars: bars,\n      category: parsed.category,\n      categoryEmoji: categoryEmoji,\n      reason: parsed.reason,\n      name: $('Webhook').first().json.name,\n      email: $('Webhook').first().json.email,\n      phone: $('Webhook').first().json.phone,\n      budget: $('Webhook').first().json.budget,\n      timeline: $('Webhook').first().json.timeline,\n      location: $('Webhook').first().json.location,\n      message: $('Webhook').first().json.message\n    }\n  }];\n\n} catch(e) {\n  return [{\n    json: {\n      score: 5,\n      safeScore: 5,\n      bars: '🟩🟩🟩🟩🟩⬜⬜⬜⬜⬜',\n      category: 'WARM',\n      categoryEmoji: '🌤️',\n      reason: 'Could not parse AI response',\n      name: $('Webhook').first().json.name,\n      email: $('Webhook').first().json.email,\n      phone: $('Webhook').first().json.phone,\n      budget: $('Webhook').first().json.budget,\n      timeline: $('Webhook').first().json.timeline,\n      location: $('Webhook').first().json.location,\n      message: $('Webhook').first().json.message\n    }\n  }];\n}"
                },
                "type": "n8n-nodes-base.code",
                "typeVersion": 2,
                "position": [
                    464,
                    0
                ],
                "id": "9dd6aff9-fdc1-4aef-bb8c-62d503b33dbf",
                "name": "Code in JavaScript"
            },
            {
                "parameters": {
                    "conditions": {
                        "options": {
                            "caseSensitive": true,
                            "leftValue": "",
                            "typeValidation": "strict",
                            "version": 3
                        },
                        "conditions": [
                            {
                                "id": "fd4309c8-d971-4d09-83a6-3125d3247286",
                                "leftValue": "={{$json.score}}",
                                "rightValue": 7,
                                "operator": {
                                    "type": "number",
                                    "operation": "gte"
                                }
                            }
                        ],
                        "combinator": "and"
                    },
                    "options": {}
                },
                "type": "n8n-nodes-base.if",
                "typeVersion": 2.3,
                "position": [
                    592,
                    0
                ],
                "id": "7404d51b-c122-49db-9dec-72eaae86c573",
                "name": "If"
            },
            {
                "parameters": {
                    "chatId": "6650991396",
                    "text": "=🔥🔥 HOT LEAD ALERT! 🔥🔥\n\n👤 Name: {{ $('Webhook').item.json.body.name }}\n📧 Email: {{ $('Webhook').item.json.body.email }}\n📱 Phone: {{ $('Webhook').item.json.body.phone }}\n💰 Budget: {{ $('Webhook').item.json.body.budget }}\n📅 Timeline: {{ $('Webhook').item.json.body.timeline }}\n\n{{$json.categoryEmoji}} Category: {{$json.category}}\n📊 Score: {{$json.bars}} {{$json.score}}/10\n💡 Reason: {{$json.reason}}\n\n⚡ CALL THEM NOW!",
                    "additionalFields": {
                        "appendAttribution": false
                    }
                },
                "type": "n8n-nodes-base.telegram",
                "typeVersion": 1.2,
                "position": [
                    784,
                    -112
                ],
                "id": "f27df74f-840d-4b3e-8fd1-929a34a62973",
                "name": "Send a text message",
                "webhookId": "b58243ad-1fa4-43d3-8338-25227db65955",
                "credentials": {
                    "telegramApi": {
                        "id": "LsrehUxLtkb7hZZ6",
                        "name": "n8n Support"
                    }
                }
            },
            {
                "parameters": {
                    "sendTo": "={{ $('Webhook').item.json.body.email }}",
                    "subject": "={{ $('Webhook').item.json.body.name }}, let's find your perfect home this week!",
                    "emailType": "text",
                    "message": "=Hi {{ $('Webhook').item.json.body.name }},\n\nThank you for reaching out — based on what you \nshared, I think I can find exactly what you're \nlooking for in {{ $('Webhook').item.json.body.location }}!\n\nI have some great options in your budget that \njust came on the market.\n\nCan we schedule a quick 15-minute call?\n👉 Book here: calendly.com/sarahchen\n\nI have availability tomorrow and this weekend.\n\n- Sarah Chen\nKeller Williams Austin\n📞 512-641-5491",
                    "options": {
                        "appendAttribution": false
                    }
                },
                "type": "n8n-nodes-base.gmail",
                "typeVersion": 2.2,
                "position": [
                    992,
                    -112
                ],
                "id": "f53ca2d5-a0fb-48bb-bbe7-efd73e0ce441",
                "name": "Send a message",
                "webhookId": "ce26c410-a7b9-459c-9475-3eb4a1c1de4c",
                "credentials": {
                    "gmailOAuth2": {
                        "id": "hJQl0tXAqnbhWWHK",
                        "name": "Gmail account"
                    }
                }
            },
            {
                "parameters": {
                    "operation": "append",
                    "documentId": {
                        "__rl": true,
                        "value": "1afQLAmGeoHnC8s0CLyPRM868pU7Qc3crXKd595iKwxA",
                        "mode": "list",
                        "cachedResultName": "Real Estate",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1afQLAmGeoHnC8s0CLyPRM868pU7Qc3crXKd595iKwxA/edit?usp=drivesdk"
                    },
                    "sheetName": {
                        "__rl": true,
                        "value": 394185319,
                        "mode": "list",
                        "cachedResultName": "Lead Scores",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1afQLAmGeoHnC8s0CLyPRM868pU7Qc3crXKd595iKwxA/edit#gid=394185319"
                    },
                    "columns": {
                        "mappingMode": "defineBelow",
                        "value": {
                            "Name": "={{ $('Webhook').item.json.body.name }}",
                            "Email": "={{ $('Webhook').item.json.body.email }}",
                            "Budget": "={{ $('Webhook').item.json.body.budget }}",
                            "Timeline": "={{ $('Webhook').item.json.body.timeline }}",
                            "Score": "={{ $('If').item.json.score }}",
                            "Reason": "={{ $('If').item.json.reason }}",
                            "Category": "={{ $('If').item.json.category }}",
                            "Date": "={{ $today }}",
                            "Action Taken": "Booking Email Sent"
                        },
                        "matchingColumns": [],
                        "schema": [
                            {
                                "id": "Name",
                                "displayName": "Name",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Email",
                                "displayName": "Email",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Score",
                                "displayName": "Score",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Category",
                                "displayName": "Category",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Reason",
                                "displayName": "Reason",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Budget",
                                "displayName": "Budget",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Timeline",
                                "displayName": "Timeline",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Date",
                                "displayName": "Date",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Action Taken",
                                "displayName": "Action Taken",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true,
                                "removed": false
                            }
                        ],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                    },
                    "options": {}
                },
                "type": "n8n-nodes-base.googleSheets",
                "typeVersion": 4.7,
                "position": [
                    1200,
                    -112
                ],
                "id": "9580eb6c-b941-4b91-a7f3-aec199cee226",
                "name": "Append row in sheet",
                "credentials": {
                    "googleSheetsOAuth2Api": {
                        "id": "xr5VWRDYEvKD0g2D",
                        "name": "Google Sheets account"
                    }
                }
            },
            {
                "parameters": {
                    "conditions": {
                        "options": {
                            "caseSensitive": true,
                            "leftValue": "",
                            "typeValidation": "strict",
                            "version": 3
                        },
                        "conditions": [
                            {
                                "id": "fd4309c8-d971-4d09-83a6-3125d3247286",
                                "leftValue": "={{$json.score}}",
                                "rightValue": 4,
                                "operator": {
                                    "type": "number",
                                    "operation": "gte"
                                }
                            }
                        ],
                        "combinator": "and"
                    },
                    "options": {}
                },
                "type": "n8n-nodes-base.if",
                "typeVersion": 2.3,
                "position": [
                    768,
                    176
                ],
                "id": "e7063e1e-9afd-4cca-ab7c-ab95f7a1df51",
                "name": "If1"
            },
            {
                "parameters": {
                    "sendTo": "={{ $('Webhook').item.json.body.email }}",
                    "subject": "=Great homes available in {{ $('Webhook').item.json.body.location }}, {{ $('Webhook').item.json.body.name }}",
                    "emailType": "text",
                    "message": "=Hi {{ $('Webhook').item.json.body.name }},\n\nThanks for getting in touch about homes \nin {{ $('Webhook').item.json.body.location }}!\n\nI'm putting together a list of properties \nthat match what you're looking for.\n\nWhen you're ready to take the next step,\nI'm here to help.\n\nAny questions? Just reply!\n\n- Sarah Chen\nKeller Williams Austin",
                    "options": {
                        "appendAttribution": false
                    }
                },
                "type": "n8n-nodes-base.gmail",
                "typeVersion": 2.2,
                "position": [
                    992,
                    64
                ],
                "id": "c57ae193-5924-40ce-96f8-30cf9caeca09",
                "name": "Send a message1",
                "webhookId": "32ead8c3-ccd0-40f6-86dd-d1b698a84e75",
                "credentials": {
                    "gmailOAuth2": {
                        "id": "hJQl0tXAqnbhWWHK",
                        "name": "Gmail account"
                    }
                }
            },
            {
                "parameters": {
                    "operation": "append",
                    "documentId": {
                        "__rl": true,
                        "value": "1afQLAmGeoHnC8s0CLyPRM868pU7Qc3crXKd595iKwxA",
                        "mode": "list",
                        "cachedResultName": "Real Estate",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1afQLAmGeoHnC8s0CLyPRM868pU7Qc3crXKd595iKwxA/edit?usp=drivesdk"
                    },
                    "sheetName": {
                        "__rl": true,
                        "value": 394185319,
                        "mode": "list",
                        "cachedResultName": "Lead Scores",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1afQLAmGeoHnC8s0CLyPRM868pU7Qc3crXKd595iKwxA/edit#gid=394185319"
                    },
                    "columns": {
                        "mappingMode": "defineBelow",
                        "value": {
                            "Action Taken": "Nurture Email Sent",
                            "Name": "={{ $('Webhook').item.json.body.name }}",
                            "Email": "={{ $('Webhook').item.json.body.email }}",
                            "Budget": "={{ $('Webhook').item.json.body.budget }}",
                            "Timeline": "={{ $('Webhook').item.json.body.timeline }}",
                            "Date": "={{ $now.format('DD') }}",
                            "Reason": "={{ $('If1').item.json.reason }}",
                            "Score": "={{ $('If1').item.json.score }}",
                            "Category": "={{ $('If1').item.json.category }}"
                        },
                        "matchingColumns": [],
                        "schema": [
                            {
                                "id": "Name",
                                "displayName": "Name",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Email",
                                "displayName": "Email",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Score",
                                "displayName": "Score",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Category",
                                "displayName": "Category",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Reason",
                                "displayName": "Reason",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Budget",
                                "displayName": "Budget",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Timeline",
                                "displayName": "Timeline",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Date",
                                "displayName": "Date",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Action Taken",
                                "displayName": "Action Taken",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            }
                        ],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                    },
                    "options": {}
                },
                "type": "n8n-nodes-base.googleSheets",
                "typeVersion": 4.7,
                "position": [
                    1200,
                    64
                ],
                "id": "e49a3f8a-419f-4923-8a22-2f4cfebdff21",
                "name": "Append row in sheet1",
                "credentials": {
                    "googleSheetsOAuth2Api": {
                        "id": "xr5VWRDYEvKD0g2D",
                        "name": "Google Sheets account"
                    }
                }
            },
            {
                "parameters": {
                    "operation": "append",
                    "documentId": {
                        "__rl": true,
                        "value": "1afQLAmGeoHnC8s0CLyPRM868pU7Qc3crXKd595iKwxA",
                        "mode": "list",
                        "cachedResultName": "Real Estate",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1afQLAmGeoHnC8s0CLyPRM868pU7Qc3crXKd595iKwxA/edit?usp=drivesdk"
                    },
                    "sheetName": {
                        "__rl": true,
                        "value": 394185319,
                        "mode": "list",
                        "cachedResultName": "Lead Scores",
                        "cachedResultUrl": "https://docs.google.com/spreadsheets/d/1afQLAmGeoHnC8s0CLyPRM868pU7Qc3crXKd595iKwxA/edit#gid=394185319"
                    },
                    "columns": {
                        "mappingMode": "defineBelow",
                        "value": {
                            "Action Taken": "Saved for Later",
                            "Name": "={{ $('Webhook').item.json.body.name }}",
                            "Email": "={{ $('Webhook').item.json.body.email }}",
                            "Budget": "={{ $('Webhook').item.json.body.budget }}",
                            "Timeline": "={{ $('Webhook').item.json.body.timeline }}",
                            "Date": "={{ $now }}",
                            "Score": "={{ $('Code in JavaScript').item.json.score }}",
                            "Reason": "={{ $('Code in JavaScript').item.json.reason }}",
                            "Category": "={{ $('Code in JavaScript').item.json.category }}"
                        },
                        "matchingColumns": [],
                        "schema": [
                            {
                                "id": "Name",
                                "displayName": "Name",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Email",
                                "displayName": "Email",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Score",
                                "displayName": "Score",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Category",
                                "displayName": "Category",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Reason",
                                "displayName": "Reason",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Budget",
                                "displayName": "Budget",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Timeline",
                                "displayName": "Timeline",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Date",
                                "displayName": "Date",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            },
                            {
                                "id": "Action Taken",
                                "displayName": "Action Taken",
                                "required": false,
                                "defaultMatch": false,
                                "display": true,
                                "type": "string",
                                "canBeUsedToMatch": true
                            }
                        ],
                        "attemptToConvertTypes": false,
                        "convertFieldsToString": false
                    },
                    "options": {}
                },
                "type": "n8n-nodes-base.googleSheets",
                "typeVersion": 4.7,
                "position": [
                    992,
                    240
                ],
                "id": "192ebd54-3512-4ab5-befe-194da6a1b70a",
                "name": "Append row in sheet2",
                "credentials": {
                    "googleSheetsOAuth2Api": {
                        "id": "xr5VWRDYEvKD0g2D",
                        "name": "Google Sheets account"
                    }
                }
            },
            {
                "parameters": {
                    "chatId": "6650991396",
                    "text": "=🧊 COLD LEAD saved\n\n👤 {{ $('Webhook').item.json.body.name }}\n📊 {{ $('Code in JavaScript').item.json.bars }} {{ $('Code in JavaScript').item.json.score }}/10\n💡 {{ $('Code in JavaScript').item.json.reason }}\n\nFiled for future follow-up.",
                    "additionalFields": {
                        "appendAttribution": false
                    }
                },
                "type": "n8n-nodes-base.telegram",
                "typeVersion": 1.2,
                "position": [
                    1200,
                    240
                ],
                "id": "db3dd3a6-0020-4615-af28-6f62fc4c3931",
                "name": "Send a text message1",
                "webhookId": "d55f7e90-61c4-4287-adef-bd0bb09da9a8",
                "credentials": {
                    "telegramApi": {
                        "id": "LsrehUxLtkb7hZZ6",
                        "name": "n8n Support"
                    }
                }
            }
        ],
        "pinData": {},
        "connections": {
            "OpenRouter Chat Model": {
                "ai_languageModel": [
                    [
                        {
                            "node": "Basic LLM Chain",
                            "type": "ai_languageModel",
                            "index": 0
                        }
                    ]
                ]
            },
            "Webhook": {
                "main": [
                    [
                        {
                            "node": "Basic LLM Chain",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Basic LLM Chain": {
                "main": [
                    [
                        {
                            "node": "Code in JavaScript",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Code in JavaScript": {
                "main": [
                    [
                        {
                            "node": "If",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "If": {
                "main": [
                    [
                        {
                            "node": "Send a text message",
                            "type": "main",
                            "index": 0
                        }
                    ],
                    [
                        {
                            "node": "If1",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Send a text message": {
                "main": [
                    [
                        {
                            "node": "Send a message",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Send a message": {
                "main": [
                    [
                        {
                            "node": "Append row in sheet",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "If1": {
                "main": [
                    [
                        {
                            "node": "Send a message1",
                            "type": "main",
                            "index": 0
                        }
                    ],
                    [
                        {
                            "node": "Append row in sheet2",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Send a message1": {
                "main": [
                    [
                        {
                            "node": "Append row in sheet1",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            },
            "Append row in sheet2": {
                "main": [
                    [
                        {
                            "node": "Send a text message1",
                            "type": "main",
                            "index": 0
                        }
                    ]
                ]
            }
        },
        "active": false,
        "settings": {
            "executionOrder": "v1",
            "binaryMode": "separate",
            "availableInMCP": false
        },
        "versionId": "cf197cf8-457f-4d7e-8695-47d5cccc7336",
        "meta": {
            "templateCredsSetupCompleted": true,
            "instanceId": "07682e85f9db861fd17fc2901579584589c7db1a02c4e6b7ff93194e7397128a"
        },
        "id": "Uca80DipBMoWBifX",
        "tags": []
    },
    },
    {
        id: "2",
        name: "3-Email Follow-Up Sequence",
        slug: "email-followup-sequence",
        categories: ["Real Estate", "Communication"],
        difficulty: "Beginner",
        nodes: ["Webhook", "Wait", "Gmail"],
        nodeCount: 5,
        setupTime: "25 min",
        value: 150,
        description:
            "Automatically send a timed 3-email follow-up sequence to every lead without any manual work.",
        whatItDoes: [
            "Sends instant welcome email on lead capture",
            "Waits 24 hours then sends follow-up email",
            "Waits 48 more hours then sends final check-in",
            "Works 24/7 even while you sleep",
        ],
        featured: false,
        workflowJson: null,
    },
    {
        id: "3",
        name: "Lead Routing by Area",
        slug: "lead-routing-by-area",
        categories: ["Real Estate", "Lead Management"],
        difficulty: "Intermediate",
        nodes: ["Webhook", "Google Sheets", "Edit Fields", "Switch", "Gmail", "Telegram"],
        nodeCount: 10,
        setupTime: "45 min",
        value: 300,
        description:
            "Automatically route incoming leads to the right agent based on their area preference using Switch node logic.",
        whatItDoes: [
            "Normalizes area data automatically",
            "Routes leads to correct agent (North/South/Downtown)",
            "Sends area-specific email and Telegram notification",
            "Logs all leads with assigned agent to Google Sheets",
        ],
        featured: false,
        workflowJson: null,
    },
    {
        id: "4",
        name: "Missed Call Auto-Response System",
        slug: "missed-call-auto-response",
        categories: ["Real Estate", "Communication"],
        difficulty: "Intermediate",
        nodes: ["Webhook", "Google Sheets", "Gmail", "Telegram", "Schedule"],
        nodeCount: 8,
        setupTime: "35 min",
        value: 400,
        description:
            "Never lose a lead from a missed call again. Auto-sends email response and delivers daily missed call summary every morning.",
        whatItDoes: [
            "Receives missed call webhook from GHL or any CRM",
            "Instantly emails the caller with callback message",
            "Sends Telegram alert to agent immediately",
            "Delivers formatted daily summary every morning at 8am",
        ],
        featured: false,
        workflowJson: null,
    },
    {
        id: "5",
        name: "AI Personalized Email Generator",
        slug: "ai-personalized-email",
        categories: ["Real Estate", "AI-Powered"],
        difficulty: "Intermediate",
        nodes: ["Webhook", "OpenAI/OpenRouter", "Gmail", "Google Sheets", "Telegram"],
        nodeCount: 5,
        setupTime: "30 min",
        value: 500,
        description:
            "GPT writes a unique personalized email for every single lead based on their specific interests, budget, and location.",
        whatItDoes: [
            "Reads lead interest, budget, and location",
            "GPT writes completely unique email for each lead",
            "Sends personalized email automatically",
            "Logs AI-generated content to Google Sheets",
            "Telegram preview of email sent to agent",
        ],
        featured: false,
        workflowJson: null,
    },
    {
        id: "6",
        name: "AI Lead Scoring System",
        slug: "ai-lead-scoring",
        categories: ["Real Estate", "AI-Powered", "Lead Management"],
        difficulty: "Advanced",
        nodes: ["Webhook", "OpenAI/OpenRouter", "Code", "IF", "Gmail", "Telegram", "Google Sheets"],
        nodeCount: 12,
        setupTime: "60 min",
        value: 800,
        description:
            "AI automatically scores every lead 1-10 and routes HOT leads to instant booking while filing cold leads for later.",
        whatItDoes: [
            "AI analyzes budget, timeline, location, pre-approval status",
            "Scores lead 1-10 with visual emoji score bar",
            "HOT leads (7+) get urgent alert + booking email instantly",
            "WARM leads get AI nurture email",
            "COLD leads saved for future follow-up",
            "All scores logged to Google Sheets",
        ],
        featured: false,
        workflowJson: null,
    },
    {
        id: "7",
        name: "Complete Real Estate Lead Machine",
        slug: "complete-lead-machine",
        categories: ["Real Estate", "AI-Powered", "Lead Management", "CRM"],
        difficulty: "Advanced",
        nodes: [
            "Webhook",
            "Edit Fields",
            "Google Sheets",
            "OpenAI/OpenRouter",
            "Code",
            "Switch",
            "IF",
            "Gmail",
            "Telegram",
            "Basic LLM Chain",
        ],
        nodeCount: 25,
        setupTime: "3 hours",
        value: 1497,
        description:
            "The complete done-for-you lead automation system. AI scoring + area routing + personalized emails + instant alerts + daily summaries.",
        whatItDoes: [
            "Captures and normalizes all lead data",
            "AI scores every lead 1-10 automatically",
            "Routes to correct agent by area (7 zones)",
            "HOT leads: booking email + urgent Telegram alert",
            "WARM leads: AI writes personalized follow-up email",
            "COLD leads: saved for future without wasting agent time",
            "All leads logged with score, category, agent, action taken",
            "Final confirmation message for every processed lead",
        ],
        featured: true,
        workflowJson: null,
    },
];

/** All unique categories across all templates */
export const templateCategories = [
    "All",
    "Real Estate",
    "AI-Powered",
    "Lead Management",
    "CRM",
    "Communication",
] as const;

export type TemplateCategory = (typeof templateCategories)[number];

/** Color map for category badges */
export const categoryColors: Record<string, string> = {
    "Real Estate": "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
    "AI-Powered": "bg-purple-500/15 text-purple-400 border-purple-500/20",
    "Lead Management": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    "CRM": "bg-orange-500/15 text-orange-400 border-orange-500/20",
    "Communication": "bg-blue-500/15 text-blue-400 border-blue-500/20",
};

/** Color map for difficulty badges */
export const difficultyColors: Record<string, string> = {
    "Beginner": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    "Intermediate": "bg-amber-500/15 text-amber-400 border-amber-500/20",
    "Advanced": "bg-red-500/15 text-red-400 border-red-500/20",
};
