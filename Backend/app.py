"""
=========================================================
Name        : app.py
Assignment  : Assignment 5
Author(s)   : Yuecheng Sun, Joshua Maher
Submission  : Apr 8, 2024
Description : Flask
=========================================================
"""
import json
import signal
import os.path

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

products = product = [
    {
        'id': 1,
        'name': "Product 1",
        'description': "Description for Product 1",
        'price': 10.99,
        'image': 'images/product1.png'
    },
    {
        'id': 2,
        'name': "Product 2",
        'description': "Description for Product 2",
        'price': 20.99,
        'image': 'images/product2.jpg'
    },
    {
        'id': 3,
        'name': "Product 3",
        'description': "Description for Product 3",
        'price': 10.99,
        'image': 'images/product3.jpg'
    },
    {
        'id': 4,
        'name': "Product 4",
        'description': "Description for Product 4",
        'price': 10.99,
        'image': 'images/product4.jpg'
    },
    {
        'id': 5,
        'name': "Product 5",
        'description': "Description for Product 5",
        'price': 10.99,
        'image': 'images/product5.jpg'
    },
    {
        'id': 6,
        'name': "Product 6",
        'description': "Description for Product 6",
        'price': 10.99,
        'image': 'images/product6.jpg'
    },
    {
        'id': 7,
        'name': "Product 7",
        'description': "Description for Product 7",
        'price': 10.99,
        'image': 'images/product7.jpg'
    },
    {
        'id': 8,
        'name': "Product 8",
        'description': "Description for Product 8",
        'price': 10.99,
        'image': 'images/product8.jpg'
    },
    {
        'id': 9,
        'name': "Product 9",
        'description': "Description for Product 9",
        'price': 10.99,
        'image': 'images/product9.jpg'
    },
    {
        'id': 10,
        'name': "Product 10",
        'description': "Description for Product 10",
        'price': 10.99,
        'image': 'images/product10.jpg'
    }
]
if os.path.exists('users.json'):
    with open('users.json', 'r'):
        users = json.load(open('users.json'))
else:
    users = {}


def signal_handler(sig, frame):
    with open('users.json', 'w'):
        json.dump(users, open('users.json', 'w'))
    print('Received Ctrl-C, exiting...')
    exit(1)


signal.signal(signal.SIGINT, signal_handler)


@app.route('/register_api', methods=['POST'])
def register_api():
    data = request.json
    username = data['Username']
    password = data['Password']
    email = data['Email']
    if username in users.keys():
        return jsonify({'error': 1})  # Username is already taken.
    else:
        users[username] = {'Password': password, 'Email': email}
        return jsonify({'error': 0})  # Register success


@app.route('/login_api', methods=['POST'])
def login_api():
    data = request.json
    username = data['Username']
    password = data['Password']
    if username not in users.keys():
        return jsonify({'error': 1})  # Username not found
    elif password != users[username]['Password']:
        return jsonify({'error': 2})  # Password incorrect
    else:
        return jsonify({'error': 0})  # Login success


@app.route('/products_api', methods=['GET'])
def products_api():
    return jsonify({'products': products})


if __name__ == '__main__':
    app.run(debug=True)
