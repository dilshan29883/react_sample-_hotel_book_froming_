from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Booking(Base):
    __tablename__ = 'bookings'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    room_type = Column(String(255))
    check_in_date = Column(Date)
    check_out_date = Column(Date)
    guests = Column(Integer)
    full_name = Column(String(255))
    email = Column(String(255))

