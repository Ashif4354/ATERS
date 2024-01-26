from src import app

if __name__ == '__main__':
    # app.run(host='0.0.0.0', port=5000, debug=True, ssl_context= ('certs/cert.pem', 'certs/key.pem'))
    app.run(host='0.0.0.0', port=5000, debug=True)