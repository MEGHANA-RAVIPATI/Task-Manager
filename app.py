from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

tasks = []


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/add', methods=['POST'])
def add():

    data = request.get_json()

    task = {
        "task": data['task'],
        "done": False
    }

    tasks.append(task)

    return jsonify({"message":"task added"})


@app.route('/get')
def get_tasks():
    return jsonify(tasks)


@app.route('/delete/<int:index>', methods=['DELETE'])
def delete(index):

    tasks.pop(index)

    return jsonify({"message":"deleted"})


@app.route('/done/<int:index>', methods=['PUT'])
def done(index):

    tasks[index]['done'] = not tasks[index]['done']

    return jsonify({"message":"updated"})


if __name__ == "__main__":
    app.run(debug=True)