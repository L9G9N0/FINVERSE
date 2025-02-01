from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "your_secret_key"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# User Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    progress = db.Column(db.Integer, default=0)  # Track progress percentage

# Initialize Database
with app.app_context():
    db.create_all()

@app.route('/')
def home():
    progress = None
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        progress = user.progress
    return render_template('index.html', progress=progress)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']

        if User.query.filter_by(email=email).first():
            return "User already exists!"

        new_user = User(name=name, email=email, password=password)
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return redirect(url_for('home'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email, password=password).first()

        if user:
            session['user_id'] = user.id
            return redirect(url_for('home'))
        else:
            return "Invalid credentials!", 401  # Unauthorized

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return redirect(url_for('home'))

@app.route('/update_progress', methods=['POST'])
def update_progress():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        user.progress = int(request.form['progress'])
        db.session.commit()
    return redirect(url_for('home'))

@app.route('/progress')
def progress():
    if 'user_id' in session:
        user = User.query.get(session['user_id'])
        return render_template('progress.html', progress=user.progress)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
