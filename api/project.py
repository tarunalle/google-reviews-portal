from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


# Initializing the app and database
app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# Product model
class Product(db.Model):
    # __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(255))
    price = db.Column(db.Float)

# Review model
class Review(db.Model):
    # __tablename__ = 'reviews'
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))
    reviewer_name = db.Column(db.String(100))
    review = db.Column(db.Text)
    rating = db.Column(db.Integer)


# API to get all products
@app.route('/api/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([{'id': p.id, 'name': p.name, 'description': p.description, 'price': p.price} for p in products])

# API to get reviews for a product
@app.route('/api/reviews', methods=['POST', 'GET'])
def get_reviews():
    product_id = request.args.get('product_id')
    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400
    reviews = Review.query.filter_by(product_id=product_id).all()
    return jsonify([{'reviewer_name': r.reviewer_name, 'review': r.review, 'rating': r.rating} for r in reviews])

@app.route('/', methods=['GET'])
def home():
    return 'Welcome google integration home page'

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=3001, debug=True)
