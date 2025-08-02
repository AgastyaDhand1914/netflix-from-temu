from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import random

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173', 'http://localhost:3000'], methods=['GET', 'POST'], allow_headers=['Content-Type'])

@app.route('/recommendation', methods=['POST'])
def get_recommendation():
    try:
        data = request.get_json()

        #works here

        if (data):
            title_vectors = joblib.load('title_vectors.pkl')
            df = joblib.load('df.pkl')

            response = []

            for title_obj in data:

                matching_rows = df[df['id'] == title_obj['id']]
                match = None

                if len(matching_rows) > 0:
                    match = int(matching_rows.index[0]) 
                    
                else:
                    return jsonify({
                        'message': 'Title not found in database',
                        'data': None
                    }, 404)

                rec = []


                similarity = cosine_similarity(title_vectors[match], title_vectors).flatten()

                sorted_similarity = np.argsort(similarity)[::-1]

                for i in sorted_similarity[1:11]:
                    # print(i)
                    # print(f"Similar title found: {df.iloc[i]['title']}, Similarity: {similarity[i]:.2f}")
                    rec.append(int(df.iloc[i]['id'])) 

                title_name = title_obj.get('title') or title_obj.get('name') or 'Unknown Title'
                
                response.append({
                    'title': title_name, 
                    'recommendations': rec
                    })
            

            return jsonify({
                'message': 'works',
                'data': response
                }, 200)

        else:
            return jsonify({
                'message': 'no data received', 
                'data': None,
                }, 400)
    except Exception as e:
        return jsonify({
            'error': str(e)
        }), 500

@app.route('/test', methods=['GET'])
def test():
    return jsonify({
        'message': 'Flask server is running!'
    }), 200

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'error': error.description
    }), 404

@app.errorhandler(500)
def not_found(error):
    return jsonify({
        'error': error.description
    }), 500

@app.errorhandler(400)
def bad_request(error):
    return jsonify({
        'error': error.description
    }), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
