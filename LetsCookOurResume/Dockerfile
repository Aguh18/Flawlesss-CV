FROM python:3.10-alpine

WORKDIR /app

# Copy requirements.txt
COPY requirements.txt requirements.txt

# Install dependensi dalam venv
RUN pip install -r requirements.txt

# Copy kode aplikasi
COPY . /app

# Expose port (sesuaikan dengan aplikasi Anda)
EXPOSE 5000


# Jalankan aplikasi Flask dari dalam direktori /app
CMD ["flask", "run", "--host=0.0.0.0"]

# Set locale to UTF-8
# ENV LANG en_US.UTF-8

# RUN apk --no-cache add g++ gcc git jpeg-dev libffi-dev libjpeg libxml2-dev \
#     libxslt-dev linux-headers musl-dev openldap-dev openssl postgresql-dev zlib zlib-dev && \
#     rm -rf /var/cache/apk/*

# ENV LIBRARY_PATH=/lib:/usr/lib
# WORKDIR /opt/flask
# RUN pip install -U pip setuptools
# RUN pip install -r /opt/flask/requirements.txt
# RUN pip install uwsgi

# EXPOSE 16000
# CMD ["sh", "-c", "sleep 5 ; uwsgi --http 0.0.0.0:16000 --wsgi-file runserver.py --callable app --processes 8 --threads 2"]

# ARG BUILD_DATE
# ARG VCS_REF
# ARG VCS_REF_MSG
# ARG VCS_URL
# ARG VERSION

