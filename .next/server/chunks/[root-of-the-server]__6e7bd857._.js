module.exports = {

"[project]/.next-internal/server/app/api/generate-ticket/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/lib/ticket-utils.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * Generate a unique serial number for the ticket
 * Format: VGE-{timestamp}-{random}
 */ __turbopack_context__.s({
    "fileToBase64": (()=>fileToBase64),
    "formatEventDate": (()=>formatEventDate),
    "generateSerialNumber": (()=>generateSerialNumber),
    "getRandomPosition": (()=>getRandomPosition),
    "validateImageFile": (()=>validateImageFile)
});
function generateSerialNumber() {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `VGE-${timestamp}-${random}`;
}
function fileToBase64(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = ()=>resolve(reader.result);
        reader.onerror = (error)=>reject(error);
    });
}
function validateImageFile(file) {
    const maxSize = 5 * 1024 * 1024 // 5MB
    ;
    const allowedTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ];
    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            error: 'Please upload a valid image file (JPEG, PNG, GIF, or WebP)'
        };
    }
    if (file.size > maxSize) {
        return {
            isValid: false,
            error: 'Image size must be less than 5MB'
        };
    }
    return {
        isValid: true
    };
}
function formatEventDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function getRandomPosition() {
    const positions = [
        {
            top: '10%',
            left: '10%'
        },
        {
            top: '10%',
            left: '80%'
        },
        {
            top: '80%',
            left: '10%'
        },
        {
            top: '80%',
            left: '80%'
        },
        {
            top: '50%',
            left: '5%'
        },
        {
            top: '50%',
            left: '85%'
        }
    ];
    return positions[Math.floor(Math.random() * positions.length)];
}
}}),
"[project]/src/app/api/generate-ticket/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ticket$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/ticket-utils.ts [app-route] (ecmascript)");
;
;
async function POST(request) {
    try {
        const body = await request.json();
        const { playerName, imageData } = body;
        // Validate required fields
        if (!playerName || !imageData) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Player name and image are required'
            }, {
                status: 400
            });
        }
        // Validate player name
        if (typeof playerName !== 'string' || playerName.trim().length === 0) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please provide a valid player name'
            }, {
                status: 400
            });
        }
        // Validate image data
        if (typeof imageData !== 'string' || !imageData.startsWith('data:image/')) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'Please provide a valid image'
            }, {
                status: 400
            });
        }
        // Generate unique serial number
        const serialNumber = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$ticket$2d$utils$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["generateSerialNumber"])();
        // Event details (can be made configurable later)
        const eventDetails = {
            name: 'Video Game Championship 2024',
            date: '2024-12-25',
            venue: 'Gaming Arena Center',
            time: '7:00 PM - 11:00 PM',
            category: 'VIP Access'
        };
        // Return ticket data
        const ticketData = {
            serialNumber,
            playerName: playerName.trim(),
            imageData,
            eventDetails,
            generatedAt: new Date().toISOString()
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(ticketData, {
            status: 200
        });
    } catch (error) {
        console.error('Error generating ticket:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Failed to generate ticket. Please try again.'
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__6e7bd857._.js.map