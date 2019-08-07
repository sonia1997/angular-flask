from flask import Flask
from flask import render_template, Blueprint, send_from_directory
app = Flask(__name__, static_folder='angular/dist/angular/')
angular = Blueprint('angular', __name__, template_folder='angular/dist/angular')
app.register_blueprint(angular)

@app.route('/assets/<path:filename>')
def custom_static_for_assets(filename):
    return send_from_directory('angular/dist/angular/assets', filename)


@app.route('/<path:filename>')
def custom_static(filename):
    return send_from_directory('angular/dist/angular/', filename)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)