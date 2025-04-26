# Lung Disease Detection API !!!! This is only frontend part -- fully project will be upcoming days!!!!

A multimodal deep learning model for detecting and classifying lung diseases using X-ray and CT scan images. The model can identify pneumonia and different types of lung cancer.

## Features

- Multi-task learning architecture
- Support for both X-ray and CT scan images
- Classification of:
  - Pneumonia vs. Normal
  - Lung Cancer Subtypes (Adenocarcinoma, Large Cell Carcinoma, Squamous Cell Carcinoma)
- GPU acceleration support
- Flask REST API
- Batch processing support

## Requirements

- Python 3.8+
- PyTorch 2.0+
- CUDA-capable GPU (recommended)
- Other dependencies listed in `requirements.txt`

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lung-disease-detection
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Usage

1. Start the Flask API:
```bash
python app.py
```

2. The API will be available at `http://localhost:5000`

### API Endpoints

#### Health Check
- **URL**: `/health`
- **Method**: GET
- **Response**: API status and device information

#### Single Image Prediction
- **URL**: `/predict`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Parameters**:
  - `image`: Image file (JPEG, JPG, PNG)
- **Response**: Prediction results including disease type and probabilities

#### Batch Prediction
- **URL**: `/batch_predict`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Parameters**:
  - `images`: Multiple image files
- **Response**: List of prediction results for each image

### Example API Usage

Using curl:
```bash
# Single image prediction
curl -X POST -F "image=@path/to/image.jpg" http://localhost:5000/predict

# Batch prediction
curl -X POST -F "images=@image1.jpg" -F "images=@image2.jpg" http://localhost:5000/batch_predict
```

Using Python requests:
```python
import requests

# Single image prediction
url = 'http://localhost:5000/predict'
files = {'image': open('path/to/image.jpg', 'rb')}
response = requests.post(url, files=files)
print(response.json())

# Batch prediction
url = 'http://localhost:5000/batch_predict'
files = [
    ('images', open('image1.jpg', 'rb')),
    ('images', open('image2.jpg', 'rb'))
]
response = requests.post(url, files=files)
print(response.json())
```

## Model Architecture

The model uses a multi-task learning approach with:
- ResNet50 backbone
- Three classification branches:
  1. Disease type (pneumonia vs. cancer)
  2. Pneumonia severity
  3. Cancer subtype classification

## Training

To train the model on your own dataset:
1. Prepare your dataset in the appropriate format
2. Modify the training parameters in `train.py`
3. Run the training script:
```bash
python train.py
```

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
