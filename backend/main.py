from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.requests import Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pyjwt import jwt

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

engine = create_engine('postgresql://user:password@localhost/dbname')

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)
    password = Column(String)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()

@app.post('/api/register')
async def register(user: User):
    db = next(get_db())
    db.add(user)
    db.commit()
    return {'message': 'User created successfully'}

@app.post('/api/login')
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    db = next(get_db())
    user = db.query(User).filter(User.username == form_data.username).first()
    if not user:
        return {'error': 'Invalid username or password'}
    if not jwt.decode(form_data.password, user.password):
        return {'error': 'Invalid username or password'}
    access_token = jwt.encode({'sub': user.username}, 'secret_key', algorithm='HS256')
    return {'access_token': access_token, 'token_type': 'bearer'}

@app.get('/api/users')
def get_users():
    db = next(get_db())
    users = db.query(User).all()
    return [{'id': user.id, 'username': user.username, 'email': user.email} for user in users]

@app.get('/api/users/{user_id}')
def get_user(user_id: int):
    db = next(get_db())
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {'error': 'User not found'}
    return {'id': user.id, 'username': user.username, 'email': user.email}

@app.put('/api/users/{user_id}')
async def update_user(user_id: int, user: User):
    db = next(get_db())
    existing_user = db.query(User).filter(User.id == user_id).first()
    if not existing_user:
        return {'error': 'User not found'}
    existing_user.username = user.username
    existing_user.email = user.email
    db.commit()
    return {'message': 'User updated successfully'}

@app.delete('/api/users/{user_id}')
def delete_user(user_id: int):
    db = next(get_db())
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return {'error': 'User not found'}
    db.delete(user)
    db.commit()
    return {'message': 'User deleted successfully'}

# Database schema for hotels and bookings

class Hotel(Base):
    __tablename__ = 'hotels'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    address = Column(String)
    description = Column(String)

class Booking(Base):
    __tablename__ = 'bookings'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    hotel_id = Column(Integer, ForeignKey('hotels.id'))
    checkin = Column(Date)
    checkout = Column(Date)

# API endpoints for hotels and bookings

@app.get('/api/hotels')
def get_hotels():
    db = next(get_db())
    hotels = db.query(Hotel).all()
    return [{'id': hotel.id, 'name': hotel.name, 'address': hotel.address, 'description': hotel.description} for hotel in hotels]

@app.get('/api/hotels/{hotel_id}')
def get_hotel(hotel_id: int):
    db = next(get_db())
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        return {'error': 'Hotel not found'}
    return {'id': hotel.id, 'name': hotel.name, 'address': hotel.address, 'description': hotel.description}

@app.post('/api/hotels')
async def create_hotel(hotel: Hotel):
    db = next(get_db())
    db.add(hotel)
    db.commit()
    return {'message': 'Hotel created successfully'}

@app.put('/api/hotels/{hotel_id}')
async def update_hotel(hotel_id: int, hotel: Hotel):
    db = next(get_db())
    existing_hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not existing_hotel:
        return {'error': 'Hotel not found'}
    existing_hotel.name = hotel.name
    existing_hotel.address = hotel.address
    existing_hotel.description = hotel.description
    db.commit()
    return {'message': 'Hotel updated successfully'}

@app.delete('/api/hotels/{hotel_id}')
def delete_hotel(hotel_id: int):
    db = next(get_db())
    hotel = db.query(Hotel).filter(Hotel.id == hotel_id).first()
    if not hotel:
        return {'error': 'Hotel not found'}
    db.delete(hotel)
    db.commit()
    return {'message': 'Hotel deleted successfully'}

@app.get('/api/bookings')
def get_bookings():
    db = next(get_db())
    bookings = db.query(Booking).all()
    return [{'id': booking.id, 'user_id': booking.user_id, 'hotel_id': booking.hotel_id, 'checkin': booking.checkin, 'checkout': booking.checkout} for booking in bookings]

@app.get('/api/bookings/{booking_id}')
def get_booking(booking_id: int):
    db = next(get_db())
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        return {'error': 'Booking not found'}
    return {'id': booking.id, 'user_id': booking.user_id, 'hotel_id': booking.hotel_id, 'checkin': booking.checkin, 'checkout': booking.checkout}

@app.post('/api/bookings')
async def create_booking(booking: Booking):
    db = next(get_db())
    db.add(booking)
    db.commit()
    return {'message': 'Booking created successfully'}

@app.put('/api/bookings/{booking_id}')
async def update_booking(booking_id: int, booking: Booking):
    db = next(get_db())
    existing_booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not existing_booking:
        return {'error': 'Booking not found'}
    existing_booking.user_id = booking.user_id
    existing_booking.hotel_id = booking.hotel_id
    existing_booking.checkin = booking.checkin
    existing_booking.checkout = booking.checkout
    db.commit()
    return {'message': 'Booking updated successfully'}

@app.delete('/api/bookings/{booking_id}')
def delete_booking(booking_id: int):
    db = next(get_db())
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        return {'error': 'Booking not found'}
    db.delete(booking)
    db.commit()
    return {'message': 'Booking deleted successfully'}
