FROM  python:3.10.5
ADD . /python-flask
WORKDIR /python-flask
RUN pip install -r requirements.txt
