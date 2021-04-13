FROM python:3
ENV PYTHONBUFFERED 1
# RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
CMD python server.py
# CMD gunicorn --bind 0.0.0.0:5000 -w 3 run:app
