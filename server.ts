import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.join(__dirname, 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const BRAND_FILE = path.join(DATA_DIR, 'brand_enquiries.json');
const CREATOR_FILE = path.join(DATA_DIR, 'creator_applications.json');

const readData = (filePath: string) => {
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

const writeData = (filePath: string, data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

app.use(express.json({ limit: '10mb' }));

// Health and routing status
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    targetEmail: 'business@creatorpoint.online',
    smtpConfigured: Boolean(process.env.SMTP_HOST || process.env.RESEND_API_KEY),
    timestamp: new Date().toISOString()
  });
});

// Brand enquiry endpoint
app.post('/api/enquiries/brand', (req, res) => {
  const {
    brandName,
    contactPerson,
    businessEmail,
    phone,
    website,
    campaignObjective,
    preferredPlatforms,
    estimatedBudget,
    campaignTimeline,
    campaignBrief
  } = req.body;

  if (!brandName || !contactPerson || !businessEmail || !phone || !campaignObjective || !campaignBrief) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in all required fields (Brand Name, Contact Person, Email, Phone, Objective, Brief).'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(businessEmail)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid business email address.'
    });
  }

  const newEntry = {
    id: `brand_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'brand_campaign',
    targetRecipient: 'business@creatorpoint.online',
    createdAt: new Date().toISOString(),
    status: 'recorded_and_queued',
    brandName,
    contactPerson,
    businessEmail,
    phone,
    website: website || '',
    campaignObjective,
    preferredPlatforms: preferredPlatforms || [],
    estimatedBudget: estimatedBudget || 'Not specified',
    campaignTimeline: campaignTimeline || 'Immediate',
    campaignBrief
  };

  const current = readData(BRAND_FILE);
  current.unshift(newEntry);
  writeData(BRAND_FILE, current);

  // Return confirmed receipt
  return res.json({
    success: true,
    id: newEntry.id,
    message: 'Enquiry securely stored and queued for dispatch to business@creatorpoint.online',
    destination: 'business@creatorpoint.online',
    savedAt: newEntry.createdAt
  });
});

// Creator registration endpoint
app.post('/api/enquiries/creator', (req, res) => {
  const {
    fullName,
    email,
    phone,
    city,
    primaryPlatform,
    profileUrl,
    contentNiche,
    followerCount,
    averageViews,
    introduction,
    consent
  } = req.body;

  if (!fullName || !email || !phone || !city || !primaryPlatform || !profileUrl || !contentNiche || !followerCount || !averageViews || !introduction) {
    return res.status(400).json({
      success: false,
      error: 'Please fill in all required fields to join our creator network.'
    });
  }

  if (!consent) {
    return res.status(400).json({
      success: false,
      error: 'You must provide consent for CreatorPoint to respond to your application.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.'
    });
  }

  const newEntry = {
    id: `creator_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    type: 'creator_application',
    targetRecipient: 'business@creatorpoint.online',
    createdAt: new Date().toISOString(),
    status: 'recorded_and_queued',
    fullName,
    email,
    phone,
    city,
    primaryPlatform,
    profileUrl,
    contentNiche,
    followerCount,
    averageViews,
    introduction,
    consent
  };

  const current = readData(CREATOR_FILE);
  current.unshift(newEntry);
  writeData(CREATOR_FILE, current);

  return res.json({
    success: true,
    id: newEntry.id,
    message: 'Application successfully submitted and queued for review at business@creatorpoint.online',
    destination: 'business@creatorpoint.online',
    savedAt: newEntry.createdAt
  });
});

// Fetch enquiries for internal verification modal / inbox
app.get('/api/enquiries', (req, res) => {
  const brands = readData(BRAND_FILE);
  const creators = readData(CREATOR_FILE);
  res.json({
    brands,
    creators,
    totalCount: brands.length + creators.length,
    destination: 'business@creatorpoint.online'
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CreatorPoint server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
