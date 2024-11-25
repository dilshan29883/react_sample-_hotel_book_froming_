from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from models import Base, Booking as BookingModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

# MySQL Database URL (replace with your actual username, password, and database name)
DATABASE_URL = "mysql+pymysql://root:@localhost:3306/hotel_booking_db"

# Create the SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create a configured session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create the database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="HOTEL BOOKING")

# Add CORS middleware (allow connections from your React app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React app URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic model for the booking data
class BookingCreate(BaseModel):
    roomType: str
    checkInDate: str
    checkOutDate: str
    guests: int
    fullName: str
    email: str

# API endpoint for booking
@app.post("/api/book")
async def confirm_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    db_booking = BookingModel(
        room_type=booking.roomType,
        check_in_date=datetime.strptime(booking.checkInDate, "%Y-%m-%d").date(),
        check_out_date=datetime.strptime(booking.checkOutDate, "%Y-%m-%d").date(),
        guests=booking.guests,
        full_name=booking.fullName,
        email=booking.email
    )
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    
    return {"message": "Booking successful!", "booking_id": db_booking.id}
