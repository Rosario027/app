from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class ConsultationRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    country_code: str
    looking_for: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ConsultationRequestCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    country_code: str
    looking_for: str

class MessageRequest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: Optional[str] = None
    email: Optional[str] = None
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MessageRequestCreate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    message: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Advocate Firm API"}

@api_router.post("/consultations", response_model=ConsultationRequest)
async def create_consultation_request(input: ConsultationRequestCreate):
    """Submit a consultation request"""
    consultation_dict = input.model_dump()
    consultation_obj = ConsultationRequest(**consultation_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = consultation_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.consultations.insert_one(doc)
    return consultation_obj

@api_router.get("/consultations", response_model=List[ConsultationRequest])
async def get_consultation_requests():
    """Get all consultation requests"""
    consultations = await db.consultations.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for consultation in consultations:
        if isinstance(consultation['timestamp'], str):
            consultation['timestamp'] = datetime.fromisoformat(consultation['timestamp'])
    
    return consultations

@api_router.post("/messages", response_model=MessageRequest)
async def create_message(input: MessageRequestCreate):
    """Submit a message"""
    message_dict = input.model_dump()
    message_obj = MessageRequest(**message_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = message_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.messages.insert_one(doc)
    return message_obj

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()