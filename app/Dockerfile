FROM python:3.10.9
ENV PYTHONBUFFERED 1
ENV TESTING False
# RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
#CMD python server.py
# CMD gunicorn --bind 0.0.0.0:5000 -w 4 async_server:app
CMD gunicorn --bind 0.0.0.0:5000 -w 4 server:app
