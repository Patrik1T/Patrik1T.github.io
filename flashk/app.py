from flask import Flask, request, render_template

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        input_data = request.form.get('input_data')
        output_data = f'Vstupní data: {input_data}'
        
        return render_template('result.html', output=output_data)
    
    return render_template('form.html')

if __name__ == '__main__':
    app.run(debug=True)